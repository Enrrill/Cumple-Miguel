"use client";

import { useCallback, useState } from "react";

import { FINAL_STAGE } from "@/lib/constants";
import type { StarrStage } from "@/types";

/**
 * Estado del mini-juego Starr Drop: cada toque sube de rareza hasta
 * LEGENDARIO (3), que revela la carta. Devuelve también la función
 * `reset` por si se quisiera reiniciar el juego.
 */
export function useStarrDrop() {
  const [stage, setStage] = useState<StarrStage>(0);

  const isComplete = stage === FINAL_STAGE;

  const upgrade = useCallback(() => {
    setStage((prev) =>
      prev < FINAL_STAGE ? ((prev + 1) as StarrStage) : prev,
    );
  }, []);

  const reset = useCallback(() => setStage(0), []);

  return { stage, isComplete, upgrade, reset };
}
