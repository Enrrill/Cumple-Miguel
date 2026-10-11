"use client";

import { useEffect, useRef } from "react";

import { fireCelebration, onCelebrate } from "@/lib/celebrate";
import { createParticleEngine } from "@/lib/particles";
import { playCelebration } from "@/lib/audio/sfx";

/**
 * Lienzo fijo de fondo que dibuja fuegos artificiales y emojis flotantes.
 * Escucha el evento `celebrate` (ver `lib/celebrate.ts`) y también
 * lanza una explosión al hacer clic/tocar en cualquier lugar de la página.
 */
export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = createParticleEngine(canvas);
    const unsubscribe = onCelebrate(({ x, y }) => {
      engine.celebrate(x, y);
      playCelebration();
    });

    // Confeti ambiente de fondo, respetando la preferencia de movimiento
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => {
      const reduced = motionQuery.matches;
      engine.setReducedMotion(reduced);
      engine.setAmbient(!reduced);
    };
    applyMotion();
    motionQuery.addEventListener("change", applyMotion);

    // Clic global: en cualquier parte excepto botones (evita doble disparo)
    const handleGlobalClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("button")) return;
      fireCelebration(event.clientX, event.clientY);
    };
    document.addEventListener("click", handleGlobalClick);

    // Pequeña celebración de bienvenida
    const welcomeTimer = setTimeout(() => {
      fireCelebration(window.innerWidth / 2, window.innerHeight / 3);
    }, 500);

    return () => {
      clearTimeout(welcomeTimer);
      motionQuery.removeEventListener("change", applyMotion);
      document.removeEventListener("click", handleGlobalClick);
      unsubscribe();
      engine.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
    />
  );
}
