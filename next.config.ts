import type { NextConfig } from "next";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import { getSecurityHeaders } from "./src/lib/security-headers";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "recharts",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@headlessui/react",
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
