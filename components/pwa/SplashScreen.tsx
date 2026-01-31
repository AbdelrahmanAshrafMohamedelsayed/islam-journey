"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

// Pre-computed star positions to avoid hydration mismatch
const generateStars = (count: number, seed: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic pseudo-random based on index
    const hash = ((i + seed) * 2654435761) % 1000;
    stars.push({
      width: (hash % 30) / 10 + 1,
      height: ((hash * 7) % 30) / 10 + 1,
      left: ((hash * 13) % 1000) / 10,
      top: ((hash * 17) % 1000) / 10,
      duration: 2 + ((hash * 23) % 30) / 10,
      delay: ((hash * 29) % 20) / 10,
    });
  }
  return stars;
};

const STARS = generateStars(80, 42);

export function SplashScreen({
  onComplete,
  minimumDuration = 2500,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, minimumDuration / 50);

    // Hide splash after minimum duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minimumDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [minimumDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-emerald-900 via-slate-900 to-blue-900"
            animate={{
              background: [
                "linear-gradient(135deg, #064e3b 0%, #0f172a 50%, #1e3a5f 100%)",
                "linear-gradient(135deg, #065f46 0%, #0a1929 50%, #172554 100%)",
                "linear-gradient(135deg, #064e3b 0%, #0f172a 50%, #1e3a5f 100%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated stars */}
          <div className="absolute inset-0 overflow-hidden">
            {STARS.map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.width,
                  height: star.height,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          {/* Arabesque pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="arabesque"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"
                    fill="#10b981"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arabesque)" />
            </svg>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center px-8">
            {/* Crescent moon with glow */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative mb-8"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-40 h-40 bg-amber-400/30 rounded-full blur-3xl" />
              </motion.div>

              {/* Crescent moon SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-32 h-32 md:w-40 md:h-40 relative"
              >
                <defs>
                  <linearGradient
                    id="moonGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M50 5 A45 45 0 1 1 50 95 A35 35 0 1 0 50 5"
                  fill="url(#moonGradient)"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                {/* Star decoration */}
                <motion.path
                  d="M75 20 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1z"
                  fill="#fbbf24"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                />
              </svg>
            </motion.div>

            {/* Mosque silhouette */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <svg
                viewBox="0 0 200 100"
                className="w-64 h-32 md:w-80 md:h-40"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="mosqueGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>

                {/* Central dome */}
                <motion.path
                  d="M60 55 Q100 10 140 55"
                  stroke="url(#mosqueGradient)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />

                {/* Crescent on dome */}
                <motion.circle
                  cx="100"
                  cy="25"
                  r="6"
                  fill="#fbbf24"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                />

                {/* Left minaret */}
                <motion.path
                  d="M30 90 L30 35 Q30 25 40 25 L40 35 L40 90"
                  fill="url(#mosqueGradient)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Right minaret */}
                <motion.path
                  d="M160 90 L160 35 Q160 25 170 25 L170 35 L170 90"
                  fill="url(#mosqueGradient)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Main building */}
                <motion.rect
                  x="55"
                  y="55"
                  width="90"
                  height="35"
                  fill="url(#mosqueGradient)"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  style={{ transformOrigin: "bottom" }}
                />

                {/* Door arch */}
                <motion.path
                  d="M90 90 L90 70 Q100 60 110 70 L110 90"
                  fill="#064e3b"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                />

                {/* Windows */}
                {[65, 125].map((x, i) => (
                  <motion.rect
                    key={i}
                    x={x}
                    y={65}
                    width="10"
                    height="15"
                    rx="5"
                    fill="#064e3b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* App title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                New Muslim Journey
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-2xl md:text-3xl font-arabic text-amber-400"
                dir="rtl"
              >
                رحلة المسلم الجديد
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-emerald-300/80 text-center text-sm md:text-base mb-8 max-w-xs"
            >
              Your interactive journey to learn and practice Islam
            </motion.p>

            {/* Progress indicator with Islamic geometric design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              className="w-64 md:w-72"
            >
              {/* Progress bar background */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Animated progress fill */}
                <motion.div
                  className="h-full bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
              </div>

              {/* Loading text */}
              <motion.div
                className="flex justify-between mt-2 text-xs text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <span>Loading your journey...</span>
                <span>{Math.round(progress)}%</span>
              </motion.div>
            </motion.div>

            {/* Bismillah */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 text-amber-400/60 font-arabic text-xl"
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.p>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
