/**
 * Bus de eventos ligero para disparar celebraciones (fuegos artificiales)
 * desde cualquier componente sin prop-drilling ni contexto.
 */

const EVENT_NAME = "celebrate";

export type CelebrateDetail = {
  x: number;
  y: number;
};

/** Lanza una explosión de celebración en las coordenadas (x, y) de la pantalla. */
export function fireCelebration(x: number, y: number) {
  window.dispatchEvent(
    new CustomEvent<CelebrateDetail>(EVENT_NAME, { detail: { x, y } }),
  );
}

/** Suscribe un listener a las celebraciones. Devuelve la función de cleanup. */
export function onCelebrate(handler: (detail: CelebrateDetail) => void) {
  const listener = (event: Event) => {
    handler((event as CustomEvent<CelebrateDetail>).detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
