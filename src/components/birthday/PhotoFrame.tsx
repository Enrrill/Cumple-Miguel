import Image from "next/image";

import { CELEBRATION } from "@/lib/constants";

/**
 * Marco estilo polaroid con la foto familiar, cinta adhesiva de colores
 * y caption. En PC crece para equilibrar la columna de contenido.
 */
export function PhotoFrame() {
  return (
    <div className="group relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md">
      {/* Halo dorado de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-400/30 via-fuchsia-500/20 to-cyan-400/30 blur-lg"
      />

      <div className="relative rotate-[-1.5deg] rounded-2xl border-2 border-amber-300/70 bg-white p-3 shadow-[0_18px_40px_-12px_rgb(190,80,20,0.45)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03] dark:border-amber-500/50 dark:bg-slate-800/90">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-slate-900">
          <Image
            src="/images/familia.jpg"
            alt="Foto de la familia"
            fill
            sizes="(min-width: 1024px) 448px, (max-width: 640px) 80vw, 384px"
            className="rounded-lg object-cover object-center shadow-inner transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Caption sobre un degradado inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-3 pt-8 text-center">
            <span className="block text-xs font-bold text-white drop-shadow-md sm:text-sm">
              {CELEBRATION.photoCaption}
            </span>
          </div>
        </div>
      </div>

      {/* Cinta de polaroid en degradado festivo */}
      <div className="pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-sm bg-gradient-to-r from-amber-300 via-fuchsia-300 to-cyan-300 shadow-sm backdrop-blur-sm dark:from-amber-400/70 dark:via-fuchsia-400/70 dark:to-cyan-400/70" />
    </div>
  );
}
