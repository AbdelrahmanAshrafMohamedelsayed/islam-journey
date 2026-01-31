"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  label?: string;
  accentColor?: "emerald" | "amber" | "blue";
}

export function AudioPlayer({
  src,
  label = "Listen to recitation",
  accentColor = "emerald",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const accentColors = {
    emerald: {
      bg: "bg-emerald-500",
      bgHover: "hover:bg-emerald-400",
      text: "text-emerald-400",
      progress: "bg-emerald-500",
      glow: "shadow-emerald-500/30",
    },
    amber: {
      bg: "bg-amber-500",
      bgHover: "hover:bg-amber-400",
      text: "text-amber-400",
      progress: "bg-amber-500",
      glow: "shadow-amber-500/30",
    },
    blue: {
      bg: "bg-blue-500",
      bgHover: "hover:bg-blue-400",
      text: "text-blue-400",
      progress: "bg-blue-500",
      glow: "shadow-blue-500/30",
    },
  };

  const colors = accentColors[accentColor];

  // Pre-defined waveform heights for animation (static to avoid impure function calls)
  const waveformHeights = [
    ["30%", "70%", "45%"],
    ["55%", "35%", "65%"],
    ["40%", "80%", "50%"],
    ["65%", "40%", "75%"],
    ["50%", "60%", "35%"],
    ["75%", "45%", "70%"],
    ["35%", "75%", "55%"],
    ["60%", "30%", "65%"],
    ["45%", "70%", "40%"],
    ["70%", "50%", "80%"],
    ["55%", "65%", "45%"],
    ["80%", "40%", "60%"],
    ["40%", "55%", "70%"],
    ["65%", "75%", "35%"],
    ["50%", "45%", "75%"],
    ["75%", "60%", "50%"],
    ["35%", "80%", "65%"],
    ["60%", "35%", "55%"],
    ["45%", "65%", "80%"],
    ["70%", "50%", "40%"],
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Error playing audio:", err);
        setHasError(true);
      }
      setIsLoading(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (hasError) {
    return (
      <div className="mt-4 pt-4 border-t border-slate-600">
        <div className="flex items-center gap-3 text-red-400 text-sm">
          <VolumeX className="w-4 h-4" />
          <span>Unable to load audio</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-600">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Label */}
      <div className={`flex items-center gap-2 ${colors.text} text-sm mb-3`}>
        <Volume2 className="w-4 h-4" />
        <span>{label}</span>
      </div>

      {/* Player Container */}
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/50">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={isLoading}
            className={`relative w-12 h-12 rounded-full ${colors.bg} ${colors.bgHover} 
              flex items-center justify-center shadow-lg ${colors.glow}
              transition-all duration-200 disabled:opacity-50`}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                />
              ) : isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Pause className="w-5 h-5 text-white" fill="white" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Progress Section */}
          <div className="flex-1 space-y-2">
            {/* Progress Bar */}
            <div
              className="h-2 bg-slate-600/50 rounded-full cursor-pointer overflow-hidden group"
              onClick={handleSeek}
            >
              <motion.div
                className={`h-full ${colors.progress} rounded-full relative`}
                style={{ width: `${progress}%` }}
                initial={false}
                transition={{ duration: 0.1 }}
              >
                {/* Glow effect on progress */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 
                  ${colors.bg} rounded-full opacity-0 group-hover:opacity-100 
                  shadow-lg ${colors.glow} transition-opacity`}
                />
              </motion.div>
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            {/* Restart Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={restart}
              className="w-8 h-8 rounded-full bg-slate-600/50 hover:bg-slate-600 
                flex items-center justify-center transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4 text-slate-300" />
            </motion.button>

            {/* Mute Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-slate-600/50 hover:bg-slate-600 
                flex items-center justify-center transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Waveform Visualization (decorative) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-end justify-center gap-1 h-8"
            >
              {waveformHeights.map((heights, i) => (
                <motion.div
                  key={i}
                  className={`w-1 ${colors.bg} rounded-full opacity-60`}
                  animate={{
                    height: heights,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AudioPlayer;
