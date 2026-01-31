"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth";
import {
  useSettingsStore,
  useProgressStore,
  useAchievementsStore,
  useGameStatsStore,
  useFastingStore,
} from "@/lib/stores";
import type { Database } from "@/lib/supabase/types";
import type { ChapterId } from "@/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
type UserAchievements =
  Database["public"]["Tables"]["user_achievements"]["Row"];
type GameStats = Database["public"]["Tables"]["game_stats"]["Row"];
type FastingLogs = Database["public"]["Tables"]["fasting_logs"]["Row"];

interface SyncState {
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  error: string | null;
}

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

// Get supabase client lazily
const getSupabase = async () => {
  if (!isSupabaseConfigured()) return null;
  const { createClient } = await import("@/lib/supabase/client");
  return createClient();
};

export function useSupabaseSync() {
  const { user, isConfigured } = useAuthStore();
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    lastSyncedAt: null,
    error: null,
  });

  // ==========================================
  // FETCH DATA FROM SUPABASE
  // ==========================================
  const fetchUserData = useCallback(async () => {
    if (!user) return null;

    const supabase = await getSupabase();
    if (!supabase) return null;

    const [profileRes, progressRes, achievementsRes, gameStatsRes, fastingRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("user_achievements")
          .select("*")
          .eq("user_id", user.id)
          .single(),
        supabase.from("game_stats").select("*").eq("user_id", user.id).single(),
        supabase
          .from("fasting_logs")
          .select("*")
          .eq("user_id", user.id)
          .single(),
      ]);

    return {
      profile: profileRes.data as Profile | null,
      progress: progressRes.data as UserProgress | null,
      achievements: achievementsRes.data as UserAchievements | null,
      gameStats: gameStatsRes.data as GameStats | null,
      fastingLogs: fastingRes.data as FastingLogs | null,
    };
  }, [user]);

  // ==========================================
  // SYNC LOCAL -> SUPABASE (Push)
  // ==========================================
  const pushToSupabase = useCallback(async () => {
    if (!user) return;

    const supabase = await getSupabase();
    if (!supabase) return;

    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      const settingsState = useSettingsStore.getState();
      const progressState = useProgressStore.getState();
      const achievementsState = useAchievementsStore.getState();
      const gameStatsState = useGameStatsStore.getState();
      const fastingState = useFastingStore.getState();

      // Update profile/settings
      await supabase
        .from("profiles")
        .update({
          language: settingsState.language,
          theme: settingsState.theme,
          font_size: settingsState.fontSize,
          audio_enabled: settingsState.audioEnabled,
          animations_enabled: settingsState.animationsEnabled,
          notifications_enabled: settingsState.notificationsEnabled,
          learning_mode: settingsState.learningMode,
          has_completed_onboarding: settingsState.hasCompletedOnboarding,
        })
        .eq("id", user.id);

      // Update progress
      await supabase
        .from("user_progress")
        .update({
          current_chapter: progressState.currentChapter,
          completed_lessons: progressState.completedLessons,
          completed_chapters: progressState.completedChapters,
          current_lesson: progressState.currentLesson || null,
          total_xp: progressState.totalXp,
          level: progressState.level,
          streak_days: progressState.streakDays,
          last_activity_date: new Date(
            progressState.lastActivityDate,
          ).toISOString(),
        })
        .eq("user_id", user.id);

      // Update achievements
      await supabase
        .from("user_achievements")
        .update({
          unlocked_achievements: achievementsState.unlockedAchievements,
        })
        .eq("user_id", user.id);

      // Update game stats
      await supabase
        .from("game_stats")
        .update({
          games_played: gameStatsState.gamesPlayed,
          high_score_trivia: gameStatsState.highScores.trivia,
          high_score_memory: gameStatsState.highScores.memory,
          high_score_word_scramble: gameStatsState.highScores.wordScramble,
          perfect_rounds: gameStatsState.perfectRounds,
          total_game_xp: gameStatsState.totalGameXp,
        })
        .eq("user_id", user.id);

      // Update fasting logs
      await supabase
        .from("fasting_logs")
        .update({
          is_tracking: fastingState.isTracking,
          current_fasting_day: fastingState.currentFastingDay,
          completed_days: fastingState.completedDays,
          suhoor_times: fastingState.suhoorTimes,
          iftar_times: fastingState.iftarTimes,
          mood_logs: fastingState.moodLogs,
        })
        .eq("user_id", user.id);

      setSyncState({
        isSyncing: false,
        lastSyncedAt: new Date(),
        error: null,
      });
    } catch (error) {
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Sync failed",
      }));
    }
  }, [user]);

  // ==========================================
  // SYNC SUPABASE -> LOCAL (Pull)
  // ==========================================
  const pullFromSupabase = useCallback(async () => {
    if (!user) return;

    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      const data = await fetchUserData();
      if (!data) return;

      const { profile, progress, achievements, gameStats, fastingLogs } = data;

      // Update settings store
      if (profile) {
        const settingsStore = useSettingsStore.getState();
        settingsStore.setLanguage(profile.language);
        settingsStore.setTheme(profile.theme);
        settingsStore.setFontSize(profile.font_size);
        if (profile.audio_enabled !== settingsStore.audioEnabled) {
          settingsStore.toggleAudio();
        }
        if (profile.animations_enabled !== settingsStore.animationsEnabled) {
          settingsStore.toggleAnimations();
        }
        if (
          profile.notifications_enabled !== settingsStore.notificationsEnabled
        ) {
          settingsStore.toggleNotifications();
        }
        settingsStore.setLearningMode(profile.learning_mode);
        if (profile.has_completed_onboarding) {
          settingsStore.completeOnboarding();
        }
      }

      // Update progress store
      if (progress) {
        useProgressStore.setState({
          currentChapter: progress.current_chapter as ChapterId,
          completedLessons: progress.completed_lessons,
          completedChapters: progress.completed_chapters as ChapterId[],
          currentLesson: progress.current_lesson || undefined,
          totalXp: progress.total_xp,
          level: progress.level,
          streakDays: progress.streak_days,
          lastActivityDate: new Date(progress.last_activity_date),
        });
      }

      // Update achievements store
      if (achievements) {
        useAchievementsStore.setState({
          unlockedAchievements: achievements.unlocked_achievements,
        });
      }

      // Update game stats store
      if (gameStats) {
        useGameStatsStore.setState({
          gamesPlayed: gameStats.games_played,
          highScores: {
            trivia: gameStats.high_score_trivia,
            memory: gameStats.high_score_memory,
            wordScramble: gameStats.high_score_word_scramble,
          },
          perfectRounds: gameStats.perfect_rounds,
          totalGameXp: gameStats.total_game_xp,
        });
      }

      // Update fasting store
      if (fastingLogs) {
        useFastingStore.setState({
          isTracking: fastingLogs.is_tracking,
          currentFastingDay: fastingLogs.current_fasting_day,
          completedDays: fastingLogs.completed_days,
          suhoorTimes:
            (fastingLogs.suhoor_times as Record<string, string>) || {},
          iftarTimes: (fastingLogs.iftar_times as Record<string, string>) || {},
          moodLogs: (fastingLogs.mood_logs as Record<string, number>) || {},
        });
      }

      setSyncState({
        isSyncing: false,
        lastSyncedAt: new Date(),
        error: null,
      });
    } catch (error) {
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Sync failed",
      }));
    }
  }, [user, fetchUserData]);

  // ==========================================
  // SMART MERGE (Prefer higher progress)
  // ==========================================
  const smartMerge = useCallback(async () => {
    if (!user) return;

    const supabase = await getSupabase();
    if (!supabase) return;

    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      const remoteData = await fetchUserData();
      if (!remoteData) {
        // No remote data, just push local
        await pushToSupabase();
        return;
      }

      const localProgress = useProgressStore.getState();
      const remoteProgress = remoteData.progress;

      // Compare XP to determine which is more progressed
      const localXp = localProgress.totalXp;
      const remoteXp = remoteProgress?.total_xp || 0;

      if (localXp >= remoteXp) {
        // Local has more progress, push to cloud
        await pushToSupabase();
      } else {
        // Remote has more progress, pull from cloud
        await pullFromSupabase();
      }

      // Merge achievements (union of both)
      const localAchievements =
        useAchievementsStore.getState().unlockedAchievements;
      const remoteAchievements =
        remoteData.achievements?.unlocked_achievements || [];
      const mergedAchievements = [
        ...new Set([...localAchievements, ...remoteAchievements]),
      ];

      useAchievementsStore.setState({
        unlockedAchievements: mergedAchievements,
      });

      // Update remote with merged achievements
      await supabase
        .from("user_achievements")
        .update({ unlocked_achievements: mergedAchievements })
        .eq("user_id", user.id);

      setSyncState({
        isSyncing: false,
        lastSyncedAt: new Date(),
        error: null,
      });
    } catch (error) {
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Sync failed",
      }));
    }
  }, [user, fetchUserData, pushToSupabase, pullFromSupabase]);

  // Auto-sync on login
  useEffect(() => {
    if (user && isConfigured) {
      smartMerge();
    }
  }, [user, isConfigured, smartMerge]);

  return {
    ...syncState,
    pushToSupabase,
    pullFromSupabase,
    smartMerge,
    isAuthenticated: !!user,
  };
}
