import type { StarrRarity } from "@/types";

/** Textos y datos de la página (fáciles de personalizar sin tocar componentes). */
export const CELEBRATION = {
  age: 46,
  headerKicker: "Celebración Especial",
  headerTitle: "¡46 Años de Papá!",
  badgeLabel: "46 AÑOS DE GRANDEZA",
  titlePrefix: "¡Feliz Cumpleaños,",
  titleHighlight: "Papá!",
  subtitle:
    "Una celebración muy especial de parte de tus hijos que te aman y admiran.",
  photoCaption: '"El mejor héroe, guía y amigo"',
  footerHint:
    "Presiona en cualquier lugar de la pantalla para lanzar fuegos artificiales 🎉",
} as const;

export const LETTER = {
  badge: "🏆 ¡RECOMPENSA LEGENDARIA DESBLOQUEADA! 🏆",
  greeting: "Querido Papá,",
  paragraphs: [
    `Llegar a tus ${CELEBRATION.age} años es una bendición gigante para todos nosotros. Queremos darte las gracias por cada sacrificio, por cada consejo a tiempo, por las risas compartidas y por enseñarnos con tu ejemplo el valor del trabajo y de la familia.`,
    "Deseamos de todo corazón que este nuevo año esté lleno de salud, éxitos, mucha paz y momentos inolvidables. ¡Queremos seguir brindando y celebrando muchos años más a tu lado! 🍻",
  ],
  signoffPrefix: "Con todo nuestro amor y admiración,",
  signature: "❤️ Tus Hijos ❤️",
} as const;

/** Configuración visual de cada rareza del Starr Drop (estilo Brawl Stars). */
export const STARR_RARITIES: readonly StarrRarity[] = [
  {
    label: "⚡ SUPER RARO ⚡",
    badgeClass: "bg-blue-500 text-white",
    glowClass: "drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    hint: "¡Toca el regalo para mejorarlo!",
    pitch: 261.63, // C4
  },
  {
    label: "🔥 ÉPICO 🔥",
    badgeClass: "bg-purple-600 text-white",
    glowClass: "drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]",
    hint: "¡Sigue tocando para subir de nivel!",
    pitch: 329.63, // E4
  },
  {
    label: "🌟 MÍTICO 🌟",
    badgeClass: "bg-red-500 text-white",
    glowClass: "drop-shadow-[0_0_35px_rgba(239,68,68,1)]",
    hint: "¡Un toque más para la gran sorpresa!",
    pitch: 392.0, // G4
  },
  {
    label: "👑 LEGENDARIO 👑",
    badgeClass: "bg-amber-400 text-slate-950",
    glowClass: "drop-shadow-[0_0_50px_rgba(250,204,21,1)]",
    hint: "¡NIVEL LEGENDARIO ALCANZADO!",
    pitch: 523.25, // C5
  },
] as const;

export const FINAL_STAGE = 3;

/** Configuración de audio (volúmenes, melodía y tonos por rareza). */
export const AUDIO = {
  /** Volumen maestro de la música de fondo. */
  musicVolume: 0.16,
  /** Volumen base de los efectos de sonido. */
  sfxVolume: 0.5,
  /** Horizonte (segundos) que mira hacia adelante el scheduler de música. */
  scheduleLookahead: 0.12,
  /** Intervalo (ms) del tick del scheduler de música. */
  scheduleIntervalMs: 25,
  /**
   * Melodía de "Feliz Cumpleaños" en Hz. `dur` en segundos.
   * Notas: C4 D4 C4 F4 E4 | C4 D4 C4 G4 F4 | C4 C4 C5 A4 F4 E4 D4 | B4 B4 C5 A4 F4 E4 D4
   */
  melody: [
    { note: 261.63, dur: 0.3 },
    { note: 261.63, dur: 0.3 },
    { note: 293.66, dur: 0.6 },
    { note: 261.63, dur: 0.6 },
    { note: 349.23, dur: 0.6 },
    { note: 329.63, dur: 1.0 },
    { note: 261.63, dur: 0.3 },
    { note: 261.63, dur: 0.3 },
    { note: 293.66, dur: 0.6 },
    { note: 261.63, dur: 0.6 },
    { note: 392.0, dur: 0.6 },
    { note: 349.23, dur: 1.0 },
    { note: 261.63, dur: 0.3 },
    { note: 261.63, dur: 0.3 },
    { note: 523.25, dur: 0.6 },
    { note: 440.0, dur: 0.6 },
    { note: 349.23, dur: 0.6 },
    { note: 329.63, dur: 0.6 },
    { note: 293.66, dur: 0.9 },
  ],
  /** Duración total (s) de la melodía; se calcula al programar, pero se expone para depurar. */
  melodyLoopGap: 0.6,
} as const;

/** Emojis que flotan tras cada explosión. */
export const FLOATING_EMOJIS = ["🍻", "🎂", "🥳", "🎁", "🎺", "⭐", "🎈", "🎉", "46"];

export const PARTICLE_COLORS = [
  "#facc15",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#ec4899",
  "#8b5cf6",
  "#f97316",
];
