/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Remove i18n config as it's not supported in App Router
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 