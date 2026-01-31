"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "gold" | "gradient";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const sizeVariants = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const colorVariants = {
  default: "bg-emerald-500",
  success: "bg-green-500",
  gold: "bg-linear-to-r from-amber-500 to-yellow-400",
  gradient: "bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500",
};

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  label,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden",
          sizeVariants[size],
        )}
      >
        {animated ? (
          <motion.div
            className={cn("h-full rounded-full", colorVariants[variant])}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ) : (
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              colorVariants[variant],
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}

// Circular Progress
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "gold";
  showValue?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const circularColorVariants = {
  default: "stroke-emerald-500",
  success: "stroke-green-500",
  gold: "stroke-amber-500",
};

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showValue = true,
  label,
  animated = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-slate-200 dark:stroke-slate-700"
        />
        {/* Progress circle */}
        {animated ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn("fill-none", circularColorVariants[variant])}
            initial={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ) : (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn(
              "fill-none transition-all duration-500",
              circularColorVariants[variant],
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        )}
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {Math.round(percentage)}%
          </span>
        )}
        {label && (
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// XP Progress Bar with level indicator
interface XPProgressProps {
  currentXp: number;
  levelXp: number;
  nextLevelXp: number;
  level: number;
  className?: string;
}

export function XPProgress({
  currentXp,
  levelXp,
  nextLevelXp,
  level,
  className,
}: XPProgressProps) {
  const xpInLevel = currentXp - levelXp;
  const xpNeeded = nextLevelXp - levelXp;
  const percentage = (xpInLevel / xpNeeded) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-yellow-500 text-white font-bold text-sm shadow-md">
            {level}
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Level {level}
          </span>
        </div>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}

// Streak Counter
interface StreakCounterProps {
  days: number;
  isActive?: boolean;
  className?: string;
}

export function StreakCounter({
  days,
  isActive = true,
  className,
}: StreakCounterProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        isActive
          ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
        className,
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        className="text-xl"
        animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        🔥
      </motion.span>
      <span className="font-bold">{days}</span>
      <span className="text-sm opacity-90">day{days !== 1 ? "s" : ""}</span>
    </motion.div>
  );
}
