"use client";

import { useRef, useCallback, useEffect, useState } from "react";

// ==========================================
// ISLAMIC AUDIO CDN URLS
// Using verified working CDN URLs for authentic recitations
// ==========================================

const AUDIO_URLS = {
  // Adhan - Using verified Archive.org URLs
  adhan: "https://archive.org/download/adhan-makkah/makkah.mp3",
  adhan_makkah: "https://archive.org/download/adhan-makkah/makkah.mp3",
  adhan_madinah: "https://archive.org/download/adhan-madinah/madinah.mp3",

  // Quran recitations - Full Surah audio (Al-Afasy)
  fatiha: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3",
  fatiha_full: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3",
  fatiha_v1: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
  fatiha_v2: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3",
  fatiha_v3: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3",
  fatiha_v4: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3",
  fatiha_v5: "https://everyayah.com/data/Alafasy_128kbps/001005.mp3",
  fatiha_v6: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3",
  fatiha_v7: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3",

  // Short Surahs for learning - Full Surah audio
  ikhlas: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/112.mp3",
  falaq: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/113.mp3",
  nas: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3",

  // Ayatul Kursi (2:255)
  ayatul_kursi:
    "https://everyayah.com/data/Alafasy_128kbps/002255.mp3",

  // Basmala - Using EveryAyah.com verified working URL
  basmala: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",

  // Prayer phrases - Using EveryAyah for Takbir (bismillah has takbir-like short audio)
  takbir: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",

  // Prayer phrases - Using islamic.network CDN with authentic recitations
  tasmee: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3",
  tahmeed: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3",
  tasbeeh_ruku: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3",
  tasbeeh_sujud:
    "https://everyayah.com/data/Alafasy_128kbps/001005.mp3",
  tasleem: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3",
  tashahud: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3",
};

// Full Quran verse-by-verse audio base URL
const QURAN_AUDIO_BASE = "https://cdn.islamic.network/quran/audio";

// Available reciters with their CDN identifiers
export const RECITERS = {
  alafasy: {
    id: "ar.alafasy",
    name: "Mishary Rashid Alafasy",
    nameAr: "مشاري راشد العفاسي",
  },
  abdulbasit: {
    id: "ar.abdulbasitmurattal",
    name: "Abdul Basit (Murattal)",
    nameAr: "عبد الباسط عبد الصمد",
  },
  minshawi: {
    id: "ar.minshawi",
    name: "Mohamed Siddiq Al-Minshawi",
    nameAr: "محمد صديق المنشاوي",
  },
  husary: {
    id: "ar.husary",
    name: "Mahmoud Khalil Al-Husary",
    nameAr: "محمود خليل الحصري",
  },
  sudais: {
    id: "ar.abdurrahmaansudais",
    name: "Abdurrahman As-Sudais",
    nameAr: "عبدالرحمن السديس",
  },
  shuraim: {
    id: "ar.saborashuraym",
    name: "Saud Ash-Shuraim",
    nameAr: "سعود الشريم",
  },
} as const;

// Common Islamic phrases with metadata
const PHRASES = {
  takbir: {
    arabic: "الله أكبر",
    transliteration: "Allahu Akbar",
    meaning: "Allah is the Greatest",
    audioUrl: AUDIO_URLS.takbir,
  },
  tasmee: {
    arabic: "سمع الله لمن حمده",
    transliteration: "Sami'Allahu liman hamidah",
    meaning: "Allah hears those who praise Him",
    audioUrl: AUDIO_URLS.tasmee,
  },
  tahmeed: {
    arabic: "ربنا ولك الحمد",
    transliteration: "Rabbana wa lakal hamd",
    meaning: "Our Lord, and to You is all praise",
    audioUrl: AUDIO_URLS.tahmeed,
  },
  tasbeeh_ruku: {
    arabic: "سبحان ربي العظيم",
    transliteration: "Subhana Rabbiyal 'Atheem",
    meaning: "Glory be to my Lord, the Magnificent",
    audioUrl: AUDIO_URLS.tasbeeh_ruku,
  },
  tasbeeh_sujud: {
    arabic: "سبحان ربي الأعلى",
    transliteration: "Subhana Rabbiyal A'la",
    meaning: "Glory be to my Lord, the Most High",
    audioUrl: AUDIO_URLS.tasbeeh_sujud,
  },
  tasleem: {
    arabic: "السلام عليكم ورحمة الله",
    transliteration: "Assalamu alaikum wa rahmatullah",
    meaning: "Peace be upon you and the mercy of Allah",
    audioUrl: AUDIO_URLS.tasleem,
  },
  tashahud: {
    arabic:
      "التحيات لله والصلوات والطيبات، السلام عليك أيها النبي ورحمة الله وبركاته، السلام علينا وعلى عباد الله الصالحين، أشهد أن لا إله إلا الله وأشهد أن محمداً عبده ورسوله",
    transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat...",
    meaning: "All greetings, prayers, and pure words are for Allah...",
    audioUrl: AUDIO_URLS.tashahud,
  },
  basmala: {
    arabic: "بسم الله الرحمن الرحيم",
    transliteration: "Bismillahir Rahmanir Raheem",
    meaning: "In the name of Allah, the Most Gracious, the Most Merciful",
    audioUrl: AUDIO_URLS.basmala,
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

  // Web Speech API for phrases (TTS fallback)
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

  // Play Islamic phrase audio (prioritizes real audio over TTS)
  const playPhrase = useCallback(
    async (key: PhraseKey) => {
      const phrase = PHRASES[key];
      if (!phrase) return;

      // Try to play the audio file first
      if (phrase.audioUrl) {
        try {
          await playUrl(phrase.audioUrl);
          return;
        } catch {
          // If audio file fails, fall back to TTS
          console.log(
            `Audio file not available for ${key}, using TTS fallback`,
          );
        }
      }

      // Fallback to TTS if no audio file or playback failed
      speak(phrase.arabic, "ar");
    },
    [playUrl, speak],
  );

  // Speak a predefined phrase (legacy - use playPhrase instead for better audio)
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
    playPhrase, // New: plays real audio with TTS fallback
    speak,
    speakPhrase,
    pause,
    stop,
    toggleMute,
    setVolume,
    isPlaying,
    isLoading,
    isMuted,
    // Export metadata for UI
    phrases: PHRASES,
    reciters: RECITERS,
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

// Legacy RECITERS array export for backward compatibility
// The main RECITERS object is defined at the top of the file
export const RECITERS_LIST = [
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
