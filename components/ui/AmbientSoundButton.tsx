"use client";

/**
 * AmbientSoundButton Component
 * 
 * Floating button for controlling ambient mosque atmospheres.
 * Shows current atmosphere, volume control, and quick atmosphere switcher.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ChevronUp, Pause, Play } from "lucide-react";
import { useAmbientSound, getAtmosphereInfo, getAllAtmospheres } from "@/lib/hooks/useAmbientSound";
import type { AtmosphereType } from "@/lib/stores/narrativeStore";

// ═══════════════════════════════════════════════════════════════════════════════
// ATMOSPHERE ICONS
// ═══════════════════════════════════════════════════════════════════════════════

const ATMOSPHERE_ICONS: Record<AtmosphereType, string> = {
  makkah: "🕋",
  madinah: "🌴",
  local: "🕌",
  silent: "🔇",
};

const ATMOSPHERE_COLORS: Record<AtmosphereType, string> = {
  makkah: "#fcd34d", // Gold
  madinah: "#22c55e", // Green
  local: "#3b82f6", // Blue
  silent: "#6b7280", // Gray
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientSoundButtonProps {
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
}

export function AmbientSoundButton({
  position = "bottom-right",
  className = "",
}: AmbientSoundButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    isPlaying,
    isLoading,
    currentAtmosphere,
    volume,
    toggle,
    setVolume,
    setAtmosphere,
  } = useAmbientSound();

  const atmosphereInfo = getAtmosphereInfo(currentAtmosphere);
  const allAtmospheres = getAllAtmospheres().filter((a) => a.id !== "silent");

  // Position classes
  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAtmosphereSelect = (atmosphere: AtmosphereType) => {
    setAtmosphere(atmosphere);
    setIsExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed z-40 ${positionClasses[position]} ${className}`}
    >
      <AnimatePresence>
        {/* Expanded panel */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-64 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="font-semibold text-sm">Mosque Atmosphere</h3>
              <p className="text-xs text-muted-foreground">
                Choose your spiritual ambiance
              </p>
            </div>

            {/* Atmosphere options */}
            <div className="p-2">
              {allAtmospheres.map((atmosphere) => {
                const isSelected = currentAtmosphere === atmosphere.id;
                const color = ATMOSPHERE_COLORS[atmosphere.id as AtmosphereType];

                return (
                  <motion.button
                    key={atmosphere.id}
                    onClick={() => handleAtmosphereSelect(atmosphere.id as AtmosphereType)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-xl
                      transition-colors duration-200
                      ${isSelected ? "bg-primary/10" : "hover:bg-muted/50"}
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <span className="text-2xl">
                      {ATMOSPHERE_ICONS[atmosphere.id as AtmosphereType]}
                    </span>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{atmosphere.name.en}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {atmosphere.description.en}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="atmosphere-selection"
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Silent option */}
              <motion.button
                onClick={() => handleAtmosphereSelect("silent")}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-xl
                  transition-colors duration-200
                  ${currentAtmosphere === "silent" ? "bg-primary/10" : "hover:bg-muted/50"}
                `}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">🔇</span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">Silent</p>
                  <p className="text-xs text-muted-foreground">No ambient sounds</p>
                </div>
                {currentAtmosphere === "silent" && (
                  <motion.div
                    layoutId="atmosphere-selection"
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                )}
              </motion.button>
            </div>

            {/* Volume control */}
            <div className="px-4 py-3 border-t border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setVolume(volume === 0 ? 0.3 : 0)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-md"
                  style={{
                    background: `linear-gradient(to right, ${ATMOSPHERE_COLORS[currentAtmosphere]} ${volume * 100}%, var(--muted) ${volume * 100}%)`,
                  }}
                />
                <span className="text-xs text-muted-foreground w-8">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative flex items-center gap-2 px-4 py-3 rounded-full
          bg-card border border-border shadow-lg
          transition-all duration-300
          hover:shadow-xl hover:scale-105
          active:scale-95
        `}
        style={{
          borderColor: isPlaying ? `${ATMOSPHERE_COLORS[currentAtmosphere]}40` : undefined,
          boxShadow: isPlaying
            ? `0 4px 20px ${ATMOSPHERE_COLORS[currentAtmosphere]}20`
            : undefined,
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Loading spinner */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Atmosphere icon */}
        <span className="text-xl">
          {ATMOSPHERE_ICONS[currentAtmosphere]}
        </span>

        {/* Status text */}
        <span className="text-sm font-medium hidden sm:inline">
          {atmosphereInfo.name.en}
        </span>

        {/* Play/Pause indicator */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="p-1 hover:bg-muted rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Playing pulse animation */}
        {isPlaying && currentAtmosphere !== "silent" && (
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{
              border: `2px solid ${ATMOSPHERE_COLORS[currentAtmosphere]}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPACT VERSION (for settings page)
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientSoundSelectorProps {
  className?: string;
}

export function AmbientSoundSelector({ className = "" }: AmbientSoundSelectorProps) {
  const {
    isPlaying,
    currentAtmosphere,
    volume,
    toggle,
    setVolume,
    setAtmosphere,
  } = useAmbientSound();

  const allAtmospheres = getAllAtmospheres();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Atmosphere grid */}
      <div className="grid grid-cols-2 gap-2">
        {allAtmospheres.map((atmosphere) => {
          const isSelected = currentAtmosphere === atmosphere.id;
          const color = ATMOSPHERE_COLORS[atmosphere.id as AtmosphereType];

          return (
            <motion.button
              key={atmosphere.id}
              onClick={() => setAtmosphere(atmosphere.id as AtmosphereType)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl
                border transition-all duration-200
                ${isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-3xl">
                {ATMOSPHERE_ICONS[atmosphere.id as AtmosphereType]}
              </span>
              <span className="text-sm font-medium">{atmosphere.name.en}</span>
              <span className="text-xs text-muted-foreground text-center">
                {atmosphere.name.ar}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="atmosphere-indicator"
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Volume and play controls */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
        <button
          onClick={toggle}
          className={`
            p-3 rounded-full transition-colors
            ${isPlaying ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}
          `}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:bg-primary
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-sm text-muted-foreground w-10">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default AmbientSoundButton;
