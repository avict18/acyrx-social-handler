import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This disables ESLint during `next build`, including on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
