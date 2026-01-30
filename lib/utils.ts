import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with locale-aware formatting
 */
export function formatNumber(num: number, locale: "en" | "ar" = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(num);
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 600) return 3;
  if (xp < 1000) return 4;
  if (xp < 1500) return 5;
  if (xp < 2200) return 6;
  if (xp < 3000) return 7;
  if (xp < 4000) return 8;
  if (xp < 5500) return 9;
  return 10;
}

/**
 * Calculate XP progress to next level
 */
export function calculateXpProgress(xp: number): {
  current: number;
  max: number;
  percentage: number;
} {
  const levelThresholds = [
    0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500,
  ];
  const level = calculateLevel(xp);

  if (level === 10) {
    return { current: xp, max: xp, percentage: 100 };
  }

  const currentLevelXp = levelThresholds[level - 1];
  const nextLevelXp = levelThresholds[level];
  const current = xp - currentLevelXp;
  const max = nextLevelXp - currentLevelXp;

  return {
    current,
    max,
    percentage: Math.round((current / max) * 100),
  };
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(
  minutes: number,
  locale: "en" | "ar" = "en",
): string {
  if (locale === "ar") {
    if (minutes < 60) return `${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${hours} ساعة`;
  }

  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Format streak days
 */
export function formatStreak(days: number, locale: "en" | "ar" = "en"): string {
  if (locale === "ar") {
    if (days === 0) return "لا يوجد";
    if (days === 1) return "يوم واحد";
    if (days === 2) return "يومان";
    if (days <= 10) return `${days} أيام`;
    return `${days} يوم`;
  }

  if (days === 0) return "No streak";
  if (days === 1) return "1 day";
  return `${days} days`;
}

/**
 * Get greeting based on time of day
 */
export function getTimeGreeting(locale: "en" | "ar" = "en"): string {
  const hour = new Date().getHours();

  if (locale === "ar") {
    if (hour < 12) return "صباح الخير";
    if (hour < 17) return "مساء الخير";
    return "مساء النور";
  }

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Check if running on client side
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isClient()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get direction based on locale
 */
export function getDirection(locale: "en" | "ar"): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Format date based on locale
 */
export function formatDate(date: Date, locale: "en" | "ar" = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Calculate days until Ramadan (approximate)
 */
export function daysUntilRamadan(): number {
  // This is a simplified calculation - in production, use a proper Islamic calendar library
  const today = new Date();
  // Approximate Ramadan 2026 start date
  const ramadan2026 = new Date(2026, 1, 17); // February 17, 2026 (approximate)

  const diffTime = ramadan2026.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

/**
 * Storage helpers with JSON parsing
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (!isClient()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("Failed to save to localStorage");
    }
  },

  remove: (key: string): void => {
    if (!isClient()) return;
    localStorage.removeItem(key);
  },
};
