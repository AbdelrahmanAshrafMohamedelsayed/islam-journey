"use client";

/**
 * Confetti Component
 * 
 * Beautiful celebration effects with Islamic-themed particles:
 * - Crescents, stars, geometric shapes
 * - Bursting animations for achievements and milestones
 */

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
  shapes?: ("crescent" | "star" | "circle" | "diamond")[];
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: string;
  delay: number;
  duration: number;
  xVelocity: number;
  yVelocity: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEFAULT CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_COLORS = [
  "#10b981", // Emerald
  "#fcd34d", // Gold
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#f472b6", // Pink
  "#22c55e", // Green
];

const DEFAULT_SHAPES: ("crescent" | "star" | "circle" | "diamond")[] = [
  "crescent",
  "star",
  "circle",
  "diamond",
];

// ═══════════════════════════════════════════════════════════════════════════════
// SHAPE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function CrescentShape({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        fill={color}
      />
    </svg>
  );
}

function StarShape({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.6-6.3 4.6 2.3-7.4-6-4.6h7.6z"
        fill={color}
      />
    </svg>
  );
}

function CircleShape({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
}

function DiamondShape({ color, size }: { color: string; size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        transform: "rotate(45deg)",
      }}
    />
  );
}

function ShapeRenderer({ shape, color, size }: { shape: string; color: string; size: number }) {
  switch (shape) {
    case "crescent":
      return <CrescentShape color={color} size={size} />;
    case "star":
      return <StarShape color={color} size={size} />;
    case "circle":
      return <CircleShape color={color} size={size} />;
    case "diamond":
      return <DiamondShape color={color} size={size} />;
    default:
      return <CircleShape color={color} size={size} />;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function ConfettiParticle({ particle }: { particle: Particle }) {
  const size = 8 + particle.scale * 12;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${particle.x}%`,
        top: "50%",
      }}
      initial={{
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 0,
      }}
      animate={{
        opacity: [1, 1, 1, 0],
        y: [0, -200 - particle.yVelocity * 300, -100, 400],
        x: [0, particle.xVelocity * 150, particle.xVelocity * 200, particle.xVelocity * 250],
        rotate: [0, particle.rotation * 2, particle.rotation * 4, particle.rotation * 6],
        scale: [0, 1.2, 1, 0.8],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ShapeRenderer shape={particle.shape} color={particle.color} size={size} />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CONFETTI COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function Confetti({
  isActive,
  duration = 3000,
  particleCount = 50,
  colors = DEFAULT_COLORS,
  shapes = DEFAULT_SHAPES,
  onComplete,
}: ConfettiProps) {
  const [showParticles, setShowParticles] = useState(false);

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 40 + Math.random() * 20, // Centered burst
      y: 0,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      xVelocity: (Math.random() - 0.5) * 2,
      yVelocity: Math.random(),
    }));
  }, [particleCount, colors, shapes]);

  useEffect(() => {
    if (isActive) {
      setShowParticles(true);
      const timer = setTimeout(() => {
        setShowParticles(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);

  return (
    <AnimatePresence>
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <ConfettiParticle key={particle.id} particle={particle} />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FIREWORKS VARIANT
// ═══════════════════════════════════════════════════════════════════════════════

interface FireworksProps {
  isActive: boolean;
  burstCount?: number;
  onComplete?: () => void;
}

export function Fireworks({
  isActive,
  burstCount = 3,
  onComplete,
}: FireworksProps) {
  const [activeBursts, setActiveBursts] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      // Stagger multiple bursts
      const bursts: number[] = [];
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          bursts.push(i);
          setActiveBursts([...bursts]);
        }, i * 400);
      }

      // Clean up
      const cleanup = setTimeout(() => {
        setActiveBursts([]);
        onComplete?.();
      }, burstCount * 400 + 3000);

      return () => clearTimeout(cleanup);
    }
  }, [isActive, burstCount, onComplete]);

  return (
    <>
      {activeBursts.map((burstId) => (
        <div
          key={burstId}
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            left: `${20 + burstId * 30}%`,
          }}
        >
          <Confetti
            isActive={true}
            particleCount={30}
            duration={2500}
          />
        </div>
      ))}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPARKLE EFFECT (for inline celebrations)
// ═══════════════════════════════════════════════════════════════════════════════

interface SparkleProps {
  children: React.ReactNode;
  isActive?: boolean;
  color?: string;
  className?: string;
}

export function Sparkle({
  children,
  isActive = true,
  color = "#fcd34d",
  className = "",
}: SparkleProps) {
  const sparkles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1 + Math.random(),
    }));
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      
      <AnimatePresence>
        {isActive && (
          <>
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: sparkle.duration,
                  delay: sparkle.delay,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <StarShape color={color} size={8} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Confetti;
