"use client";

/**
 * Ambient Sound System
 *
 * Provides immersive mosque atmospheres:
 * - Makkah: Distant crowd murmur, Kabah ambiance
 * - Madinah: Peaceful garden, birds, fountain
 * - Local Mosque: Quiet contemplation, subtle echo
 *
 * Uses Web Audio API for smooth crossfades and volume control.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useNarrativeStore,
  type AtmosphereType,
} from "@/lib/stores/narrativeStore";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientSound {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  // Using royalty-free ambient sound URLs from freesound.org or similar
  // These are placeholder URLs - in production, use actual hosted files
  layers: {
    url: string;
    volume: number; // relative volume 0-1
    loop: boolean;
  }[];
}

interface UseAmbientSoundReturn {
  isPlaying: boolean;
  isLoading: boolean;
  currentAtmosphere: AtmosphereType;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  setAtmosphere: (atmosphere: AtmosphereType) => void;
  fadeOut: (duration?: number) => void;
  fadeIn: (duration?: number) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// AMBIENT SOUND CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const AMBIENT_SOUNDS: Record<AtmosphereType, AmbientSound> = {
  makkah: {
    id: "makkah",
    name: { en: "Makkah", ar: "مكة المكرمة" },
    description: {
      en: "The blessed atmosphere of Masjid al-Haram",
      ar: "أجواء المسجد الحرام المباركة",
    },
    layers: [
      {
        // Crowd murmur / tawaf sounds (placeholder - use actual hosted file)
        url: "/audio/ambient/makkah-crowd.mp3",
        volume: 0.3,
        loop: true,
      },
      {
        // Distant adhan echo
        url: "/audio/ambient/makkah-echo.mp3",
        volume: 0.15,
        loop: true,
      },
    ],
  },
  madinah: {
    id: "madinah",
    name: { en: "Madinah", ar: "المدينة المنورة" },
    description: {
      en: "The peaceful serenity of the Prophet's city",
      ar: "سكينة مدينة الرسول ﷺ",
    },
    layers: [
      {
        // Soft birds chirping
        url: "/audio/ambient/madinah-birds.mp3",
        volume: 0.25,
        loop: true,
      },
      {
        // Gentle fountain / water
        url: "/audio/ambient/madinah-fountain.mp3",
        volume: 0.2,
        loop: true,
      },
      {
        // Soft breeze
        url: "/audio/ambient/madinah-breeze.mp3",
        volume: 0.1,
        loop: true,
      },
    ],
  },
  local: {
    id: "local",
    name: { en: "Local Mosque", ar: "المسجد المحلي" },
    description: {
      en: "Quiet contemplation in your neighborhood mosque",
      ar: "تأمل هادئ في مسجد الحي",
    },
    layers: [
      {
        // Soft room tone / silence
        url: "/audio/ambient/mosque-quiet.mp3",
        volume: 0.15,
        loop: true,
      },
      {
        // Subtle clock ticking (optional)
        url: "/audio/ambient/mosque-ambience.mp3",
        volume: 0.1,
        loop: true,
      },
    ],
  },
  silent: {
    id: "silent",
    name: { en: "Silent", ar: "صامت" },
    description: {
      en: "No ambient sounds",
      ar: "بدون أصوات محيطة",
    },
    layers: [],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// GENERATED AMBIENT SOUNDS (fallback when files not available)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generates white/pink noise using Web Audio API
 * Used as fallback when audio files aren't available
 */
