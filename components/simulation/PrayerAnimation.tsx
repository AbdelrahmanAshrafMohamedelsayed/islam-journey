"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type PrayerPosition =
  | "standing"
  | "standing-hands-raised"
  | "standing-hands-chest"
  | "bowing"
  | "standing-from-bow"
  | "prostrating"
  | "sitting"
  | "sitting-tasleem-right"
  | "sitting-tasleem-left";

interface PrayerAnimationProps {
  position: PrayerPosition;
  size?: "sm" | "md" | "lg" | "xl";
  showGlow?: boolean;
  className?: string;
}

// SVG-based animated prayer figure
export function PrayerAnimation({
  position,
  size = "lg",
  showGlow = true,
  className = "",
}: PrayerAnimationProps) {
  const sizeMap = {
    sm: { width: 80, height: 120 },
    md: { width: 120, height: 180 },
    lg: { width: 160, height: 240 },
    xl: { width: 200, height: 300 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {showGlow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-emerald-400/30 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.svg
          key={position}
          width={width}
          height={height}
          viewBox="0 0 100 150"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <defs>
            {/* Gradient for body */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Gradient for prayer mat */}
            <linearGradient id="matGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Prayer mat */}
          <motion.ellipse
            cx="50"
            cy="140"
            rx="40"
            ry="8"
            fill="url(#matGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Mat decoration */}
          <motion.path
            d="M 20 140 Q 50 135 80 140"
            stroke="#10b981"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />

          {/* Render position-specific figure */}
          {renderPosition(position)}
        </motion.svg>
      </AnimatePresence>
    </div>
  );
}

function renderPosition(position: PrayerPosition) {
  const bodyColor = "url(#bodyGradient)";
  const headColor = "#fbbf24"; // Warm skin tone

  switch (position) {
    case "standing":
    case "standing-hands-chest":
      return (
        <g>
          {/* Head */}
          <motion.circle
            cx="50"
            cy="25"
            r="12"
            fill={headColor}
            filter="url(#glow)"
          />
          {/* Body */}
          <motion.rect
            x="38"
            y="37"
            width="24"
            height="50"
            rx="8"
            fill={bodyColor}
          />
          {/* Legs */}
          <motion.rect
            x="40"
            y="87"
            width="8"
            height="50"
            rx="4"
            fill={bodyColor}
          />
          <motion.rect
            x="52"
            y="87"
            width="8"
            height="50"
            rx="4"
            fill={bodyColor}
          />
          {/* Arms crossed on chest */}
          <motion.ellipse cx="50" cy="55" rx="18" ry="8" fill={bodyColor} />
          {/* Taqiyah (cap) */}
          <motion.ellipse cx="50" cy="18" rx="10" ry="4" fill="#059669" />
        </g>
      );

    case "standing-hands-raised":
      return (
        <g>
          {/* Head */}
          <motion.circle
            cx="50"
            cy="25"
            r="12"
            fill={headColor}
            filter="url(#glow)"
          />
          {/* Body */}
          <motion.rect
            x="38"
            y="37"
            width="24"
            height="50"
            rx="8"
            fill={bodyColor}
          />
          {/* Legs */}
          <motion.rect
            x="40"
            y="87"
            width="8"
            height="50"
            rx="4"
            fill={bodyColor}
          />
          <motion.rect
            x="52"
            y="87"
            width="8"
            height="50"
            rx="4"
            fill={bodyColor}
          />
          {/* Arms raised */}
          <motion.rect
            x="20"
            y="20"
            width="8"
            height="30"
            rx="4"
            fill={bodyColor}
            initial={{ rotate: 0 }}
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "24px 50px" }}
          />
          <motion.rect
            x="72"
            y="20"
            width="8"
            height="30"
            rx="4"
            fill={bodyColor}
            initial={{ rotate: 0 }}
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "76px 50px" }}
          />
          {/* Hands */}
          <motion.circle cx="24" cy="18" r="5" fill={headColor} />
          <motion.circle cx="76" cy="18" r="5" fill={headColor} />
          {/* Taqiyah */}
          <motion.ellipse cx="50" cy="18" rx="10" ry="4" fill="#059669" />
        </g>
      );

    case "bowing":
      return (
        <g>
          {/* Body bent */}
          <motion.ellipse
            cx="50"
            cy="70"
            rx="30"
            ry="15"
            fill={bodyColor}
            initial={{ scaleX: 0.8 }}
            animate={{ scaleX: 1 }}
          />
          {/* Head looking down */}
          <motion.circle
            cx="25"
            cy="58"
            r="10"
            fill={headColor}
            filter="url(#glow)"
          />
          {/* Back */}
          <motion.rect
            x="30"
            y="60"
            width="40"
            height="12"
            rx="6"
            fill={bodyColor}
          />
          {/* Legs */}
          <motion.rect
            x="55"
            y="75"
            width="8"
            height="55"
            rx="4"
            fill={bodyColor}
          />
          <motion.rect
            x="67"
            y="75"
            width="8"
            height="55"
            rx="4"
            fill={bodyColor}
          />
          {/* Arms on knees */}
          <motion.rect
            x="50"
            y="90"
            width="6"
            height="25"
            rx="3"
            fill={bodyColor}
          />
          <motion.rect
            x="70"
            y="90"
            width="6"
            height="25"
            rx="3"
            fill={bodyColor}
          />
          {/* Taqiyah */}
          <motion.ellipse cx="25" cy="52" rx="8" ry="3" fill="#059669" />
        </g>
      );

    case "prostrating":
      return (
        <g>
          {/* Body prostrating */}
          <motion.ellipse
            cx="50"
            cy="115"
            rx="35"
            ry="12"
            fill={bodyColor}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          {/* Head on ground */}
          <motion.circle
            cx="25"
            cy="125"
            r="8"
            fill={headColor}
            filter="url(#glow)"
          />
          {/* Arms extended */}
          <motion.rect
            x="15"
            y="108"
            width="25"
            height="6"
            rx="3"
            fill={bodyColor}
          />
          <motion.rect
            x="60"
            y="108"
            width="25"
            height="6"
            rx="3"
            fill={bodyColor}
          />
          {/* Hands */}
          <motion.circle cx="12" cy="111" r="4" fill={headColor} />
          <motion.circle cx="88" cy="111" r="4" fill={headColor} />
          {/* Knees */}
          <motion.ellipse cx="70" cy="125" rx="10" ry="8" fill={bodyColor} />
          {/* Feet */}
          <motion.ellipse cx="75" cy="135" rx="8" ry="5" fill={bodyColor} />
          {/* Taqiyah */}
          <motion.ellipse cx="25" cy="120" rx="6" ry="2" fill="#059669" />
        </g>
      );

    case "sitting":
      return (
        <g>
          {/* Head */}
          <motion.circle
            cx="50"
            cy="60"
            r="10"
            fill={headColor}
            filter="url(#glow)"
          />
          {/* Body */}
          <motion.rect
            x="40"
            y="70"
            width="20"
            height="35"
            rx="6"
            fill={bodyColor}
          />
          {/* Legs folded */}
          <motion.ellipse cx="50" cy="120" rx="25" ry="12" fill={bodyColor} />
          {/* Arms on thighs */}
          <motion.rect
            x="30"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          <motion.rect
            x="64"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          {/* Hands */}
          <motion.circle cx="33" cy="112" r="4" fill={headColor} />
          <motion.circle cx="67" cy="112" r="4" fill={headColor} />
          {/* Index finger pointing (for tashahud) */}
          <motion.rect
            x="67"
            y="105"
            width="3"
            height="10"
            rx="1"
            fill={headColor}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {/* Taqiyah */}
          <motion.ellipse cx="50" cy="54" rx="8" ry="3" fill="#059669" />
        </g>
      );

    case "sitting-tasleem-right":
      return (
        <g>
          {/* Head turned right */}
          <motion.circle
            cx="60"
            cy="60"
            r="10"
            fill={headColor}
            filter="url(#glow)"
            initial={{ cx: 50 }}
            animate={{ cx: 60 }}
          />
          {/* Body */}
          <motion.rect
            x="40"
            y="70"
            width="20"
            height="35"
            rx="6"
            fill={bodyColor}
          />
          {/* Legs folded */}
          <motion.ellipse cx="50" cy="120" rx="25" ry="12" fill={bodyColor} />
          {/* Arms */}
          <motion.rect
            x="30"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          <motion.rect
            x="64"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          {/* Hands */}
          <motion.circle cx="33" cy="112" r="4" fill={headColor} />
          <motion.circle cx="67" cy="112" r="4" fill={headColor} />
          {/* Taqiyah */}
          <motion.ellipse cx="60" cy="54" rx="8" ry="3" fill="#059669" />
        </g>
      );

    case "sitting-tasleem-left":
      return (
        <g>
          {/* Head turned left */}
          <motion.circle
            cx="40"
            cy="60"
            r="10"
            fill={headColor}
            filter="url(#glow)"
            initial={{ cx: 50 }}
            animate={{ cx: 40 }}
          />
          {/* Body */}
          <motion.rect
            x="40"
            y="70"
            width="20"
            height="35"
            rx="6"
            fill={bodyColor}
          />
          {/* Legs folded */}
          <motion.ellipse cx="50" cy="120" rx="25" ry="12" fill={bodyColor} />
          {/* Arms */}
          <motion.rect
            x="30"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          <motion.rect
            x="64"
            y="90"
            width="6"
            height="20"
            rx="3"
            fill={bodyColor}
          />
          {/* Hands */}
          <motion.circle cx="33" cy="112" r="4" fill={headColor} />
          <motion.circle cx="67" cy="112" r="4" fill={headColor} />
          {/* Taqiyah */}
          <motion.ellipse cx="40" cy="54" rx="8" ry="3" fill="#059669" />
        </g>
      );

    default:
      return null;
  }
}

