"use client";

/**
 * CharacterAvatar Component
 *
 * Renders characters as beautiful silhouettes with geometric Islamic patterns.
 * Supports multiple emotions and smooth transitions between states.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import type { Character, CharacterEmotion } from "@/lib/content/characters";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface CharacterAvatarProps {
  character: Character;
  emotion?: CharacterEmotion;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  showGlow?: boolean;
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

// Size mappings
const SIZES = {
  sm: { container: 64, silhouette: 48, pattern: 40, name: "text-xs" },
  md: { container: 96, silhouette: 72, pattern: 60, name: "text-sm" },
  lg: { container: 128, silhouette: 96, pattern: 80, name: "text-base" },
  xl: { container: 192, silhouette: 144, pattern: 120, name: "text-lg" },
};

// Emotion-based animation variants
const EMOTION_ANIMATIONS: Record<
  CharacterEmotion,
  { y: number[]; rotate: number[]; scale: number[] }
> = {
  neutral: { y: [0, -2, 0], rotate: [0, 0, 0], scale: [1, 1, 1] },
  happy: { y: [0, -4, 0], rotate: [-1, 1, -1], scale: [1, 1.02, 1] },
  thinking: { y: [0, 0, 0], rotate: [0, 2, 0], scale: [1, 1, 1] },
  excited: { y: [0, -6, 0], rotate: [-2, 2, -2], scale: [1, 1.05, 1] },
  peaceful: { y: [0, -1, 0], rotate: [0, 0, 0], scale: [1, 1.01, 1] },
  encouraging: { y: [0, -3, 0], rotate: [0, 1, 0], scale: [1, 1.03, 1] },
  welcoming: { y: [0, -2, 0], rotate: [-1, 1, -1], scale: [1, 1.02, 1] },
  proud: { y: [0, -2, 0], rotate: [0, 0, 0], scale: [1, 1.04, 1] },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PATTERN COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function GeometricPattern({ color, size }: { color: string; size: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="absolute opacity-40"
    >
      <defs>
        <pattern
          id="geometric"
          patternUnits="userSpaceOnUse"
          width="20"
          height="20"
        >
          <path
            d="M10 0 L20 10 L10 20 L0 10 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          <circle cx="10" cy="10" r="2" fill={color} opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#geometric)" />
    </svg>
  );
}

function ArabesquePattern({ color, size }: { color: string; size: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="absolute opacity-40"
    >
      <defs>
        <pattern
          id="arabesque"
          patternUnits="userSpaceOnUse"
          width="25"
          height="25"
        >
          <path
            d="M12.5 0 Q25 12.5 12.5 25 Q0 12.5 12.5 0"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
          <path
            d="M0 12.5 Q12.5 0 25 12.5 Q12.5 25 0 12.5"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#arabesque)" />
    </svg>
  );
}

function CalligraphyPattern({ color, size }: { color: string; size: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="absolute opacity-30"
    >
      <defs>
        <pattern
          id="calligraphy"
          patternUnits="userSpaceOnUse"
          width="40"
          height="40"
        >
          {/* Stylized Bismillah-inspired curves */}
          <path
            d="M5 20 Q15 10 25 20 Q35 30 25 35 Q15 40 5 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle
            cx="30"
            cy="15"
            r="3"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#calligraphy)" />
    </svg>
  );
}

function StarsPattern({ color, size }: { color: string; size: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="absolute opacity-50"
    >
      <defs>
        <pattern
          id="stars"
          patternUnits="userSpaceOnUse"
          width="30"
          height="30"
        >
          {/* 8-pointed Islamic star */}
          <path
            d="M15 0 L17 10 L25 8 L19 15 L25 22 L17 20 L15 30 L13 20 L5 22 L11 15 L5 8 L13 10 Z"
            fill={color}
            opacity="0.6"
            transform="scale(0.5) translate(15, 15)"
          />
          <circle cx="5" cy="5" r="1" fill={color} opacity="0.8" />
          <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#stars)" />
    </svg>
  );
}

