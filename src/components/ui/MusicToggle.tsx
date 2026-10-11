"use client";

import { IconButton } from "@/components/ui/IconButton";
import { useAudio } from "@/components/audio/AudioProvider";

/** Botón para activar/desactivar la música de fondo (persiste la preferencia). */
export function MusicToggle() {
  const { enabled, toggleMusic } = useAudio();

  return (
    <IconButton
      onClick={toggleMusic}
      title="Música de Fondo"
      aria-label={enabled ? "Silenciar música" : "Activar música"}
      aria-pressed={enabled}
    >
      {/* Icono con sonido (visible cuando la música está activada) */}
      <svg
        className={`w-5 h-5 ${enabled ? "block" : "hidden"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
      {/* Icono silenciado (visible cuando la música está desactivada) */}
      <svg
        className={`w-5 h-5 ${enabled ? "hidden" : "block"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
        />
      </svg>
    </IconButton>
  );
}
