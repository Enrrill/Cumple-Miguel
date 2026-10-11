/**
 * Efectos de sonido del Starr Drop y las celebraciones.
 * Todos pasan por la cadena de master del motor (compresor + reverb),
 * lo que garantiza que suenan coherentes con la música de fondo.
 */

import { AUDIO, STARR_RARITIES } from "@/lib/constants";
import { duck, playNoise, playTone } from "@/lib/audio/engine";

/** Clic festivo: arpegio mayor brillante + pop de ruido con reverb. */
export function playCelebration(): void {
  const base = AUDIO.sfxVolume;
  // Arpegio mayor (C5 E5 G5 C6) encadenado
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    playTone({
      frequency: freq,
      type: "triangle",
      startTime: i * 0.03,
      attack: 0.005,
      decay: 0.05,
      sustain: 0.35,
      release: 0.3,
      peakGain: base * 0.28,
    });
  });

  // Pop de ruido (estruendo suave de fuegos artificiales)
  playNoise({
    startTime: 0,
    duration: 0.22,
    filterFrom: 1800,
    filterTo: 120,
    peakGain: base * 0.35,
  });
}

/**
 * Sonido de mejora del Starr Drop: arpegio ascendente cuyo tono base
 * depende de la rareza destino (más rara => más agudo y brillante).
 */
export function playUpgrade(targetStage: number): void {
  const rarity = STARR_RARITIES[targetStage] ?? STARR_RARITIES[0];
  const base = AUDIO.sfxVolume;
  const startFreq = rarity.pitch;

  // Tres notas ascendentes desde la frecuencia de la rareza
  [1, 1.25, 1.5].forEach((mult, i) => {
    playTone({
      frequency: startFreq * mult,
      type: "square",
      startTime: i * 0.06,
      attack: 0.008,
      decay: 0.08,
      sustain: 0.4,
      release: 0.28,
      peakGain: base * 0.22,
    });
  });

  // Brillo extra (campanilla) para rarezas altas
  if (targetStage >= 2) {
    playTone({
      frequency: startFreq * 2,
      type: "sine",
      startTime: 0.12,
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 0.5,
      peakGain: base * 0.18,
    });
  }
}

/** Fanfarria de revelado: acorde mayor triunfal con cola de reverb. */
export function playReveal(): void {
  const base = AUDIO.sfxVolume;

  // Baja la música para que la fanfarria destaque
  duck(0.4, 900, 0.3);

  // Acorde mayor (C5 E5 G5 C6) sostenido
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    playTone({
      frequency: freq,
      type: "sawtooth",
      startTime: i * 0.05,
      attack: 0.06,
      decay: 0.2,
      sustain: 0.7,
      release: 1.1,
      peakGain: base * 0.16,
    });
  });

  // Campanilla ascendente final (glissando) para rematar
  playTone({
    frequency: 1046.5,
    glideTo: 2093.0,
    type: "sine",
    startTime: 0.35,
    attack: 0.15,
    decay: 0.3,
    sustain: 0.4,
    release: 1.2,
    peakGain: base * 0.22,
  });

  // Estruendo de celebración
  playNoise({
    startTime: 0.05,
    duration: 0.6,
    filterFrom: 2400,
    filterTo: 200,
    peakGain: base * 0.25,
  });
}
