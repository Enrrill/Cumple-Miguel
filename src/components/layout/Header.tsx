import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { CELEBRATION } from "@/lib/constants";

/** Cabecera con el título de la celebración y los controles. */
export function Header() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="animate-sway text-3xl drop-shadow-[0_2px_6px_rgb(234,179,8,0.5)] sm:text-4xl"
          aria-hidden="true"
        >
          🍻
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-[0.2em] text-fiesta-magenta uppercase sm:text-sm dark:text-fiesta-magenta">
            {CELEBRATION.headerKicker}
          </span>
          <span className="font-serif text-base font-semibold text-slate-800 sm:text-lg dark:text-slate-100">
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
