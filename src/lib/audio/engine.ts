/**
 * Motor de audio Web Audio: un único AudioContext con cadena de masterización
 * (compresor + ganancia) y una reverb procedural compartida. Todos los sonidos
 * pasan por esta misma "sala", lo que da coherencia al conjunto.
 *
 * El contexto se crea de forma perezosa a partir de un gesto del usuario
 * (política de autoplay de los navegadores).
 */

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let compressor: DynamicsCompressorNode | null = null;
let reverb: ConvolverNode | null = null;
let reverbWet: GainNode | null = null;

/**
 * Genera una respuesta de impulso sintética (ruido con decaimiento exponencial)
 * para el ConvolverNode. Evita descargar un archivo de audio.
 */
function createImpulseResponse(
  context: AudioContext,
  seconds = 1.8,
  decay = 2.6,
): AudioBuffer {
  const rate = context.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = context.createBuffer(2, length, rate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // Ruido estéreo que se apaga exponencialmente
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
}

function buildGraph(context: AudioContext) {
  compressor = context.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-12, context.currentTime);
  compressor.knee.setValueAtTime(24, context.currentTime);
  compressor.ratio.setValueAtTime(4, context.currentTime);
  compressor.attack.setValueAtTime(0.003, context.currentTime);
  compressor.release.setValueAtTime(0.25, context.currentTime);

  masterGain = context.createGain();
  masterGain.gain.setValueAtTime(1, context.currentTime);

  reverb = context.createConvolver();
  reverb.buffer = createImpulseResponse(context);

  // Mezcla húmeda (reverb) que se añade en paralelo a la señal seca
  reverbWet = context.createGain();
  reverbWet.gain.setValueAtTime(0.22, context.currentTime);

  compressor.connect(masterGain);
  masterGain.connect(context.destination);

  // Enrutado de la reverb: entra por `reverb`, sale a través del compresor
  reverb.connect(reverbWet);
  reverbWet.connect(compressor);
}

/** Devuelve el AudioContext, creándolo y construyendo el grafo la primera vez. */
export function getAudioContext(): AudioContext {
  if (ctx) return ctx;

  const Ctor: typeof AudioContext | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  ctx = new Ctor();
  buildGraph(ctx);
  return ctx;
}

/** Nodo al que conectan las fuentes de sonido (seco + envío a reverb). */
export function getBus(): { dry: GainNode; wet: GainNode } {
  const context = getAudioContext();
  const dry = context.createGain();
  dry.connect(compressor!);

  const wet = context.createGain();
  wet.gain.setValueAtTime(1, context.currentTime);
  wet.connect(reverb!);

  return { dry, wet };
}

/** Reanuda el contexto si el navegador lo dejó suspendido (tras un gesto). */
export function resumeAudio(): void {
  if (ctx && ctx.state === "suspended") {
    void ctx.resume();
  }
}

/** Baja temporalmente la ganancia maestra (ducking) y la restaura. */
export function duck(amount = 0.45, holdMs = 500, rampMs = 0.25): void {
  if (!ctx || !masterGain) return;
  const now = ctx.currentTime;
  const param = masterGain.gain;

  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(amount, now + rampMs);
  param.setValueAtTime(amount, now + rampMs + holdMs / 1000);
  param.linearRampToValueAtTime(1, now + rampMs + holdMs / 1000 + rampMs);
}

/**
 * Crea un oscilador con envolvente ADSR conectado al bus (seco + reverb).
 * Devuelve los nodos para que el llamador pueda encadenar modulaciones.
 */
export function playTone(opts: {
  frequency: number;
  type?: OscillatorType;
  /** Inicio en segundos desde `ctx.currentTime`. */
  startTime?: number;
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  peakGain?: number;
  /** Frecuencia final para glissando (exponencial). */
  glideTo?: number;
}): { osc: OscillatorNode; gain: GainNode; stopAt: number } {
  const context = getAudioContext();
  const { dry, wet } = getBus();

  const {
    frequency,
    type = "triangle",
    startTime = 0,
    attack = 0.01,
    decay = 0.08,
    sustain = 0.6,
    release = 0.2,
    peakGain = 0.5,
    glideTo,
  } = opts;

  const t0 = context.currentTime + startTime;
  const osc = context.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, t0);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + attack + decay);
  }

  const gain = context.createGain();
  const sustainLevel = peakGain * sustain;

  // ADSR: ataque lineal, decaimiento a sustain, luego release exponencial
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + attack);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(sustainLevel, 0.0001),
    t0 + attack + decay,
  );

  const stopAt = t0 + attack + decay + release;
  gain.gain.exponentialRampToValueAtTime(0.0001, stopAt);

  osc.connect(gain);
  gain.connect(dry);
  gain.connect(wet);

  osc.start(t0);
  osc.stop(stopAt + 0.02);

  return { osc, gain, stopAt };
}

/**
 * Búfer de ruido filtrado para pops/estruendos. Se descarta automáticamente.
 */
export function playNoise(opts: {
  startTime?: number;
  duration?: number;
  filterType?: BiquadFilterType;
  filterFrom?: number;
  filterTo?: number;
  peakGain?: number;
}): void {
  const context = getAudioContext();
  const { dry, wet } = getBus();

  const {
    startTime = 0,
    duration = 0.2,
    filterType = "lowpass",
    filterFrom = 1600,
    filterTo = 120,
    peakGain = 0.3,
  } = opts;

  const t0 = context.currentTime + startTime;
  const frames = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, frames, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  const filter = context.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(filterFrom, t0);
  filter.frequency.exponentialRampToValueAtTime(filterTo, t0 + duration);

  const gain = context.createGain();
  gain.gain.setValueAtTime(peakGain, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(dry);
  gain.connect(wet);

  source.start(t0);
  source.stop(t0 + duration);
}
