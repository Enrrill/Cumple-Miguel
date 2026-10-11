import Image from "next/image";

import { CELEBRATION } from "@/lib/constants";

/** Marco estilo polaroid con la foto familiar, cinta adhesiva y caption. */
export function PhotoFrame() {
  return (
    <div className="group relative mx-auto mb-8 max-w-xs sm:max-w-sm">
      <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-xl transition duration-300 group-hover:scale-105 dark:border-slate-700/80 dark:bg-slate-800/90">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-slate-900">
          <Image
            src="/images/familia.jpg"
            alt="Foto de la familia"
            fill
            sizes="(max-width: 640px) 80vw, 384px"
            className="rounded-lg object-cover object-center shadow-inner"
            priority
          />

          {/* Caption sobre un degradado inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-6 text-center">
            <span className="block text-xs font-bold text-white drop-shadow-md sm:text-sm">
              {CELEBRATION.photoCaption}
            </span>
          </div>
        </div>
      </div>

      {/* Cinta de polaroid */}
      <div className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-2 rounded-sm bg-amber-200/80 shadow-sm backdrop-blur-sm dark:bg-amber-500/50" />
    </div>
  );
}
