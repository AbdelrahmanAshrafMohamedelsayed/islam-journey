"use client";

import { motion } from "framer-motion";
import { WifiOff, RefreshCw, Moon, Star } from "lucide-react";

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Crescent moon decoration */}
      <motion.div
        className="absolute top-20 right-10 md:right-20"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <Moon className="w-16 h-16 md:w-24 md:h-24 text-amber-400 fill-amber-400" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* Mosque silhouette icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Glowing background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          </div>

          {/* Mosque SVG */}
          <svg
            viewBox="0 0 100 80"
            className="w-40 h-32 mx-auto relative"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Main dome */}
            <motion.path
              d="M30 45 Q50 20 70 45"
              className="text-emerald-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Crescent on top */}
            <motion.circle
              cx="50"
              cy="28"
              r="4"
              className="text-amber-400 fill-amber-400/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
            />

            {/* Left minaret */}
            <motion.path
              d="M20 70 L20 35 Q20 30 25 30 L25 35 L25 70"
              className="text-emerald-300"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Right minaret */}
            <motion.path
              d="M75 70 L75 35 Q75 30 80 30 L80 35 L80 70"
              className="text-emerald-300"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Base */}
            <motion.rect
              x="28"
              y="45"
              width="44"
              height="25"
              className="text-emerald-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />

            {/* Door */}
            <motion.path
              d="M45 70 L45 55 Q50 50 55 55 L55 70"
              className="text-emerald-200"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
          </svg>
        </motion.div>

        {/* Offline icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm"
        >
          <WifiOff className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title - English */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-white mb-2"
        >
          You're Offline
        </motion.h1>

        {/* Title - Arabic */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-xl md:text-2xl font-arabic text-white/90 mb-6"
          dir="rtl"
        >
          أنت غير متصل بالإنترنت
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 mb-8 leading-relaxed"
        >
          Please check your internet connection to continue your Islamic
          learning journey.
          <br />
          <span className="font-arabic" dir="rtl">
            يرجى التحقق من اتصالك بالإنترنت لمواصلة رحلتك في تعلم الإسلام.
          </span>
        </motion.p>

        {/* Retry button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRetry}
          className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
          <span className="font-arabic">• حاول مرة أخرى</span>
        </motion.button>

        {/* Decorative message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <p className="text-amber-300/90 text-sm italic">
            "Verily, with hardship comes ease."
          </p>
          <p className="text-amber-300/70 text-sm font-arabic mt-1" dir="rtl">
            إِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>
          <p className="text-white/50 text-xs mt-2">— Quran 94:6</p>
        </motion.div>

        {/* Floating stars decoration */}
        <motion.div
          className="absolute -bottom-10 left-0"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Star className="w-6 h-6 text-amber-400/30 fill-amber-400/20" />
        </motion.div>
        <motion.div
          className="absolute -bottom-5 right-0"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <Star className="w-4 h-4 text-emerald-400/30 fill-emerald-400/20" />
        </motion.div>
      </motion.div>
    </div>
  );
}
