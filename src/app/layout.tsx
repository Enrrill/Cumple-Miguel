import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${playfair.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-celebration-gradient font-sans flex min-h-screen flex-col justify-between text-slate-100 transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
