"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

const DARK_QUERY = ":where(.dark)";

/** Tema actual leído del DOM (la clase la aplica el script anti-flash del layout). */
function readTheme(): Theme {
  return document.documentElement.matches(DARK_QUERY) ? "dark" : "light";
}

function readServerTheme(): Theme {
  return "dark";
}

function subscribe(onChange: () => void) {
  // El observer detecta los cambios de clase que hace el propio toggle
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

/**
 * Tema claro/oscuro sincronizado con la clase del `<html>`.
 * El valor inicial lo aplica un script inline en `layout.tsx` (sin parpadeo);
 * este hook solo lo observa y expone las acciones de cambio.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, readServerTheme);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    // Clase .light por compatibilidad con la versión original
    root.classList.toggle("light", next === "light");
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
