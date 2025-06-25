/** @type {import('next').NextConfig} */
const nextConfig = {
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
