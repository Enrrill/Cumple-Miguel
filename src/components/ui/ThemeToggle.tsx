"use client";

import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/hooks/useTheme";

/** Botón para alternar entre modo oscuro y claro. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <IconButton
      onClick={toggleTheme}
      title="Cambiar Tema"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
    >
      {/* Sol (visible en modo oscuro: sugiere cambiar a claro) */}
      <svg
        className={`w-5 h-5 ${isDark ? "block" : "hidden"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      {/* Luna (visible en modo claro) */}
      <svg
        className={`w-5 h-5 text-amber-600 ${isDark ? "hidden" : "block"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </IconButton>
  );
}
