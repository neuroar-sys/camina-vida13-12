import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
  description:
    "Experiencia grupal guiada por profesionales en salud y bienestar emocional. Reservá tu lugar ahora en los Bosques de Palermo.",
  keywords:
    "caminatas, terapéuticas, palermo, salud mental, bienestar, grupo, naturaleza",
  openGraph: {
    title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
    description:
      "Sumate a la caminata que transforma cuerpo y mente. Palermo, 13 de diciembre.",
    url: "https://caminavida.com.ar/",
    siteName: "Camina Vida",
    images: [
      {
        url: "/og.webp", // ⚠️ asegurate que exista en /public
        width: 1200,
        height: 630,
        alt: "Caminata Terapéutica Palermo 13/12",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caminata Terapéutica en Palermo - 13 Diciembre 2025",
    description:
      "Sumate a la caminata que transforma cuerpo y mente. Palermo, 13 de diciembre.",
    images: ["/og.webp"],
  },
  icons: {
    icon: "/favicon1.ico", // ⚠️ asegurate que exista en /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
