/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats when available
    formats: ['image/avif', 'image/webp'],
    // Sensible responsive breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optional: stricter SWC minification for smaller JS
  swcMinify: true,
};

module.exports = nextConfig;
