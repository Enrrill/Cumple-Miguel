/**
 * Música de fondo: melodía de "Feliz Cumpleaños" (identidad del original)
 * con una capa suave de acordes de fondo para dar cuerpo.
 *
 * Se programa con un scheduler de lookahead sobre `audioContext.currentTime`,
 * que evita la deriva de `setTimeout` y garantiza un loop sin saltos.
 */

import { AUDIO } from "@/lib/constants";
import { getAudioContext, getBus } from "@/lib/audio/engine";

type Scheduled = {
  stop: () => void;
};

let running = false;
let tickTimer: ReturnType<typeof setInterval> | null = null;
let nextNoteTime = 0;
let noteIndex = 0;
let active: Scheduled[] = [];

/** Duración total de una pasada de la melodía. */
const MELODY_DURATION = AUDIO.melody.reduce((sum, n) => sum + n.dur, 0);

/**
 * Acorde de fondo tenue (arpegio lento y filtrado) programado en `when`.
 * Se reproduce una vez por cada frase para dar sensación de harmonía.
 */
function schedulePad(when: number): void {
  const context = getAudioContext();
  const { dry, wet } = getBus();

  // Acordes suaves (C major) en octava grave, filtrados
  const chord = [130.81, 164.81, 196.0]; // C3, E3, G3
  const dur = MELODY_DURATION;

  chord.forEach((freq) => {
    const osc = context.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, when);

    // Filtro grave para que el acorde quede como "colchón"
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(700, when);

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(0.06, when + 0.8);
    gain.gain.setValueAtTime(0.06, when + dur - 0.8);
    gain.gain.linearRampToValueAtTime(0.0001, when + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dry);
    gain.connect(wet);

    osc.start(when);
    osc.stop(when + dur + 0.05);
  });
}

/** Programa una nota de la melodía (campanilla cálida) en `when`. */
function scheduleNote(freq: number, dur: number, when: number): void {
  const context = getAudioContext();
  const { dry, wet } = getBus();

  // Voz principal (triángulo cálido)
  const osc = context.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, when);

  // Ligero unisono desafinado para más cuerpo
  const osc2 = context.createOscillator();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(freq * 1.005, when);

  const gain = context.createGain();
  const gain2 = context.createGain();
  gain2.gain.setValueAtTime(0.4, when);

  const noteLen = Math.max(dur * 0.95, 0.12);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(AUDIO.musicVolume * 2.2, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + noteLen);

  osc.connect(gain);
  osc2.connect(gain2);
  gain2.connect(gain);
  gain.connect(dry);
  gain.connect(wet);

  osc.start(when);
  osc.stop(when + noteLen + 0.03);
  osc2.start(when);
  osc2.stop(when + noteLen + 0.03);

  active.push({
    stop: () => {
      try {
        osc.stop();
        osc2.stop();
      } catch {
        /* ya detenido */
      }
    },
  });
}

/** Programa todo lo que suena en la ventana de lookahead. */
function schedulerTick(): void {
  const context = getAudioContext();
  const horizon = context.currentTime + AUDIO.scheduleLookahead;

  while (nextNoteTime < horizon) {
    const item = AUDIO.melody[noteIndex];
    scheduleNote(item.note, item.dur, nextNoteTime);

    // Añade el pad al comienzo de cada frase (primera nota de la melodía)
    if (noteIndex === 0) {
      schedulePad(nextNoteTime);
    }

    nextNoteTime += item.dur;
    noteIndex = (noteIndex + 1) % AUDIO.melody.length;
  }
}

/** Arranca la música (idempotente). */
export function startMusic(): void {
  if (running) return;
  running = true;

  const context = getAudioContext();
  // Empieza en la siguiente nota redonda, dejando un pequeño respiro
  nextNoteTime = context.currentTime + 0.1;
  noteIndex = 0;

  tickTimer = setInterval(schedulerTick, AUDIO.scheduleIntervalMs);
}

/** Detiene la música y silencia cualquier nota colgada. */
export function stopMusic(): void {
  if (!running) return;
  running = false;

  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
  active.forEach((s) => s.stop());
  active = [];
}

export function isMusicRunning(): boolean {
  return running;
}
