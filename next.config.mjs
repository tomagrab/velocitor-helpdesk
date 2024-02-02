/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'vtrack.velsol.com',
      },
      {
        hostname: 'www.velsol.com',
      },
    ],
  },
};

export default nextConfig;
