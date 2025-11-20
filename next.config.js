/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  swcMinify: true, // minificación moderna

  experimental: {
    optimizePackageImports: ["react-icons"], // reduce bundle de iconos
  },

  images: {
    formats: ["image/avif", "image/webp"], // formatos modernos
    domains: ["i.ytimg.com"], // habilita imágenes desde YouTube CDN
  },
};

module.exports = nextConfig;
