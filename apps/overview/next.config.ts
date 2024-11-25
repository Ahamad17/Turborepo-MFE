import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  distDir: '../../dist/apps/overview',
  output: 'standalone',
  webpack: (config, { dev, isServer }) => {
    // Add HMR config here if needed
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: 1000,
      };
    }

    return config;
  },
};

export default nextConfig;
