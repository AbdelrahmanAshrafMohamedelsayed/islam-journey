import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppSettings,
  JourneyProgress,
  ChapterId,
  Achievement,
} from "@/types";
import { calculateLevel } from "@/lib/utils";

// ==========================================
// SETTINGS STORE
// ==========================================
interface SettingsState extends AppSettings {
  setLanguage: (lang: "en" | "ar") => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setFontSize: (size: "small" | "medium" | "large") => void;
  toggleAudio: () => void;
  toggleAnimations: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      theme: "system",
      fontSize: "medium",
      audioEnabled: true,
      animationsEnabled: true,
      notificationsEnabled: true,

      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleAudio: () =>
        set((state) => ({ audioEnabled: !state.audioEnabled })),
      toggleAnimations: () =>
        set((state) => ({ animationsEnabled: !state.animationsEnabled })),
      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
    }),
    {
      name: "islam-journey-settings",
    },
  ),
);

// ==========================================
// PROGRESS STORE
// ==========================================
interface ProgressState extends JourneyProgress {
  // Actions
  completeLesson: (lessonId: string, xpEarned: number) => void;
  completeChapter: (chapterId: ChapterId) => void;
  setCurrentLesson: (lessonId: string | undefined) => void;
  addXp: (amount: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const initialProgress: JourneyProgress = {
  currentChapter: "shahada",
  completedLessons: [],
  completedChapters: [],
  currentLesson: undefined,
  totalXp: 0,
  level: 1,
  streakDays: 0,
  lastActivityDate: new Date(),
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress,

      completeLesson: (lessonId, xpEarned) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const newXp = state.totalXp + xpEarned;
        const newLevel = calculateLevel(newXp);

        set({
          completedLessons: [...state.completedLessons, lessonId],
          totalXp: newXp,
          level: newLevel,
          lastActivityDate: new Date(),
        });
      },

      completeChapter: (chapterId) => {
        const state = get();
        if (state.completedChapters.includes(chapterId)) return;

        const chapters: ChapterId[] = [
          "shahada",
          "wudu",
          "salah",
          "quran",
          "sawm",
          "zakat",
          "hajj",
        ];
        const currentIndex = chapters.indexOf(chapterId);
        const nextChapter = chapters[currentIndex + 1] || "hajj";

        set({
          completedChapters: [...state.completedChapters, chapterId],
          currentChapter: nextChapter,
        });
      },

      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      addXp: (amount) => {
        const state = get();
        const newXp = state.totalXp + amount;
        const newLevel = calculateLevel(newXp);

        set({
          totalXp: newXp,
          level: newLevel,
          lastActivityDate: new Date(),
        });
      },

      updateStreak: () => {
        const state = get();
        const today = new Date();
        const lastActivity = new Date(state.lastActivityDate);

        // Check if last activity was yesterday
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Continue streak
          set({
            streakDays: state.streakDays + 1,
            lastActivityDate: today,
          });
        } else if (diffDays > 1) {
          // Streak broken
          set({
            streakDays: 1,
            lastActivityDate: today,
          });
        }
        // Same day - no change needed
      },

      resetProgress: () => set(initialProgress),
    }),
    {
      name: "islam-journey-progress",
    },
  ),
);

// ==========================================
// ACHIEVEMENTS STORE
// ==========================================
interface AchievementsState {
  unlockedAchievements: string[];
  recentAchievement: Achievement | null;

  unlockAchievement: (achievement: Achievement) => void;
  clearRecentAchievement: () => void;
  hasAchievement: (achievementId: string) => boolean;
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      recentAchievement: null,

      unlockAchievement: (achievement) => {
        const state = get();
        if (state.unlockedAchievements.includes(achievement.id)) return;

        set({
          unlockedAchievements: [...state.unlockedAchievements, achievement.id],
          recentAchievement: achievement,
        });
      },

      clearRecentAchievement: () => set({ recentAchievement: null }),

      hasAchievement: (achievementId) => {
        return get().unlockedAchievements.includes(achievementId);
      },
    }),
    {
      name: "islam-journey-achievements",
    },
  ),
);

