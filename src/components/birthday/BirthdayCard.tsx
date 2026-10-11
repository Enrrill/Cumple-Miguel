"use client";

import { useEffect, useRef, useState } from "react";

import { AgeBadge } from "@/components/birthday/AgeBadge";
import { PhotoFrame } from "@/components/birthday/PhotoFrame";
import { SecretLetter } from "@/components/birthday/SecretLetter";
import { StarrDrop } from "@/components/birthday/StarrDrop";
import { Bunting } from "@/components/decor/Bunting";
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
    <main className="relative z-10 mx-auto my-auto w-full max-w-3xl px-4 py-4 sm:py-6 lg:max-w-6xl">
      <div className="glass-card animate-float relative overflow-hidden rounded-3xl p-6 text-center transition-all duration-300 sm:p-10 lg:p-12">
        {/* Formas de brillo de fondo */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Guirnalda de banderines en el borde superior */}
        <Bunting />

        {/* Composición en dos columnas a partir de lg: foto | contenido */}
        <div className="relative z-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Columna de contenido */}
          <div className="flex flex-col items-center">
            <AgeBadge />

            <h1 className="font-serif mb-4 text-4xl leading-[1.05] font-bold tracking-tight text-slate-900 text-balance sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl dark:text-white">
              {CELEBRATION.titlePrefix}
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent drop-shadow-sm">
                {CELEBRATION.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-base font-semibold text-amber-700 sm:text-lg dark:text-amber-300/90">
              {CELEBRATION.subtitle}
            </p>

            {/* Tras el revelado, la carta ocupa el hueco del StarrDrop,
                junto a la foto, aprovechando el ancho de la columna */}
            {letterRevealed ? (
              <div className="w-full">
                <SecretLetter revealed={letterRevealed} />
              </div>
            ) : (
              <div
                className={`w-full transition-all duration-400 ${
                  starrFading ? "scale-95 opacity-0" : "opacity-100"
                }`}
              >
                <StarrDrop stage={stage} onUpgrade={handleUpgrade} bumpSeed={bumpSeed} />
              </div>
            )}
          </div>

          {/* Columna de la foto (a la izquierda en PC, orden primero) */}
          <div className="order-first mb-6 lg:order-none lg:mb-0">
            <PhotoFrame />
          </div>
        </div>
      </div>
    </main>
  );
}
