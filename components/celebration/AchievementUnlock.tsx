"use client";

/**
 * AchievementUnlock Component
 * 
 * Cinematic celebration animation when users unlock achievements,
 * complete chapters, or unlock new characters.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Confetti } from "./Confetti";
import { CharacterAvatar } from "@/components/narrative/CharacterAvatar";
import type { Character } from "@/lib/content/characters";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface AchievementUnlockProps {
  isActive: boolean;
  type: "achievement" | "character" | "chapter" | "milestone";
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  character?: Character;
  accentColor?: string;
  onComplete?: () => void;
  onDismiss?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACHIEVEMENT BADGE
// ═══════════════════════════════════════════════════════════════════════════════

function AchievementBadge({ 
  icon, 
  color,
  size = 80 
}: { 
  icon: React.ReactNode; 
  color: string;
  size?: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Badge container */}
      <div
        className="relative flex items-center justify-center rounded-full shadow-2xl"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}40, ${color}80)`,
          border: `3px solid ${color}`,
        }}
      >
        {/* Inner shine */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Icon */}
        <div className="relative z-10 text-4xl">
          {icon}
        </div>
      </div>

      {/* Spinning ring */}
      <motion.div
        className="absolute -inset-2 rounded-full border-2 border-dashed"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function AchievementUnlock({
  isActive,
  type,
  title,
  subtitle,
  description,
  icon,
  character,
  accentColor = "#10b981",
  onComplete,
  onDismiss,
}: AchievementUnlockProps) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Stagger the animations
      setTimeout(() => setShowConfetti(true), 200);
      setTimeout(() => setShowContent(true), 400);
      
      // Auto-dismiss after animation
      const dismissTimer = setTimeout(() => {
        onComplete?.();
      }, 5000);

      return () => clearTimeout(dismissTimer);
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [isActive, onComplete]);

  // Type-specific icons
  const getDefaultIcon = () => {
    switch (type) {
      case "achievement":
        return "🏆";
      case "character":
        return "👤";
      case "chapter":
        return "📖";
      case "milestone":
        return "⭐";
      default:
        return "✨";
    }
  };

  // Type-specific titles
  const getTypeLabel = () => {
    switch (type) {
      case "achievement":
        return "Achievement Unlocked!";
      case "character":
        return "New Guide Unlocked!";
      case "chapter":
        return "Chapter Complete!";
      case "milestone":
        return "Milestone Reached!";
      default:
        return "Congratulations!";
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Confetti */}
          <Confetti
            isActive={showConfetti}
            particleCount={60}
            duration={4000}
            colors={[accentColor, "#fcd34d", "#ffffff", "#3b82f6"]}
          />

          {/* Content card */}
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-50 blur-md"
              style={{ backgroundColor: accentColor }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main card */}
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border overflow-hidden">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, ${accentColor} 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                  >
                    {/* Type label */}
                    <motion.p
                      className="text-sm font-medium uppercase tracking-wider mb-4"
                      style={{ color: accentColor }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {getTypeLabel()}
                    </motion.p>

                    {/* Badge or Character */}
                    <div className="flex justify-center mb-6">
                      {type === "character" && character ? (
                        <CharacterAvatar
                          character={character}
                          size="xl"
                          emotion="excited"
                          showName={false}
                        />
                      ) : (
                        <AchievementBadge
                          icon={icon || getDefaultIcon()}
                          color={accentColor}
                          size={100}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <motion.h2
                      className="text-2xl font-bold mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {title}
                    </motion.h2>

                    {/* Subtitle */}
                    {subtitle && (
                      <motion.p
                        className="text-lg text-muted-foreground mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {subtitle}
                      </motion.p>
                    )}

                    {/* Description */}
                    {description && (
                      <motion.p
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {description}
                      </motion.p>
                    )}

                    {/* Continue button */}
                    <motion.button
                      className="mt-6 px-8 py-3 rounded-full font-medium text-white"
                      style={{ backgroundColor: accentColor }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onDismiss}
                    >
                      Continue Journey
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AchievementUnlock;
