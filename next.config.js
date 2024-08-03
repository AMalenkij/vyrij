/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
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

module.exports = nextConfig
