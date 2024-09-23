/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'storage.googleapis.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'fal.media',
          pathname: '/**',
        },
      ],
    },
  };
export default nextConfig;
