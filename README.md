# 🍻 ¡Feliz Cumpleaños #46, Papá!

Página interactiva de felicitación construida con **Next.js 16**, **Tailwind CSS v4** y **TypeScript**. Incluye tarjeta glassmorphism, modo claro/oscuro, mini-juego *Starr Drop* (estilo Brawl Stars) que desbloquea una carta especial, y fuegos artificiales al hacer clic en cualquier parte.

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
│   ├── ui/               # IconButton, ThemeToggle
│   └── birthday/         # BirthdayCard, AgeBadge, PhotoFrame, StarrDrop,
│                         # SecretLetter, ConfettiCanvas
├── hooks/                # useTheme, useStarrDrop
├── lib/                  # particles (motor canvas), celebrate (bus de eventos), constants
└── types/                # Tipos compartidos
public/images/            # Foto familiar
```

## ✏️ Personalización

Casi todo el texto y la configuración del juego viven en `src/lib/constants.ts` (edad, títulos, copy de la carta, rarezas del Starr Drop, emojis y colores de las partículas).

## 🔮 Mejoras pendientes

- **Audio**: la versión original incluía un sintetizador Web Audio (melodía de cumpleaños + efectos). Se omitió en la migración y se planea reintegrar con archivos de audio de mayor calidad.
