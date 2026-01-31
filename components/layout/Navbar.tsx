"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { Button } from "@/components/ui";
import {
  Menu,
  X,
  Home,
  Map,
  BookOpen,
  History,
  MessageCircleQuestion,
  Moon,
  Gamepad2,
  Trophy,
  Settings,
  Sun,
  Globe,
  User,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", labelAr: "الرئيسية", icon: Home },
  { href: "/journey", label: "Journey", labelAr: "الرحلة", icon: Map },
  { href: "/quran", label: "Quran", labelAr: "القرآن", icon: BookOpen },
  { href: "/history", label: "History", labelAr: "التاريخ", icon: History },
  {
    href: "/misconceptions",
    label: "Misconceptions",
    labelAr: "رد الشبهات",
    icon: MessageCircleQuestion,
  },
  { href: "/ramadan", label: "Ramadan", labelAr: "رمضان", icon: Moon },
  { href: "/games", label: "Games", labelAr: "الألعاب", icon: Gamepad2 },
  {
    href: "/achievements",
    label: "Achievements",
    labelAr: "الإنجازات",
    icon: Trophy,
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, theme, setLanguage, setTheme } = useSettingsStore();
  const { totalXp, level, streakDays } = useProgressStore();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // Cycle through themes: light → dark → mosque → light
  const cycleTheme = () => {
    const themeOrder: Array<"light" | "dark" | "mosque"> = [
      "light",
      "dark",
      "mosque",
    ];
    const currentIndex = themeOrder.indexOf(
      theme as "light" | "dark" | "mosque",
    );
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  // Get theme icon and label
  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return { icon: <Moon className="w-5 h-5" />, label: "Dark" };
      case "mosque":
        return { icon: <span className="text-lg">🕌</span>, label: "Mosque" };
      default:
        return { icon: <Sun className="w-5 h-5" />, label: "Light" };
    }
  };

  const themeInfo = getThemeIcon();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30">
              🕌
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-slate-900 dark:text-white">
                {language === "ar" ? "رحلة المسلم" : "Muslim Journey"}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === "ar"
                  ? "تعلم • تدرب • نمو"
                  : "Learn • Practice • Grow"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{language === "ar" ? item.labelAr : item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-3 mr-2">
              {/* XP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                <span className="text-sm font-bold">{totalXp}</span>
                <span className="text-xs">XP</span>
              </div>
              {/* Streak */}
              {streakDays > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300">
                  <span>🔥</span>
                  <span className="text-sm font-bold">{streakDays}</span>
                </div>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group"
              aria-label={`Theme: ${themeInfo.label}. Click to change.`}
              title={`Theme: ${themeInfo.label}`}
            >
              {themeInfo.icon}
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {themeInfo.label}
              </span>
            </button>

            {/* Settings */}
            <Link
              href="/settings"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{language === "ar" ? item.labelAr : item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile stats */}
              <div className="flex items-center gap-3 px-4 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                  <span className="text-sm font-bold">{totalXp}</span>
                  <span className="text-xs">XP</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                  <span className="text-sm font-bold">Lv.{level}</span>
                </div>
                {streakDays > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300">
                    <span>🔥</span>
                    <span className="text-sm font-bold">{streakDays}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
