import type { NextConfig } from "next";
import {withHydrationOverlay} from "@builder.io/react-hydration-overlay/next"

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
export default withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with the pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: "main",
})(nextConfig);
