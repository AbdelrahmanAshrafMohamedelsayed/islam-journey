import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Extend the global scope for service worker
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// Initialize Serwist with configuration
const serwist = new Serwist({
  // Precache entries generated at build time
  precacheEntries: self.__SW_MANIFEST,

  // Skip waiting and claim clients immediately for instant updates
  skipWaiting: true,
  clientsClaim: true,

  // Enable navigation preload for faster page loads
  navigationPreload: true,

  // Use default cache strategies from Serwist
  runtimeCaching: defaultCache,

  // Fallback to offline page when network fails
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// Add event listeners
serwist.addEventListeners();

// Custom install event handling
self.addEventListener("install", (event) => {
  console.log("[SW] Service Worker installing...");
});

// Custom activate event handling
self.addEventListener("activate", (event) => {
  console.log("[SW] Service Worker activated");
});

// Handle messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
