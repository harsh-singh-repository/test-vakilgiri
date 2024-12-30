import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors: true,
  },
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'd1muf25xaso8hp.cloudfront.net',
      pathname: '/**',
    },
  ],
},
};
export default nextConfig;
