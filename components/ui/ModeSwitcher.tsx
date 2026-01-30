"use client";

import { motion } from "framer-motion";
import { useSettingsStore, type LearningMode } from "@/lib/stores";
import { Map, Layers, Trophy, Unlock, Sparkles, BookOpen } from "lucide-react";

interface ModeSwitcherProps {
  compact?: boolean;
}

export function ModeSwitcher({ compact = false }: ModeSwitcherProps) {
  const { language, learningMode, setLearningMode } = useSettingsStore();
  const lang = language as "en" | "ar";

  if (compact) {
    return (
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1">
        <button
          onClick={() => setLearningMode("journey")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            learningMode === "journey"
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">
            {lang === "en" ? "Journey" : "رحلة"}
          </span>
        </button>
        <button
          onClick={() => setLearningMode("modules")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            learningMode === "modules"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden sm:inline">
            {lang === "en" ? "Modules" : "وحدات"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Journey Mode */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLearningMode("journey")}
        className={`p-4 rounded-2xl border-2 text-left transition-all ${
          learningMode === "journey"
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
            learningMode === "journey"
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
          }`}
        >
          <Map className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          {lang === "en" ? "Journey Mode" : "وضع الرحلة"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {lang === "en"
            ? "Levels, XP & achievements"
            : "مستويات وخبرة وإنجازات"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Trophy className="w-3 h-3 text-amber-500" />
          <Sparkles className="w-3 h-3 text-purple-500" />
        </div>
      </motion.button>

      {/* Modules Mode */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLearningMode("modules")}
        className={`p-4 rounded-2xl border-2 text-left transition-all ${
          learningMode === "modules"
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
            learningMode === "modules"
              ? "bg-blue-500 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
          }`}
        >
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          {lang === "en" ? "Free Modules" : "الوحدات الحرة"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {lang === "en" ? "All content unlocked" : "كل المحتوى مفتوح"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Unlock className="w-3 h-3 text-blue-500" />
          <BookOpen className="w-3 h-3 text-teal-500" />
        </div>
      </motion.button>
    </div>
  );
}
