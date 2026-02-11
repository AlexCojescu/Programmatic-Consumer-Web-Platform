import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  webpack: (config) => {
    // Fix for motion package module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "motion/react": path.resolve(
        process.cwd(),
        "node_modules/motion/dist/es/react.mjs"
      ),
    };
    return config;
  },
};

export default nextConfig;
