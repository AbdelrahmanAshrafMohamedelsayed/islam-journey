"use client";

/**
 * LevelUpCelebration Component
 *
 * Full-screen dramatic level transition animation
 * with radial burst, light rays, and cinematic reveal.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Confetti } from "./Confetti";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface LevelUpCelebrationProps {
  isActive: boolean;
  fromLevel: number;
  toLevel: number;
  xpEarned?: number;
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEVEL BADGE
// ═══════════════════════════════════════════════════════════════════════════════

function LevelBadge({ level, isNew }: { level: number; isNew?: boolean }) {
  const size = isNew ? 140 : 80;
  const colors = getLevelColors(level);

  return (
    <motion.div
      className="relative"
      initial={isNew ? { scale: 0, rotate: -180 } : { scale: 1, opacity: 0.5 }}
      animate={isNew ? { scale: 1, rotate: 0 } : { scale: 0.8, opacity: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: isNew ? 0.5 : 0,
      }}
    >
      {/* Glow */}
      {isNew && (
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: colors.primary }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main badge */}
      <div
        className="relative flex items-center justify-center rounded-full shadow-2xl"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          boxShadow: isNew ? `0 0 40px ${colors.primary}60` : undefined,
        }}
      >
        {/* Inner shine */}
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Level number */}
        <span
          className="relative z-10 font-bold text-white"
          style={{ fontSize: isNew ? "3rem" : "1.5rem" }}
        >
          {level}
        </span>

        {/* Decorative ring */}
        <div
          className="absolute inset-1 rounded-full border-2"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        />
      </div>

      {/* Spinning decoration for new level */}
      {isNew && (
        <motion.div
          className="absolute -inset-4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${angle}deg) translateY(-${size / 2 + 20}px)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: angle / 360,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Get colors based on level
function getLevelColors(level: number) {
  const colorSchemes = [
    { primary: "#10b981", secondary: "#059669" }, // Emerald (1-4)
    { primary: "#3b82f6", secondary: "#2563eb" }, // Blue (5-9)
    { primary: "#8b5cf6", secondary: "#7c3aed" }, // Purple (10-14)
    { primary: "#f59e0b", secondary: "#d97706" }, // Amber (15-19)
    { primary: "#ef4444", secondary: "#dc2626" }, // Red (20-24)
    { primary: "#fcd34d", secondary: "#f59e0b" }, // Gold (25+)
  ];

  const index = Math.min(Math.floor(level / 5), colorSchemes.length - 1);
  return colorSchemes[index];
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHT RAYS
// ═══════════════════════════════════════════════════════════════════════════════

function LightRays({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: "4px",
            height: "100vh",
            background: `linear-gradient(to top, ${color}80, transparent)`,
            transform: `rotate(${i * 30}deg)`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: [0, 0.6, 0], scaleY: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.3 + i * 0.05,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function LevelUpCelebration({
  isActive,
  fromLevel,
  toLevel,
  xpEarned,
  onComplete,
}: LevelUpCelebrationProps) {
  const [phase, setPhase] = useState<
    "intro" | "transition" | "reveal" | "complete"
  >("intro");
  const newLevelColors = getLevelColors(toLevel);

  useEffect(() => {
    if (isActive) {
      setPhase("intro");

      // Animation timeline
      const timers = [
        setTimeout(() => setPhase("transition"), 800),
        setTimeout(() => setPhase("reveal"), 1500),
        setTimeout(() => {
          setPhase("complete");
          onComplete?.();
        }, 4500),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark backdrop */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
          />

          {/* Radial gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${newLevelColors.primary}20 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Light rays */}
          {(phase === "transition" || phase === "reveal") && (
            <LightRays color={newLevelColors.primary} />
          )}

          {/* Confetti */}
          {phase === "reveal" && (
            <Confetti
              isActive={true}
              particleCount={80}
              duration={3500}
              colors={[
                newLevelColors.primary,
                newLevelColors.secondary,
                "#fcd34d",
                "#ffffff",
              ]}
            />
          )}

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* "Level Up" text */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{
                opacity: phase === "intro" ? 1 : 0,
                y: phase === "intro" ? 0 : -50,
              }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white/80 uppercase tracking-widest">
                Level Up!
              </h2>
            </motion.div>

            {/* Level badges */}
            <div className="flex items-center justify-center gap-8">
              {/* Old level (fading out) */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{
                  opacity: phase !== "intro" ? 0 : 0.5,
                  x: phase !== "intro" ? -100 : 0,
                  scale: phase !== "intro" ? 0.5 : 0.8,
                }}
                transition={{ duration: 0.5 }}
              >
                <LevelBadge level={fromLevel} isNew={false} />
              </motion.div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: phase === "intro" ? 1 : 0,
                  scale: phase === "intro" ? 1 : 0,
                }}
                className="text-4xl text-white/50"
              >
                →
              </motion.div>

              {/* New level */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: phase !== "intro" ? 1 : 0,
                  scale: phase !== "intro" ? 1 : 0,
                  x: phase === "reveal" ? 0 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
              >
                <LevelBadge level={toLevel} isNew={true} />
              </motion.div>
            </div>

            {/* New level announcement */}
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <h1 className="text-5xl font-bold text-white mb-2">
                    Level {toLevel}
                  </h1>
                  <p className="text-xl text-white/70">
                    MashaAllah! Keep going!
                  </p>

                  {xpEarned && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ backgroundColor: `${newLevelColors.primary}30` }}
                    >
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-medium">
                        +{xpEarned} XP Earned
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LevelUpCelebration;
