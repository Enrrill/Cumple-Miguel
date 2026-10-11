# 🍻 ¡Feliz Cumpleaños #46, Papá!

Página interactiva de felicitación construida con **Next.js 16**, **Tailwind CSS v4** y **TypeScript**. Incluye tarjeta glassmorphism, modo claro/oscuro, música de fondo y efectos de sonido sintetizados con Web Audio, mini-juego *Starr Drop* (estilo Brawl Stars) que desbloquea una carta especial, y fuegos artificiales al hacer clic en cualquier parte.

Desplegada en Vercel.

## 🚀 Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 📦 Build y despliegue

```bash
pnpm build      # build de producción
pnpm lint       # eslint
```

Para desplegar en Vercel: importa el repo y detecta Next.js automáticamente (o `pnpm i -g vercel && vercel`).

## 🗂️ Estructura

```
src/
├── app/
│   ├── layout.tsx        # Fuentes (Inter + Playfair), metadata, script anti-flash de tema
│   ├── page.tsx          # Composición de la página
│   └── globals.css       # Tailwind v4, tokens, variante dark, animaciones
├── components/
│   ├── layout/           # Header, Footer
│   ├── ui/               # IconButton, ThemeToggle, MusicToggle
│   ├── audio/            # AudioProvider (estado + persistencia de la música)
│   └── birthday/         # BirthdayCard, AgeBadge, PhotoFrame, StarrDrop,
│                         # SecretLetter, ConfettiCanvas
├── hooks/                # useTheme, useStarrDrop
├── lib/
│   ├── audio/            # engine (AudioContext + master + reverb), music (loop), sfx
│   ├── particles.ts      # motor de partículas del canvas
│   ├── celebrate.ts      # bus de eventos de celebración
│   └── constants.ts      # textos, juego y config de audio
└── types/                # Tipos compartidos
public/images/            # Foto familiar
```

## 🔊 Audio

Todo el sonido es **síntesis Web Audio** (sin archivos que descargar), generado por un único motor:

- **Motor** (`lib/audio/engine.ts`): un `AudioContext` perezoso con cadena de master (compresor + ganancia) y una **reverb procedural**. Todos los sonidos comparten la misma "sala", lo que da coherencia al conjunto.
- **Música** (`lib/audio/music.ts`): la melodía de "Feliz Cumpleaños" con una capa suave de acordes. Se programa con un *scheduler* de lookahead sobre `audioContext.currentTime` (sin deriva, loop sin saltos).
- **Efectos** (`lib/audio/sfx.ts`): clic festivo, mejora del Starr Drop (tono según rareza) y fanfarria de revelado.

La música arranca en el **primer gesto del usuario** (política de autoplay). El botón del header la activa/desactiva y **persiste** la preferencia en `localStorage` (`musicEnabled`).

Volúmenes, notas de la melodía y tonos por rareza están centralizados en `AUDIO` (`src/lib/constants.ts`).

## ✏️ Personalización

Casi todo el texto, la configuración del juego y el audio viven en `src/lib/constants.ts` (edad, títulos, copy de la carta, rarezas del Starr Drop, emojis, colores de las partículas y parámetros de sonido).
