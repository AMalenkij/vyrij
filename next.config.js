const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale',
        destination: '/:locale/home',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rhxxydegllovbxiecjrp.supabase.co',
        // port: '',
        // pathname: '/storage/v1/object/public/photo/**',
      },
    ],
  },
}

module.exports = withNextIntl({
  ...nextConfig,
  // Добавьте конфигурацию next-intl здесь
  locales: ['en', 'pl', 'ua'],
  defaultLocale: 'en',
})