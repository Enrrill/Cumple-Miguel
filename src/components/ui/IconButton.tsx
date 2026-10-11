import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

/** Botón circular del header (tema, música…) con estilo consistente. */
export function IconButton({ className = "", children, ...props }: Props) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-800/90 p-2.5 text-amber-400 shadow-lg transition-transform active:scale-95 hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
