/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Remove i18n config as it's not supported in App Router
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'vercel.app'],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs', 'net', etc. on the client to prevent errors
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        crypto: false,
      };
      
      // Exclude server-only packages
      config.externals.push({
        'bcrypt': 'bcrypt',
        'node-pre-gyp': 'node-pre-gyp'
      });
    }
    return config;
  },
}

module.exports = nextConfig 