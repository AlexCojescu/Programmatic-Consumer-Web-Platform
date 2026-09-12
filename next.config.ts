import type { NextConfig } from "next";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import { getSecurityHeaders } from "./src/core/security/security-headers";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 80, 96, 128, 256, 384],
    qualities: [75, 80],
  },
  experimental: {
    taint: true,
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "recharts",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: getSecurityHeaders(),
      },
    ];
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

export default withBundleAnalyzer(nextConfig);