// Animated Qibla compass
export function QiblaCompass({
  size = 100,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Simulate compass finding Qibla direction
    const targetRotation = 135; // Example Qibla direction
    const interval = setInterval(() => {
      setRotation((prev) => {
        const diff = targetRotation - prev;
        if (Math.abs(diff) < 1) return targetRotation;
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient
            id="compassGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#1e293b"
          stroke="url(#compassGradient)"
          strokeWidth="2"
        />

        {/* Direction markers */}
        {["N", "E", "S", "W"].map((dir, i) => (
          <text
            key={dir}
            x="50"
            y="15"
            textAnchor="middle"
            fill={dir === "N" ? "#10b981" : "#64748b"}
            fontSize="10"
            fontWeight="bold"
            transform={`rotate(${i * 90} 50 50)`}
          >
            {dir}
          </text>
        ))}

        {/* Degree markers */}
        {[...Array(36)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="5"
            x2="50"
            y2={i % 3 === 0 ? "10" : "7"}
            stroke="#64748b"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
            transform={`rotate(${i * 10} 50 50)`}
          />
        ))}

        {/* Compass needle */}
        <motion.g
          animate={{ rotate: rotation }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* North pointer (Qibla) */}
          <polygon points="50,15 45,50 55,50" fill="#10b981" />
          {/* South pointer */}
          <polygon points="50,85 45,50 55,50" fill="#94a3b8" />
          {/* Center circle */}
          <circle cx="50" cy="50" r="5" fill="#10b981" />
        </motion.g>

        {/* Kaaba icon at Qibla direction */}
        <motion.g
          animate={{ rotate: rotation }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <text x="50" y="28" textAnchor="middle" fontSize="12">
            🕋
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

// Animated prayer time indicator
export function PrayerTimeIndicator({
  prayerName,
  time,
  isActive,
}: {
  prayerName: string;
  time: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-emerald-500 text-white"
          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
      }`}
      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span className="font-medium">{prayerName}</span>
      <span className={isActive ? "font-bold" : "font-medium"}>{time}</span>
    </motion.div>
  );
}
