import { CELEBRATION } from "@/lib/constants";

/**
 * Insignia destacada "46 AÑOS DE GRANDEZA" con doble aro dorado,
 * barrido metálico y destellos. Es el sello festivo de la tarjeta.
 */
export function AgeBadge() {
  return (
    <div className="relative mb-7 inline-flex items-center justify-center">
      {/* Halo pulsante exterior */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-amber-400/25 blur-md animate-pulse-glow"
      />

      <div className="animate-pulse-glow relative inline-flex items-center justify-center gap-3 rounded-full border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/25 via-yellow-400/25 to-amber-500/25 px-6 py-2.5 text-amber-700 shadow-[0_10px_30px_-8px_rgb(234,179,8,0.6)] dark:text-amber-300">
        {/* Barrido metálico */}
        <span
          aria-hidden="true"
          className="shine-sweep animate-shimmer pointer-events-none absolute inset-0 rounded-full"
        />

        <span className="relative text-2xl sm:text-3xl" aria-hidden="true">
          🍻
        </span>
        <span className="font-serif relative text-sm font-semibold tracking-[0.15em] uppercase sm:text-base">
          {CELEBRATION.badgeLabel}
        </span>
        <span className="relative text-2xl sm:text-3xl" aria-hidden="true">
          🍻
        </span>

        {/* Destellos */}
        <span
          aria-hidden="true"
          className="animate-sparkle absolute -top-1 -left-2 text-xs text-amber-300"
        >
          ✦
        </span>
        <span
          aria-hidden="true"
          className="animate-sparkle absolute -right-2 -bottom-1 text-xs text-amber-300"
          style={{ animationDelay: "1.1s" }}
        >
          ✦
        </span>
      </div>
    </div>
  );
}
