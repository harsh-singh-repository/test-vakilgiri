import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  // Suppress pre-rendering errors for production builds
  staticPageGenerationTimeout: 60, // Adjust timeout to reduce pre-render issues
  experimental: {
    // Add any experimental features if needed
    appDir: true, // Example: enabling app directory
  },
};
export default nextConfig;
