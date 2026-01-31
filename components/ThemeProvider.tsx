"use client";

/**
 * ThemeProvider Component
 *
 * Syncs the theme state from Zustand store to DOM classes.
 * Handles light, dark, mosque, and system preference themes.
 */

import { useEffect } from "react";
import { useSettingsStore } from "@/lib/stores";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes first
    root.classList.remove("light", "dark", "mosque");

    if (theme === "system") {
      // Follow system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");

      // Listen for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Apply selected theme directly
      root.classList.add(theme);

      // Mosque theme also needs dark mode styles as base
      if (theme === "mosque") {
        root.classList.add("dark");
      }
    }
  }, [theme]);

  return <>{children}</>;
}

export default ThemeProvider;
