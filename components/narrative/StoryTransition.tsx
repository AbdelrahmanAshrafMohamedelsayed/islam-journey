"use client";

/**
 * StoryTransition Component
 * 
 * Cinematic scene transitions between lessons, chapters, and major events.
 * Creates immersive atmosphere changes (desert, mosque, night sky, dawn).
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { SceneType } from "@/lib/stores/narrativeStore";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface StoryTransitionProps {
  scene: SceneType;
  isActive: boolean;
  duration?: number;
  title?: string;
  subtitle?: string;
  onComplete?: () => void;
  children?: React.ReactNode;
}

interface SceneConfig {
  background: string;
  overlay: string;
  particleColor: string;
  particleCount: number;
  particleType: "stars" | "sand" | "light" | "leaves";
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const SCENE_CONFIGS: Record<SceneType, SceneConfig> = {
  mosque: {
    background: "linear-gradient(180deg, #1a365d 0%, #2d3748 50%, #1a202c 100%)",
    overlay: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
    particleColor: "#fcd34d",
    particleCount: 20,
    particleType: "light",
  },
  desert: {
    background: "linear-gradient(180deg, #fef3c7 0%, #f59e0b 30%, #c2410c 70%, #7c2d12 100%)",
    overlay: "linear-gradient(180deg, transparent 0%, rgba(194,65,12,0.3) 100%)",
    particleColor: "#fcd34d",
    particleCount: 30,
    particleType: "sand",
  },
  garden: {
    background: "linear-gradient(180deg, #86efac 0%, #22c55e 40%, #15803d 100%)",
    overlay: "radial-gradient(ellipse at bottom, transparent 0%, rgba(0,0,0,0.2) 100%)",
    particleColor: "#86efac",
    particleCount: 15,
    particleType: "leaves",
  },
  night: {
    background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    overlay: "radial-gradient(ellipse at top, rgba(99,102,241,0.1) 0%, transparent 50%)",
    particleColor: "#ffffff",
    particleCount: 50,
    particleType: "stars",
  },
  dawn: {
    background: "linear-gradient(180deg, #1e1b4b 0%, #4c1d95 20%, #db2777 50%, #fb923c 80%, #fcd34d 100%)",
    overlay: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(251,146,60,0.2) 100%)",
    particleColor: "#fcd34d",
    particleCount: 25,
    particleType: "light",
  },
  neutral: {
    background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
    overlay: "transparent",
    particleColor: "#6b7280",
    particleCount: 10,
    particleType: "light",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function StarParticle({ delay, color }: { delay: number; color: string }) {
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.5, 1, 0],
        scale: [0, 1, 1.2, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function SandParticle({ delay, color }: { delay: number; color: string }) {
  const startX = Math.random() * 100;
  const startY = Math.random() * 20 + 80;
  
  return (
    <motion.div
      className="absolute rounded-full opacity-60"
      style={{
        width: 2,
        height: 2,
        left: `${startX}%`,
        backgroundColor: color,
      }}
      initial={{ y: `${startY}vh`, x: 0, opacity: 0 }}
      animate={{
        y: [`${startY}vh`, `${startY - 30}vh`],
        x: [0, Math.random() * 50 - 25],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function LightParticle({ delay, color }: { delay: number; color: string }) {
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute rounded-full blur-sm"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0.5, 1, 1.5, 1, 0.5],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function LeafParticle({ delay, color }: { delay: number; color: string }) {
  const startX = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        width: 8,
        height: 12,
        backgroundColor: color,
        borderRadius: "50% 0 50% 50%",
        opacity: 0.7,
      }}
      initial={{ y: "-10%", rotate: 0, opacity: 0 }}
      animate={{
        y: ["- 10%", "110%"],
        x: [0, Math.sin(startX) * 30, 0],
        rotate: [0, 360, 720],
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function ParticleField({ config }: { config: SceneConfig }) {
  const particles = Array.from({ length: config.particleCount }, (_, i) => i);
  
  const ParticleComponent = {
    stars: StarParticle,
    sand: SandParticle,
    light: LightParticle,
    leaves: LeafParticle,
  }[config.particleType];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <ParticleComponent
          key={i}
          delay={i * 0.2}
          color={config.particleColor}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE-SPECIFIC ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

function MosqueScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/3">
      {/* Mosque silhouette */}
      <svg
        viewBox="0 0 400 150"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-30"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="mosqueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1a365d" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Central dome */}
        <ellipse cx="200" cy="80" rx="60" ry="50" fill="url(#mosqueGradient)" />
        {/* Minaret left */}
        <rect x="80" y="30" width="15" height="120" fill="url(#mosqueGradient)" />
        <ellipse cx="87.5" cy="30" rx="10" ry="8" fill="url(#mosqueGradient)" />
        {/* Minaret right */}
        <rect x="305" y="30" width="15" height="120" fill="url(#mosqueGradient)" />
        <ellipse cx="312.5" cy="30" rx="10" ry="8" fill="url(#mosqueGradient)" />
        {/* Base */}
        <rect x="100" y="100" width="200" height="50" fill="url(#mosqueGradient)" />
      </svg>
      
      {/* Lantern glow effects */}
      <motion.div
        className="absolute bottom-20 left-1/4 w-4 h-4 rounded-full bg-amber-400 blur-md"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-amber-400 blur-md"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}

function DesertScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      {/* Sand dunes */}
      <svg
        viewBox="0 0 400 100"
        className="absolute bottom-0 w-full opacity-40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 Q50 60 100 80 Q150 100 200 70 Q250 40 300 60 Q350 80 400 50 L400 100 Z"
          fill="#fcd34d"
          opacity="0.3"
        />
        <path
          d="M0 100 Q75 70 150 85 Q225 100 300 75 Q375 50 400 70 L400 100 Z"
          fill="#f59e0b"
          opacity="0.4"
        />
      </svg>
      
      {/* Sun/heat shimmer */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-200 blur-3xl"
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}

function NightScene() {
  return (
    <>
      {/* Crescent moon */}
      <motion.div
        className="absolute top-10 right-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <svg viewBox="0 0 50 50" className="w-16 h-16">
          <defs>
            <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="20" fill="url(#moonGlow)" />
          <circle cx="32" cy="20" r="16" fill="#1e1b4b" />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-100 blur-xl opacity-30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </>
  );
}

function DawnScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      {/* Horizon glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: "linear-gradient(0deg, rgba(251,146,60,0.4) 0%, transparent 100%)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Rising sun */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ y: 100 }}
        animate={{ y: 20 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 blur-sm" />
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-200 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

// Scene element selector
function SceneElements({ scene }: { scene: SceneType }) {
  switch (scene) {
    case "mosque":
      return <MosqueScene />;
    case "desert":
      return <DesertScene />;
    case "night":
      return <NightScene />;
    case "dawn":
      return <DawnScene />;
    default:
      return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function StoryTransition({
  scene,
  isActive,
  duration = 3000,
  title,
  subtitle,
  onComplete,
  children,
}: StoryTransitionProps) {
  const [showContent, setShowContent] = useState(false);
  const config = SCENE_CONFIGS[scene];

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowContent(true);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive, duration, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            style={{ background: config.background }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: config.overlay }}
          />

          {/* Particles */}
          <ParticleField config={config} />

          {/* Scene-specific elements */}
          <SceneElements scene={scene} />

          {/* Title and subtitle */}
          {(title || subtitle) && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {title && (
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {title}
                </motion.h1>
              )}
              {subtitle && (
                <motion.p
                  className="text-lg md:text-xl text-white/80 max-w-md drop-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Children content */}
          <AnimatePresence>
            {showContent && children && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE BACKGROUND (for use behind content)
// ═══════════════════════════════════════════════════════════════════════════════

interface SceneBackgroundProps {
  scene: SceneType;
  intensity?: "subtle" | "medium" | "full";
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SceneBackground({
  scene,
  intensity = "subtle",
  animated = true,
  className = "",
  children,
}: SceneBackgroundProps) {
  const config = SCENE_CONFIGS[scene];
  
  const opacityMap = {
    subtle: 0.15,
    medium: 0.4,
    full: 1,
  };

  return (
    <div className={`relative ${className}`}>
      {/* Background layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: config.background,
          opacity: opacityMap[intensity],
        }}
      />

      {/* Particles (only for medium+ intensity) */}
      {animated && intensity !== "subtle" && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <ParticleField
            config={{
              ...config,
              particleCount: Math.floor(config.particleCount * opacityMap[intensity]),
            }}
          />
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUICK SCENE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════════

interface QuickTransitionProps {
  isActive: boolean;
  direction?: "in" | "out";
  color?: string;
  duration?: number;
  onComplete?: () => void;
}

export function QuickTransition({
  isActive,
  direction = "in",
  color = "#000000",
  duration = 500,
  onComplete,
}: QuickTransitionProps) {
  useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100]"
          style={{ backgroundColor: color }}
          initial={{ opacity: direction === "in" ? 0 : 1 }}
          animate={{ opacity: direction === "in" ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 1000 }}
        />
      )}
    </AnimatePresence>
  );
}

export default StoryTransition;
