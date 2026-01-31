import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

// Bundle analyzer - run with ANALYZE=true npm run build
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Check if building for mobile (Capacitor)
const isMobileBuild = process.env.NEXT_PUBLIC_BUILD_TARGET === "mobile";

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
    // For static export (Capacitor), use unoptimized images
    unoptimized: isMobileBuild,
    // Prefer modern image formats
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.quran.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
      {
        protocol: "https",
        hostname: "cdn.islamic.network",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },

  // Tree-shaking optimizations for date-fns
  modularizeImports: {
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },

  // Compiler optimizations - remove console.log in production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports for better tree-shaking
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@supabase/supabase-js",
      "date-fns",
    ],
  },

  // For Capacitor static export
  ...(isMobileBuild && {
    output: "export",
    trailingSlash: true,
  }),
};

// Apply plugins - order matters: bundle analyzer, next-intl, then Serwist
export default withBundleAnalyzer(withSerwist(withNextIntl(nextConfig)));
