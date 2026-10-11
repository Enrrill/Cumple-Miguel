"use client";

import { useEffect, useRef, useState } from "react";

import { AgeBadge } from "@/components/birthday/AgeBadge";
import { PhotoFrame } from "@/components/birthday/PhotoFrame";
import { SecretLetter } from "@/components/birthday/SecretLetter";
import { StarrDrop } from "@/components/birthday/StarrDrop";
import { useStarrDrop } from "@/hooks/useStarrDrop";
import { fireCelebration } from "@/lib/celebrate";
import { CELEBRATION, FINAL_STAGE } from "@/lib/constants";
import { playReveal, playUpgrade } from "@/lib/audio/sfx";

/**
 * Tarjeta principal de cristal: contiene todo el contenido de la página.
 * Gestiona el mini-juego Starr Drop y la secuencia de revelado de la carta.
 */
export function BirthdayCard() {
  const { stage, isComplete, upgrade } = useStarrDrop();
  const [bumpSeed, setBumpSeed] = useState(0);
  const [starrFading, setStarrFading] = useState(false);
  const [starrHidden, setStarrHidden] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Limpia los timers si el componente se desmonta a mitad de la secuencia
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleUpgrade = () => {
    if (isComplete) return;

    const nextStage = stage + 1;
    upgrade();
    setBumpSeed((n) => n + 1);
    playUpgrade(nextStage);

    if (nextStage === FINAL_STAGE) {
      // Secuencia: fundir el Starr Drop y revelar la carta con fuegos artificiales
      timers.current.push(
        setTimeout(() => {
          setStarrFading(true);

          timers.current.push(
            setTimeout(() => {
              setStarrHidden(true);
              setLetterRevealed(true);
              playReveal();

              const { innerWidth: w, innerHeight: h } = window;
              fireCelebration(w / 2, h / 3);
              fireCelebration(w / 4, h / 2);
              fireCelebration((w * 3) / 4, h / 2);
            }, 400),
          );
        }, 700),
      );
    }
  };

  return (
    <main className="relative z-10 mx-auto my-auto w-full max-w-3xl px-4 py-4 sm:py-6">
      <div className="glass-card animate-float relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-300 sm:p-10">
        {/* Formas de brillo de fondo */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl" />

        <AgeBadge />

        <h1 className="font-serif mb-3 text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
          {CELEBRATION.titlePrefix}
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            {CELEBRATION.titleHighlight}
          </span>
        </h1>

        <p className="mx-auto mb-6 max-w-lg text-sm font-medium text-amber-700 sm:text-lg dark:text-amber-300/90">
          {CELEBRATION.subtitle}
        </p>

        <PhotoFrame />

        <div
          className={`transition-all duration-400 ${
            starrHidden ? "hidden" : starrFading ? "scale-50 opacity-0" : "opacity-100"
          }`}
        >
          <StarrDrop stage={stage} onUpgrade={handleUpgrade} bumpSeed={bumpSeed} />
        </div>

        <SecretLetter revealed={letterRevealed} />
      </div>
    </main>
  );
}
