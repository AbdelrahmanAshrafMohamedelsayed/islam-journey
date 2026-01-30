import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "New Muslim Journey",
    short_name: "Muslim Journey",
    description:
      "An interactive, gamified journey to learn Islam. Perfect for new Muslims and those curious about the faith.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbf7",
    theme_color: "#10b981",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    dir: "ltr",
    categories: ["education", "lifestyle", "books"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "Home Screen",
      },
      {
        src: "/screenshots/journey-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "Learning Journey",
      },
      {
        src: "/screenshots/home-desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop View",
      },
    ],
    shortcuts: [
      {
        name: "Continue Journey",
        short_name: "Journey",
        description: "Continue your learning journey",
        url: "/journey",
        icons: [{ src: "/icons/shortcut-journey.png", sizes: "192x192" }],
      },
      {
        name: "Wudu Practice",
        short_name: "Wudu",
        description: "Practice ablution steps",
        url: "/simulations/wudu",
        icons: [{ src: "/icons/shortcut-wudu.png", sizes: "192x192" }],
      },
      {
        name: "Prayer Practice",
        short_name: "Salah",
        description: "Learn and practice prayer",
        url: "/simulations/salah",
        icons: [{ src: "/icons/shortcut-salah.png", sizes: "192x192" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
