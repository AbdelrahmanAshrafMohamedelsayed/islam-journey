import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";

// Initialize next-intl plugin
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Initialize Serwist for PWA support
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  // Disable in development since Serwist doesn't support Turbopack yet
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Add empty turbopack config to silence the warning
  turbopack: {},

  // Image optimization
  images: {
    // For static export (Capacitor), uncomment:
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.quran.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // For Capacitor static export, uncomment:
  // output: 'export',
  // trailingSlash: true,
};

// Apply both plugins - order matters: next-intl first, then Serwist
export default withSerwist(withNextIntl(nextConfig));
