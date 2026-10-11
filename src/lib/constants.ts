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
  },
  {
    label: "🔥 ÉPICO 🔥",
    badgeClass: "bg-purple-600 text-white",
    glowClass: "drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]",
    hint: "¡Sigue tocando para subir de nivel!",
  },
  {
    label: "🌟 MÍTICO 🌟",
    badgeClass: "bg-red-500 text-white",
    glowClass: "drop-shadow-[0_0_35px_rgba(239,68,68,1)]",
    hint: "¡Un toque más para la gran sorpresa!",
  },
  {
    label: "👑 LEGENDARIO 👑",
    badgeClass: "bg-amber-400 text-slate-950",
    glowClass: "drop-shadow-[0_0_50px_rgba(250,204,21,1)]",
    hint: "¡NIVEL LEGENDARIO ALCANZADO!",
  },
] as const;

export const FINAL_STAGE = 3;

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
