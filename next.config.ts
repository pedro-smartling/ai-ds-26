/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/docs', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.smartling.com',
        port: '',
        pathname: '/hubfs/SmartlingWebsite-WCS/**',
      },
    ],
  },
};

export default nextConfig;
