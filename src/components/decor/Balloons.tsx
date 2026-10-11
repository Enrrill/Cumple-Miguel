import { BALLOONS } from "@/lib/constants";

/**
 * Globos flotantes de fondo (solo decorativos, no capturan clics).
 * Respetan `prefers-reduced-motion`: si el usuario lo pide, se quedan quietos.
 */
export function Balloons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transform-none"
    >
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.drift}`}
          style={{
            left: b.left,
            bottom: b.bottom,
            width: b.size,
            height: b.size * 1.22,
            animationDelay: `${b.delay}s`,
          }}
        >
          {/* Globo */}
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle at 34% 28%, #ffffffcc, ${b.color} 46%, ${b.color} 100%)`,
              boxShadow: `inset -8px -10px 18px rgb(0 0 0 / 0.18), 0 8px 20px -6px ${b.color}66`,
            }}
          />
          {/* Nudo */}
          <div
            className="absolute left-1/2 -bottom-1 h-2.5 w-2.5 -translate-x-1/2 rotate-45"
            style={{ background: b.color }}
          />
          {/* Hilo */}
          <div
            className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2 opacity-40"
            style={{ background: "linear-gradient(to bottom, currentColor, transparent)" }}
          />
        </div>
      ))}
    </div>
  );
}
