import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";

import { AudioProvider } from "@/components/audio/AudioProvider";

import "./globals.css";

// Display redondeada y divertida para títulos (fiesta)
const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Cuerpo redondeado y legible
const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "¡Feliz Cumpleaños #46, Papá!",
  description:
    "Una celebración muy especial de parte de tus hijos que te aman y admiran.",
};

/**
 * Aplica el tema guardado (o el oscuro por defecto) antes de pintar,
 * evitando el parpadeo de claro → oscuro al cargar.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t!=="light":true;var r=document.documentElement;r.classList.toggle("dark",d);r.classList.toggle("light",!d);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fredoka.variable} ${nunito.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-celebration-gradient font-sans flex min-h-screen flex-col justify-between text-slate-100 transition-colors duration-500">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
