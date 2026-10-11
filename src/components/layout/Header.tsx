import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { CELEBRATION } from "@/lib/constants";

/** Cabecera con el título de la celebración y los controles. */
export function Header() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="animate-bounce text-2xl sm:text-3xl" aria-hidden="true">
          🍻
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase dark:text-amber-400">
            {CELEBRATION.headerKicker}
          </span>
          <span className="text-sm font-extrabold text-slate-800 sm:text-base dark:text-slate-100">
            {CELEBRATION.headerTitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <MusicToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
