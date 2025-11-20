/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
