import { FESTIVE_PALETTE } from "@/lib/constants";

/**
 * Guirnalda de banderines triangulares que cuelga del borde superior.
 * Ligero balanceo (`sway`) con desfase por banderín.
 */
export function Bunting() {
  const flags = Array.from({ length: 13 }, (_, i) => FESTIVE_PALETTE[i % FESTIVE_PALETTE.length]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-1 z-10 flex justify-center motion-reduce:[&_*]:!animate-none"
    >
      {/* Cuerda ligeramente curvada */}
      <svg
        viewBox="0 0 400 40"
        className="h-8 w-full max-w-4xl"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 8 Q200 34 400 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-amber-500/50"
        />
      </svg>

      {/* Banderines superpuestos sobre la cuerda */}
      <div className="absolute inset-x-0 top-0 mx-auto flex max-w-4xl justify-between px-1">
        {flags.map((color, i) => (
          <div
            key={i}
            className="animate-sway origin-top"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            <div
              className="bunting-flag h-7 w-5"
              style={{
                background: `linear-gradient(160deg, ${color}, ${color}cc)`,
                filter: "drop-shadow(0 2px 2px rgb(0 0 0 / 0.15))",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
