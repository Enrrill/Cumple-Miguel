"use client";

import { useRef } from "react";

import { STARR_RARITIES } from "@/lib/constants";
import { fireCelebration } from "@/lib/celebrate";
import type { StarrStage } from "@/types";

type Props = {
  stage: StarrStage;
  onUpgrade: () => void;
  /** Incrementa para reiniciar la animación de impacto tras cada toque. */
  bumpSeed: number;
};

/**
 * Mini-juego estilo Brawl Stars: cada toque sube la rareza del regalo
 * hasta LEGENDARIO, momento en que la tarjeta se desvanece (controlado
 * por el padre) y aparece la carta.
 */
export function StarrDrop({ stage, onUpgrade, bumpSeed }: Props) {
  const rarity = STARR_RARITIES[stage];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleUpgrade = () => {
    onUpgrade();

    // Explosión de partículas centrada en el regalo
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      fireCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center py-2">
      <div
        key={bumpSeed}
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Starr Drop, rareza actual: ${rarity.label}. Toca para mejorar.`}
        onClick={handleUpgrade}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleUpgrade();
          }
        }}
        className={`relative flex cursor-pointer transform flex-col items-center justify-center p-4 transition-all duration-300 select-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none active:scale-95 ${
          bumpSeed > 0 ? "animate-starr-upgrade" : ""
        }`}
      >
        {/* Insignia de rareza */}
        <div
          className={`rounded-full px-5 py-2 text-xs font-black tracking-widest uppercase shadow-xl transition-all duration-300 sm:text-sm ${rarity.badgeClass}`}
        >
          {rarity.label}
        </div>

        {/* Caja de regalo */}
        <div
          className={`relative my-4 animate-bounce text-8xl transition-all duration-300 sm:text-9xl md:text-[10rem] ${rarity.glowClass}`}
          aria-hidden="true"
        >
          🎁
        </div>

        {/* Pista */}
        <p className="text-center text-sm font-bold text-amber-500 drop-shadow sm:text-base dark:text-amber-300">
          {rarity.hint}
        </p>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-3 w-3 animate-ping rounded-full bg-blue-400" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-200">
            ¡Toca aquí para abrir!
          </span>
        </div>
      </div>
    </div>
  );
}
