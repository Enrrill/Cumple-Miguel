import { CELEBRATION } from "@/lib/constants";

/** Insignia con brillo pulsante: "46 AÑOS DE GRANDEZA". */
export function AgeBadge() {
  return (
    <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2 text-amber-600 animate-pulse-glow dark:text-amber-400">
      <span className="text-xl sm:text-2xl" aria-hidden="true">
        🍻
      </span>
      <span className="text-sm font-black tracking-widest uppercase sm:text-base">
        {CELEBRATION.badgeLabel}
      </span>
      <span className="text-xl sm:text-2xl" aria-hidden="true">
        🍻
      </span>
    </div>
  );
}
