/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Let Next.js serve modern formats when it can
    formats: ['image/avif', 'image/webp'],
    // Good, sensible responsive breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add allowed domains for remote images
    domains: ['images.pexels.com'],
    // OR use remotePatterns for more control (choose one approach)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.pexels.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;