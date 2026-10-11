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
      className={`mx-auto max-w-2xl space-y-4 rounded-3xl border-2 border-amber-500/50 bg-slate-100/90 p-6 text-left text-sm leading-relaxed text-balance text-slate-800 shadow-2xl backdrop-blur-xl transition-all duration-700 ease-out sm:p-8 sm:text-base md:text-lg dark:bg-slate-900/80 dark:text-slate-200 ${
        revealed ? "scale-100 opacity-100" : "hidden scale-90 opacity-0"
      }`}
    >
      <div className="mb-4 text-center">
        <span className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-1.5 text-xs font-black tracking-widest text-slate-950 uppercase shadow-lg">
          {LETTER.badge}
        </span>
      </div>

      <p className="font-medium">{LETTER.greeting}</p>
      {LETTER.paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}

      {/* Firma de los hijos */}
      <div className="flex flex-col items-end border-t border-amber-500/30 pt-4 text-right">
        <span className="font-serif text-lg font-bold text-amber-600 sm:text-xl dark:text-amber-400">
          {LETTER.signoffPrefix}
        </span>
        <span className="mt-1 text-base font-black text-slate-900 dark:text-white">
          {LETTER.signature}
        </span>
      </div>
    </div>
  );
}
