import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'ik.imagekit.io' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
