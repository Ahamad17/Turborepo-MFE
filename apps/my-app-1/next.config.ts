import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  distDir: '../../dist/my-app-1',
};

export default nextConfig;
