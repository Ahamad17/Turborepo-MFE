import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  distDir: '../../dist/apps/overview/.next',
};

export default nextConfig;