// Pattern selector
function PatternOverlay({
  style,
  color,
  size,
}: {
  style: string;
  color: string;
  size: number;
}) {
  switch (style) {
    case "geometric":
      return <GeometricPattern color={color} size={size} />;
    case "arabesque":
      return <ArabesquePattern color={color} size={size} />;
    case "calligraphy":
      return <CalligraphyPattern color={color} size={size} />;
    case "stars":
      return <StarsPattern color={color} size={size} />;
    default:
      return <GeometricPattern color={color} size={size} />;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SILHOUETTE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function Silhouette({
  size,
  primaryColor,
  emotion,
}: {
  size: number;
  primaryColor: string;
  emotion: CharacterEmotion;
}) {
  // Slightly different silhouette poses based on emotion
  const getHeadTilt = () => {
    switch (emotion) {
      case "thinking":
        return 5;
      case "happy":
        return -3;
      case "excited":
        return -5;
      case "peaceful":
        return 0;
      case "encouraging":
        return -2;
      default:
        return 0;
    }
  };

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={size * 1.2}
      className="relative z-10"
    >
      <defs>
        <linearGradient
          id={`silhouette-gradient-${primaryColor}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.7" />
        </linearGradient>
        <filter id="silhouette-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Head */}
      <motion.ellipse
        cx="50"
        cy="30"
        rx="22"
        ry="26"
        fill={`url(#silhouette-gradient-${primaryColor})`}
        filter="url(#silhouette-shadow)"
        animate={{ rotate: getHeadTilt() }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "50px 40px" }}
      />

      {/* Shoulders/Body */}
      <path
        d="M15 75 Q15 55 35 50 L50 48 L65 50 Q85 55 85 75 L85 120 L15 120 Z"
        fill={`url(#silhouette-gradient-${primaryColor})`}
        filter="url(#silhouette-shadow)"
      />

      {/* Subtle clothing detail line */}
      <path
        d="M35 55 Q50 60 65 55"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function CharacterAvatar({
  character,
  emotion,
  size = "md",
  showName = true,
  showGlow = true,
  animate = true,
  onClick,
  className = "",
}: CharacterAvatarProps) {
  const currentEmotion = emotion || character.defaultEmotion;
  const dimensions = SIZES[size];
  const animationVariant = EMOTION_ANIMATIONS[currentEmotion];

  // Generate unique pattern ID to prevent SVG conflicts
  const patternId = useMemo(
    () => `pattern-${character.id}-${Math.random().toString(36).slice(2)}`,
    [character.id],
  );

  return (
    <motion.div
      className={`relative flex flex-col items-center ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {/* Glow effect */}
      {showGlow && (
        <motion.div
          className="absolute rounded-full blur-xl"
          style={{
            width: dimensions.container,
            height: dimensions.container,
            backgroundColor: character.primaryColor,
            opacity: 0.2,
          }}
          animate={
            animate
              ? {
                  opacity: [0.15, 0.25, 0.15],
                  scale: [1, 1.1, 1],
                }
              : undefined
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Main avatar container */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden rounded-full"
        style={{
          width: dimensions.container,
          height: dimensions.container,
          background: `linear-gradient(135deg, ${character.primaryColor}20, ${character.secondaryColor}30)`,
          border: `2px solid ${character.primaryColor}40`,
        }}
        animate={
          animate
            ? {
                y: animationVariant.y,
                rotate: animationVariant.rotate,
                scale: animationVariant.scale,
              }
            : undefined
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          <PatternOverlay
            style={character.patternStyle}
            color={character.primaryColor}
            size={dimensions.pattern}
          />
        </div>

        {/* Silhouette */}
        <Silhouette
          size={dimensions.silhouette}
          primaryColor={character.primaryColor}
          emotion={currentEmotion}
        />
      </motion.div>

      {/* Character name */}
      <AnimatePresence>
        {showName && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`mt-2 text-center ${dimensions.name}`}
          >
            <p
              className="font-semibold"
              style={{ color: character.primaryColor }}
            >
              {character.name.en}
            </p>
            <p className="text-muted-foreground text-xs">
              {character.title.en}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MINI AVATAR (for inline use in dialogues)
// ═══════════════════════════════════════════════════════════════════════════════

interface MiniAvatarProps {
  character: Character;
  emotion?: CharacterEmotion;
  size?: number;
  className?: string;
}

export function MiniAvatar({
  character,
  emotion,
  size = 40,
  className = "",
}: MiniAvatarProps) {
  const currentEmotion = emotion || character.defaultEmotion;

  return (
    <motion.div
      className={`relative flex items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${character.primaryColor}30, ${character.secondaryColor}40)`,
        border: `1.5px solid ${character.primaryColor}50`,
      }}
      animate={{
        y: [0, -1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Silhouette
        size={size * 0.7}
        primaryColor={character.primaryColor}
        emotion={currentEmotion}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER SELECTOR (for choosing guide)
// ═══════════════════════════════════════════════════════════════════════════════

interface CharacterSelectorProps {
  characters: Character[];
  selectedId: string;
  unlockedIds: string[];
  onSelect: (characterId: string) => void;
  className?: string;
}

export function CharacterSelector({
  characters,
  selectedId,
  unlockedIds,
  onSelect,
  className = "",
}: CharacterSelectorProps) {
  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {characters.map((character) => {
        const isUnlocked = unlockedIds.includes(character.id);
        const isSelected = selectedId === character.id;

        return (
          <motion.div
            key={character.id}
            className="relative"
            whileHover={isUnlocked ? { scale: 1.05 } : undefined}
          >
            {/* Selection ring */}
            {isSelected && (
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  border: `2px solid ${character.primaryColor}`,
                  boxShadow: `0 0 20px ${character.primaryColor}40`,
                }}
                layoutId="character-selection-ring"
              />
            )}

            {/* Locked overlay */}
            {!isUnlocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}

            <CharacterAvatar
              character={character}
              size="md"
              showGlow={isSelected}
              animate={isSelected}
              onClick={isUnlocked ? () => onSelect(character.id) : undefined}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default CharacterAvatar;
