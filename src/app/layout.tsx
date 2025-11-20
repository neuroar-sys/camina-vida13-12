import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caminatas Terapéuticas Palermo - 13 Diciembre 2025",
  description:
    "Experiencia grupal guiada por profesionales en salud y bienestar emocional. Reservá tu lugar ahora en los Bosques de Palermo.",
  keywords:
    "caminatas, terapéuticas, palermo, salud mental, bienestar, grupo, naturaleza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head />
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
