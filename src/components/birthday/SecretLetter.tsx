import { LETTER } from "@/lib/constants";

type Props = {
  /** true cuando la carta empieza a mostrarse (dispara la transición). */
  revealed: boolean;
};

/** Carta emocional que se revela al alcanzar la rareza LEGENDARIA. */
export function SecretLetter({ revealed }: Props) {
  return (
    <div
      aria-hidden={!revealed}
      className={`mx-auto mt-10 max-w-2xl space-y-4 rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-amber-50 to-orange-50 p-6 text-left text-sm leading-relaxed text-balance text-slate-800 shadow-[0_25px_60px_-18px_rgb(234,179,8,0.5)] backdrop-blur-xl transition-all duration-700 ease-out sm:p-8 sm:text-base md:text-lg dark:from-slate-900/90 dark:to-slate-900/70 dark:text-slate-200 ${
        revealed ? "scale-100 opacity-100" : "hidden scale-90 opacity-0"
      }`}
    >
      <div className="mb-4 text-center">
        <span className="shine-sweep animate-shimmer relative inline-block overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-4 py-1.5 text-xs font-black tracking-widest text-slate-950 uppercase shadow-lg">
          {LETTER.badge}
        </span>
      </div>

      <p className="font-medium">{LETTER.greeting}</p>
      {LETTER.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}

      {/* Firma de los hijos */}
      <div className="flex flex-col items-end border-t border-amber-400/50 pt-4 text-right">
        <span className="font-serif text-xl font-semibold text-amber-600 sm:text-2xl dark:text-amber-400">
          {LETTER.signoffPrefix}
        </span>
        <span className="font-serif mt-1 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
          {LETTER.signature}
        </span>
      </div>
    </div>
  );
}
