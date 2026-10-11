import { CELEBRATION } from "@/lib/constants";

/** Pie de página con la pista de los fuegos artificiales. */
export function Footer() {
  return (
    <footer className="relative z-20 w-full px-4 py-5 text-center text-sm font-semibold text-amber-700 dark:text-amber-300/80">
      {CELEBRATION.footerHint}
    </footer>
  );
}