// ==========================================
// UI STORE (Non-persisted)
// ==========================================
interface UIState {
  isSidebarOpen: boolean;
  isAudioPlaying: boolean;
  currentAudioUrl: string | null;
  showAchievementModal: boolean;
  isLoading: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setAudioPlaying: (playing: boolean, url?: string) => void;
  setShowAchievementModal: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isAudioPlaying: false,
  currentAudioUrl: null,
  showAchievementModal: false,
  isLoading: false,

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setAudioPlaying: (playing, url) =>
    set({
      isAudioPlaying: playing,
      currentAudioUrl: url || null,
    }),
  setShowAchievementModal: (show) => set({ showAchievementModal: show }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// ==========================================
// QURAN PLAYER STORE
// ==========================================
interface QuranPlayerState {
  currentSurah: number;
  currentAyah: number;
  reciterId: string;
  isPlaying: boolean;
  playbackSpeed: number;
  repeatMode: "none" | "ayah" | "surah";
  volume: number;

  setSurah: (surah: number) => void;
  setAyah: (ayah: number) => void;
  setReciter: (reciterId: string) => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setRepeatMode: (mode: "none" | "ayah" | "surah") => void;
  setVolume: (volume: number) => void;
  nextAyah: () => void;
  previousAyah: () => void;
}

export const useQuranPlayerStore = create<QuranPlayerState>()(
  persist(
    (set, get) => ({
      currentSurah: 1,
      currentAyah: 1,
      reciterId: "ar.alafasy",
      isPlaying: false,
      playbackSpeed: 1,
      repeatMode: "none",
      volume: 0.8,

      setSurah: (surah) => set({ currentSurah: surah, currentAyah: 1 }),
      setAyah: (ayah) => set({ currentAyah: ayah }),
      setReciter: (reciterId) => set({ reciterId }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
      setRepeatMode: (mode) => set({ repeatMode: mode }),
      setVolume: (volume) => set({ volume }),
      nextAyah: () => set((state) => ({ currentAyah: state.currentAyah + 1 })),
      previousAyah: () =>
        set((state) => ({
          currentAyah: Math.max(1, state.currentAyah - 1),
        })),
    }),
    {
      name: "islam-journey-quran-player",
    },
  ),
);

// ==========================================
// FASTING STORE
// ==========================================
interface FastingState {
  isTracking: boolean;
  currentFastingDay: string | null; // ISO date string
  completedDays: string[];
  suhoorTimes: Record<string, string>;
  iftarTimes: Record<string, string>;
  moodLogs: Record<string, number>;

  startTracking: (date: string) => void;
  stopTracking: () => void;
  completeFastingDay: (date: string) => void;
  setSuhoorTime: (date: string, time: string) => void;
  setIftarTime: (date: string, time: string) => void;
  setMoodLog: (date: string, mood: number) => void;
}

export const useFastingStore = create<FastingState>()(
  persist(
    (set, get) => ({
      isTracking: false,
      currentFastingDay: null,
      completedDays: [],
      suhoorTimes: {},
      iftarTimes: {},
      moodLogs: {},

      startTracking: (date) =>
        set({
          isTracking: true,
          currentFastingDay: date,
        }),

      stopTracking: () =>
        set({
          isTracking: false,
          currentFastingDay: null,
        }),

      completeFastingDay: (date) => {
        const state = get();
        if (state.completedDays.includes(date)) return;
        set({ completedDays: [...state.completedDays, date] });
      },

      setSuhoorTime: (date, time) =>
        set((state) => ({
          suhoorTimes: { ...state.suhoorTimes, [date]: time },
        })),

      setIftarTime: (date, time) =>
        set((state) => ({
          iftarTimes: { ...state.iftarTimes, [date]: time },
        })),

      setMoodLog: (date, mood) =>
        set((state) => ({
          moodLogs: { ...state.moodLogs, [date]: mood },
        })),
    }),
    {
      name: "islam-journey-fasting",
    },
  ),
);
