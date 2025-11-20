import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // tu opción actual

  swcMinify: true, // activa minificación con SWC

  experimental: {
    optimizePackageImports: ["react-icons"], // reduce bundle de iconos
  },

  images: {
    formats: ["image/avif", "image/webp"], // optimiza imágenes automáticamente
  },
};

export default nextConfig;

