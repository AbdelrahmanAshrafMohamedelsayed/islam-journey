"use client";

import { useRef, useCallback, useEffect, useState } from "react";

// Audio URLs from Islamic audio APIs
const AUDIO_URLS = {
  // Adhan
  adhan: "https://cdn.islamic.network/adhans/128/1.mp3",

  // Quran recitations (Al-Afasy)
  fatiha: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
  ikhlas: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/112.mp3",
  falaq: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/113.mp3",
  nas: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/114.mp3",

  // Takbir and common phrases (will use Web Speech API as fallback)
  takbir: null, // "Allahu Akbar"
  tasmee: null, // "Sami Allahu liman hamidah"
  tahmeed: null, // "Rabbana lakal hamd"
  tasbeeh_ruku: null, // "Subhana Rabbiyal Atheem"
  tasbeeh_sujud: null, // "Subhana Rabbiyal A'la"
  tasleem: null, // "Assalamu alaikum wa rahmatullah"
};

// Common Islamic phrases for Text-to-Speech
const PHRASES = {
  takbir: { arabic: "الله أكبر", transliteration: "Allahu Akbar" },
  tasmee: {
    arabic: "سمع الله لمن حمده",
    transliteration: "Sami'Allahu liman hamidah",
  },
  tahmeed: {
    arabic: "ربنا ولك الحمد",
    transliteration: "Rabbana wa lakal hamd",
  },
  tasbeeh_ruku: {
    arabic: "سبحان ربي العظيم",
    transliteration: "Subhana Rabbiyal 'Atheem",
  },
  tasbeeh_sujud: {
    arabic: "سبحان ربي الأعلى",
    transliteration: "Subhana Rabbiyal A'la",
  },
  tasleem: {
    arabic: "السلام عليكم ورحمة الله",
    transliteration: "Assalamu alaikum wa rahmatullah",
  },
  tashahud: {
    arabic:
      "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله وأشهد أن محمداً عبده ورسوله",
    transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat...",
  },
  basmala: {
    arabic: "بسم الله الرحمن الرحيم",
    transliteration: "Bismillahir Rahmanir Raheem",
  },
};

type AudioKey = keyof typeof AUDIO_URLS;
type PhraseKey = keyof typeof PHRASES;

interface UseAudioOptions {
  volume?: number;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useAudio(options: UseAudioOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { volume = 1, onEnd, onError } = options;

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      onEnd?.();
    };

    const handleError = (e: ErrorEvent) => {
      setIsPlaying(false);
      setIsLoading(false);
      onError?.(new Error("Audio playback failed"));
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError as EventListener);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError as EventListener);
      audio.pause();
    };
  }, [volume, onEnd, onError]);

  // Play audio from URL
  const playUrl = useCallback(
    async (url: string) => {
      if (!audioRef.current || isMuted) return;

      try {
        setIsLoading(true);
        audioRef.current.src = url;
        await audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play error:", error);
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [isMuted, onError],
  );

  // Play predefined audio
  const play = useCallback(
    async (key: AudioKey) => {
      const url = AUDIO_URLS[key];
      if (url) {
        await playUrl(url);
      }
    },
    [playUrl],
  );

  // Play Quran verse by verse number
  const playQuranVerse = useCallback(
    async (surah: number, verse: number, reciter: string = "ar.alafasy") => {
      const verseNumber = getAbsoluteVerseNumber(surah, verse);
      const url = `https://cdn.islamic.network/quran/audio/128/${reciter}/${verseNumber}.mp3`;
      await playUrl(url);
    },
    [playUrl],
  );

  // Use Web Speech API for phrases
  const speak = useCallback(
    (text: string, lang: "ar" | "en" = "ar") => {
      if (isMuted || !("speechSynthesis" in window)) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ar" ? "ar-SA" : "en-US";
      utterance.rate = 0.8;
      utterance.pitch = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isMuted, onEnd],
  );

  // Speak a predefined phrase
  const speakPhrase = useCallback(
    (key: PhraseKey) => {
      const phrase = PHRASES[key];
      if (phrase) {
        speak(phrase.arabic, "ar");
      }
    },
    [speak],
  );

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    window.speechSynthesis?.cancel();
  }, []);

  // Stop audio
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    window.speechSynthesis?.cancel();
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return {
    play,
    playUrl,
    playQuranVerse,
    speak,
    speakPhrase,
    pause,
    stop,
    toggleMute,
    setVolume,
    isPlaying,
    isLoading,
    isMuted,
  };
}

// Helper to get absolute verse number for audio API
function getAbsoluteVerseNumber(surah: number, verse: number): number {
  // This is a simplified version - in production you'd have a full mapping
  const surahStartVerses: Record<number, number> = {
    1: 1, // Al-Fatiha starts at verse 1
    2: 8, // Al-Baqarah starts at verse 8
    112: 6222, // Al-Ikhlas
    113: 6226, // Al-Falaq
    114: 6231, // An-Nas
  };

  return (surahStartVerses[surah] || 1) + verse - 1;
}

// Quran Player Store for persistent playback state
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuranPlayerState {
  currentSurah: number;
  currentVerse: number;
  isPlaying: boolean;
  repeatMode: "none" | "verse" | "surah";
  playbackSpeed: number;
  reciter: string;
  setCurrentPosition: (surah: number, verse: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setRepeatMode: (mode: "none" | "verse" | "surah") => void;
  setPlaybackSpeed: (speed: number) => void;
  setReciter: (reciter: string) => void;
}

export const useQuranPlayer = create<QuranPlayerState>()(
  persist(
    (set) => ({
      currentSurah: 1,
      currentVerse: 1,
      isPlaying: false,
      repeatMode: "none",
      playbackSpeed: 1,
      reciter: "ar.alafasy",
      setCurrentPosition: (surah, verse) =>
        set({ currentSurah: surah, currentVerse: verse }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setRepeatMode: (mode) => set({ repeatMode: mode }),
      setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
      setReciter: (reciter) => set({ reciter }),
    }),
    {
      name: "quran-player",
    },
  ),
);

// Available reciters
export const RECITERS = [
  {
    id: "ar.alafasy",
    name: "Mishary Rashid Alafasy",
    nameAr: "مشاري راشد العفاسي",
  },
  {
    id: "ar.abdulbasitmurattal",
    name: "Abdul Basit (Murattal)",
    nameAr: "عبد الباسط عبد الصمد",
  },
  {
    id: "ar.minshawi",
    name: "Mohamed Siddiq Al-Minshawi",
    nameAr: "محمد صديق المنشاوي",
  },
  {
    id: "ar.husary",
    name: "Mahmoud Khalil Al-Husary",
    nameAr: "محمود خليل الحصري",
  },
];
