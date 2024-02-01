/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'vtrack.velsol.com',
      },
    ],
  },
};

export default nextConfig;
