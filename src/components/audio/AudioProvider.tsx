"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { resumeAudio } from "@/lib/audio/engine";
import { startMusic, stopMusic } from "@/lib/audio/music";

const STORAGE_KEY = "musicEnabled";

type AudioState = {
  /** Estado deseado de la música (persistido). */
  enabled: boolean;
  /** true solo cuando el AudioContext está realmente listo para sonar. */
  isReady: boolean;
  toggleMusic: () => void;
};

const AudioStateContext = createContext<AudioState | null>(null);

// --- Almacenamiento externo de la preferencia (localStorage) ---

/** Emite un evento para notificar los cambios de la preferencia. */
function emitChange() {
  window.dispatchEvent(new Event(STORAGE_KEY));
}

function subscribe(onChange: () => void) {
  window.addEventListener(STORAGE_KEY, onChange);
  return () => window.removeEventListener(STORAGE_KEY, onChange);
}

/** Por defecto la música está activada (como la página original). */
function getSnapshot(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== "0";
}

function getServerSnapshot(): boolean {
  return true;
}

/**
 * Proveedor de audio: gestiona el estado on/off de la música (persistido en
 * localStorage) y reanuda el AudioContext en el primer gesto del usuario,
 * cumpliendo la política de autoplay de los navegadores.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isReady, setIsReady] = useState(false);
  const startedRef = useRef(false);

  // Arranca en el primer gesto (autoplay seguro). Los listeners son `once`,
  // así que se retiran solos tras el primer disparo.
  useEffect(() => {
    const startFromGesture = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      resumeAudio();
      setIsReady(true);
      if (getSnapshot()) startMusic();
    };

    window.addEventListener("pointerdown", startFromGesture, { once: true });
    window.addEventListener("keydown", startFromGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startFromGesture);
      window.removeEventListener("keydown", startFromGesture);
    };
  }, []);

  // Sincroniza la reproducción con el estado (una vez iniciado)
  useEffect(() => {
    if (!startedRef.current) return;
    if (enabled) startMusic();
    else stopMusic();
  }, [enabled]);

  const toggleMusic = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, getSnapshot() ? "0" : "1");
    emitChange();
  }, []);

  const value = useMemo(
    () => ({ enabled, isReady, toggleMusic }),
    [enabled, isReady, toggleMusic],
  );

  return <AudioStateContext value={value}>{children}</AudioStateContext>;
}

/** Hook para consumir el estado y las acciones de audio. */
export function useAudio(): AudioState {
  const ctx = useContext(AudioStateContext);
  if (!ctx) {
    throw new Error("useAudio debe usarse dentro de <AudioProvider>");
  }
  return ctx;
}
