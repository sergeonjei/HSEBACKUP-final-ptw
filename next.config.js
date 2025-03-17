/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are the locales you want to support
    locales: ['en', 'ar', 'hi', 'ur'],
    // This is the default locale when no locale segment is detected in the URL
    defaultLocale: 'en',
    // This will allow locale detection from Accept-Language header
    localeDetection: true,
  },
}

module.exports = nextConfig 