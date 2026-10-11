import { CELEBRATION } from "@/lib/constants";

/** Pie de página con la pista de los fuegos artificiales. */
export function Footer() {
  return (
    <footer className="relative z-20 w-full py-4 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
      {CELEBRATION.footerHint}
    </footer>
  );
}
