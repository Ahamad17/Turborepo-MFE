import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  distDir: '../../dist/my-app',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
