import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mern-pizza-app.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mernspace-prod-bucket.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // 🚨 This will ignore ALL type errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // 🚨 This will ignore all ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;