function createNoiseGenerator(
  audioContext: AudioContext,
  type: "white" | "pink" | "brown" = "pink",
): AudioBufferSourceNode {
  const bufferSize = audioContext.sampleRate * 2; // 2 seconds
  const buffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate,
  );
  const data = buffer.getChannelData(0);

  if (type === "white") {
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === "pink") {
    // Pink noise approximation
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    // Brown noise
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

/**
 * Creates a simple oscillator-based ambient tone
 */
function createAmbientTone(
  audioContext: AudioContext,
  frequency: number,
  type: OscillatorType = "sine",
): OscillatorNode {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  return oscillator;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HOOK
// ═══════════════════════════════════════════════════════════════════════════════

export function useAmbientSound(): UseAmbientSoundReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<(AudioBufferSourceNode | OscillatorNode)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    preferredAtmosphere,
    ambientSoundEnabled,
    ambientVolume,
    setPreferredAtmosphere,
    setAmbientSoundEnabled,
    setAmbientVolume,
  } = useNarrativeStore();

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = ambientVolume;
    }
    return audioContextRef.current;
  }, [ambientVolume]);

  // Clean up sources
  const cleanupSources = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // Source may already be stopped
      }
    });
    sourcesRef.current = [];
  }, []);

  // Create generated ambient sound (fallback)
  const createGeneratedAmbient = useCallback(
    (atmosphere: AtmosphereType) => {
      const audioContext = initAudioContext();
      if (!audioContext || !gainNodeRef.current) return;

      cleanupSources();

      // Create atmosphere-specific generated sounds
      switch (atmosphere) {
        case "makkah": {
          // Low rumble + pink noise for crowd
          const noise = createNoiseGenerator(audioContext, "pink");
          const noiseGain = audioContext.createGain();
          noiseGain.gain.value = 0.08;
          noise.connect(noiseGain);
          noiseGain.connect(gainNodeRef.current);

          // Low frequency hum
          const hum = createAmbientTone(audioContext, 60, "sine");
          const humGain = audioContext.createGain();
          humGain.gain.value = 0.05;
          hum.connect(humGain);
          humGain.connect(gainNodeRef.current);

          noise.start();
          hum.start();
          sourcesRef.current.push(noise, hum);
          break;
        }
        case "madinah": {
          // Soft pink noise for breeze
          const breeze = createNoiseGenerator(audioContext, "pink");
          const breezeGain = audioContext.createGain();
          breezeGain.gain.value = 0.04;
          // Low pass filter for softer sound
          const breezeFilter = audioContext.createBiquadFilter();
          breezeFilter.type = "lowpass";
          breezeFilter.frequency.value = 500;
          breeze.connect(breezeFilter);
          breezeFilter.connect(breezeGain);
          breezeGain.connect(gainNodeRef.current);

          // Gentle high tones (birds-like)
          const birds = createAmbientTone(audioContext, 2000, "sine");
          const birdsGain = audioContext.createGain();
          // Tremolo effect
          const lfo = audioContext.createOscillator();
          lfo.frequency.value = 0.5;
          const lfoGain = audioContext.createGain();
          lfoGain.gain.value = 0.02;
          lfo.connect(lfoGain);
          lfoGain.connect(birdsGain.gain);
          birdsGain.gain.value = 0.01;
          birds.connect(birdsGain);
          birdsGain.connect(gainNodeRef.current);

          breeze.start();
          birds.start();
          lfo.start();
          sourcesRef.current.push(breeze, birds);
          break;
        }
        case "local": {
          // Very soft brown noise
          const roomTone = createNoiseGenerator(audioContext, "brown");
          const roomGain = audioContext.createGain();
          roomGain.gain.value = 0.02;
          const roomFilter = audioContext.createBiquadFilter();
          roomFilter.type = "lowpass";
          roomFilter.frequency.value = 200;
          roomTone.connect(roomFilter);
          roomFilter.connect(roomGain);
          roomGain.connect(gainNodeRef.current);

          roomTone.start();
          sourcesRef.current.push(roomTone);
          break;
        }
        case "silent":
        default:
          // No sound
          break;
      }
    },
    [initAudioContext, cleanupSources],
  );

  // Play ambient sound
  const play = useCallback(async () => {
    if (preferredAtmosphere === "silent") {
      setIsPlaying(false);
      return;
    }

    const audioContext = initAudioContext();
    if (audioContext?.state === "suspended") {
      await audioContext.resume();
    }

    setIsLoading(true);

    // Try to load audio files, fallback to generated
    const ambientConfig = AMBIENT_SOUNDS[preferredAtmosphere];

    if (ambientConfig.layers.length === 0) {
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    // For now, use generated ambient sounds
    // In production, you would load actual audio files here
    createGeneratedAmbient(preferredAtmosphere);

    setIsPlaying(true);
    setIsLoading(false);
    setAmbientSoundEnabled(true);
  }, [
    preferredAtmosphere,
    initAudioContext,
    createGeneratedAmbient,
    setAmbientSoundEnabled,
  ]);

  // Pause ambient sound
  const pause = useCallback(() => {
    cleanupSources();
    setIsPlaying(false);
    setAmbientSoundEnabled(false);
  }, [cleanupSources, setAmbientSoundEnabled]);

  // Toggle playback
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Set volume with fade
  const setVolume = useCallback(
    (volume: number) => {
      setAmbientVolume(volume);
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          volume,
          audioContextRef.current.currentTime + 0.1,
        );
      }
    },
    [setAmbientVolume],
  );

  // Fade out
  const fadeOut = useCallback(
    (duration: number = 1000) => {
      if (gainNodeRef.current && audioContextRef.current) {
        const currentTime = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          currentTime + duration / 1000,
        );
        setTimeout(() => {
          cleanupSources();
          setIsPlaying(false);
        }, duration);
      }
    },
    [cleanupSources],
  );

  // Fade in
  const fadeIn = useCallback(
    (duration: number = 1000) => {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.value = 0;
        const currentTime = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(
          ambientVolume,
          currentTime + duration / 1000,
        );
      }
      play();
    },
    [ambientVolume, play],
  );

  // Change atmosphere
  const setAtmosphere = useCallback(
    (atmosphere: AtmosphereType) => {
      setPreferredAtmosphere(atmosphere);
      if (isPlaying) {
        // Crossfade to new atmosphere
        fadeOut(500);
        setTimeout(() => {
          createGeneratedAmbient(atmosphere);
          fadeIn(500);
        }, 500);
      }
    },
    [
      setPreferredAtmosphere,
      isPlaying,
      fadeOut,
      createGeneratedAmbient,
      fadeIn,
    ],
  );

  // Update volume when store changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = ambientVolume;
    }
  }, [ambientVolume]);

  // Auto-play if enabled
  useEffect(() => {
    if (ambientSoundEnabled && !isPlaying && preferredAtmosphere !== "silent") {
      // Small delay to ensure user interaction has occurred
      const timer = setTimeout(() => {
        play();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [ambientSoundEnabled, isPlaying, preferredAtmosphere, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSources();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [cleanupSources]);

  return {
    isPlaying,
    isLoading,
    currentAtmosphere: preferredAtmosphere,
    volume: ambientVolume,
    play,
    pause,
    toggle,
    setVolume,
    setAtmosphere,
    fadeOut,
    fadeIn,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ATMOSPHERE INFO HELPER
// ═══════════════════════════════════════════════════════════════════════════════

export function getAtmosphereInfo(atmosphere: AtmosphereType) {
  return AMBIENT_SOUNDS[atmosphere];
}

export function getAllAtmospheres() {
  return Object.values(AMBIENT_SOUNDS);
}
