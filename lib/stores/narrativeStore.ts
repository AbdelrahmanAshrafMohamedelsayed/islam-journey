/**
 * Narrative Store - Zustand store for tracking narrative progress
 *
 * Manages:
 * - Current guide character selection
 * - Unlocked characters
 * - Collected wisdom scrolls
 * - Story progress and milestones
 * - Scene/atmosphere preferences
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type AtmosphereType = "makkah" | "madinah" | "local" | "silent";
export type SceneType =
  | "mosque"
  | "desert"
  | "garden"
  | "night"
  | "dawn"
  | "neutral";

export interface WisdomScroll {
  id: string;
  lessonId: string;
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  type: "hadith" | "fact" | "wisdom" | "dua";
  collectedAt: string; // ISO date
}

export interface StoryMilestone {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  achievedAt: string; // ISO date
  celebrationShown: boolean;
}

export interface NarrativeState {
  // Character System
  activeCharacterId: string;
  unlockedCharacterIds: string[];
  characterDialogueHistory: Record<string, number>; // characterId -> times interacted

  // Wisdom Scroll Collection
  collectedScrolls: WisdomScroll[];
  totalScrollsAvailable: number;

  // Story Progress
  currentChapterNarrative: string | null;
  storyMilestones: StoryMilestone[];
  narrativeIntroCompleted: boolean;

  // Scene & Atmosphere
  preferredAtmosphere: AtmosphereType;
  currentScene: SceneType;
  ambientSoundEnabled: boolean;
  ambientVolume: number; // 0-1

  // Cinematic Features
  cinematicTransitionsEnabled: boolean;
  dialogueSpeedMultiplier: number; // 0.5 = slow, 1 = normal, 2 = fast
  autoAdvanceDialogue: boolean;

  // Session State
  lastNarrativeInteraction: string | null; // ISO date
  narrativeSessionCount: number;
}

export interface NarrativeActions {
  // Character Actions
  setActiveCharacter: (characterId: string) => void;
  unlockCharacter: (characterId: string) => void;
  incrementCharacterInteraction: (characterId: string) => void;

  // Wisdom Scroll Actions
  collectScroll: (scroll: Omit<WisdomScroll, "collectedAt">) => void;
  hasCollectedScroll: (scrollId: string) => boolean;

  // Story Progress Actions
  setCurrentChapterNarrative: (chapterId: string | null) => void;
  addStoryMilestone: (
    milestone: Omit<StoryMilestone, "achievedAt" | "celebrationShown">,
  ) => void;
  markMilestoneCelebrationShown: (milestoneId: string) => void;
  completeNarrativeIntro: () => void;

  // Scene & Atmosphere Actions
  setPreferredAtmosphere: (atmosphere: AtmosphereType) => void;
  setCurrentScene: (scene: SceneType) => void;
  setAmbientSoundEnabled: (enabled: boolean) => void;
  setAmbientVolume: (volume: number) => void;

  // Cinematic Feature Actions
  setCinematicTransitionsEnabled: (enabled: boolean) => void;
  setDialogueSpeedMultiplier: (multiplier: number) => void;
  setAutoAdvanceDialogue: (enabled: boolean) => void;

  // Session Actions
  recordNarrativeInteraction: () => void;

  // Reset
  resetNarrativeProgress: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════════════════════════

const initialState: NarrativeState = {
  // Character System - Yusuf is the default guide
  activeCharacterId: "yusuf",
  unlockedCharacterIds: ["yusuf"], // Yusuf is always unlocked
  characterDialogueHistory: {},

  // Wisdom Scroll Collection
  collectedScrolls: [],
  totalScrollsAvailable: 50, // Total scrolls in the app

  // Story Progress
  currentChapterNarrative: null,
  storyMilestones: [],
  narrativeIntroCompleted: false,

  // Scene & Atmosphere - Madinah is the default peaceful atmosphere
  preferredAtmosphere: "madinah",
  currentScene: "neutral",
  ambientSoundEnabled: true,
  ambientVolume: 0.3,

  // Cinematic Features
  cinematicTransitionsEnabled: true,
  dialogueSpeedMultiplier: 1,
  autoAdvanceDialogue: false,

  // Session State
  lastNarrativeInteraction: null,
  narrativeSessionCount: 0,
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORE
// ═══════════════════════════════════════════════════════════════════════════════

export const useNarrativeStore = create<NarrativeState & NarrativeActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ─────────────────────────────────────────────────────────────────────────
      // Character Actions
      // ─────────────────────────────────────────────────────────────────────────

      setActiveCharacter: (characterId) => {
        const { unlockedCharacterIds } = get();
        // Only allow switching to unlocked characters
        if (unlockedCharacterIds.includes(characterId)) {
          set({ activeCharacterId: characterId });
        }
      },

      unlockCharacter: (characterId) => {
        const { unlockedCharacterIds } = get();
        if (!unlockedCharacterIds.includes(characterId)) {
          set({
            unlockedCharacterIds: [...unlockedCharacterIds, characterId],
          });
        }
      },

      incrementCharacterInteraction: (characterId) => {
        const { characterDialogueHistory } = get();
        set({
          characterDialogueHistory: {
            ...characterDialogueHistory,
            [characterId]: (characterDialogueHistory[characterId] || 0) + 1,
          },
        });
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Wisdom Scroll Actions
      // ─────────────────────────────────────────────────────────────────────────

      collectScroll: (scroll) => {
        const { collectedScrolls } = get();
        // Don't add duplicates
        if (!collectedScrolls.some((s) => s.id === scroll.id)) {
          set({
            collectedScrolls: [
              ...collectedScrolls,
              { ...scroll, collectedAt: new Date().toISOString() },
            ],
          });
        }
      },

      hasCollectedScroll: (scrollId) => {
        const { collectedScrolls } = get();
        return collectedScrolls.some((s) => s.id === scrollId);
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Story Progress Actions
      // ─────────────────────────────────────────────────────────────────────────

      setCurrentChapterNarrative: (chapterId) => {
        set({ currentChapterNarrative: chapterId });
      },

      addStoryMilestone: (milestone) => {
        const { storyMilestones } = get();
        // Don't add duplicates
        if (!storyMilestones.some((m) => m.id === milestone.id)) {
          set({
            storyMilestones: [
              ...storyMilestones,
              {
                ...milestone,
                achievedAt: new Date().toISOString(),
                celebrationShown: false,
              },
            ],
          });
        }
      },

      markMilestoneCelebrationShown: (milestoneId) => {
        const { storyMilestones } = get();
        set({
          storyMilestones: storyMilestones.map((m) =>
            m.id === milestoneId ? { ...m, celebrationShown: true } : m,
          ),
        });
      },

      completeNarrativeIntro: () => {
        set({ narrativeIntroCompleted: true });
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Scene & Atmosphere Actions
      // ─────────────────────────────────────────────────────────────────────────

      setPreferredAtmosphere: (atmosphere) => {
        set({ preferredAtmosphere: atmosphere });
      },

      setCurrentScene: (scene) => {
        set({ currentScene: scene });
      },

      setAmbientSoundEnabled: (enabled) => {
        set({ ambientSoundEnabled: enabled });
      },

      setAmbientVolume: (volume) => {
        set({ ambientVolume: Math.max(0, Math.min(1, volume)) });
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Cinematic Feature Actions
      // ─────────────────────────────────────────────────────────────────────────

      setCinematicTransitionsEnabled: (enabled) => {
        set({ cinematicTransitionsEnabled: enabled });
      },

      setDialogueSpeedMultiplier: (multiplier) => {
        set({
          dialogueSpeedMultiplier: Math.max(0.5, Math.min(3, multiplier)),
        });
      },

      setAutoAdvanceDialogue: (enabled) => {
        set({ autoAdvanceDialogue: enabled });
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Session Actions
      // ─────────────────────────────────────────────────────────────────────────

      recordNarrativeInteraction: () => {
        const { narrativeSessionCount } = get();
        set({
          lastNarrativeInteraction: new Date().toISOString(),
          narrativeSessionCount: narrativeSessionCount + 1,
        });
      },

      // ─────────────────────────────────────────────────────────────────────────
      // Reset
      // ─────────────────────────────────────────────────────────────────────────

      resetNarrativeProgress: () => {
        set({
          ...initialState,
          // Keep preferences
          preferredAtmosphere: get().preferredAtmosphere,
          ambientSoundEnabled: get().ambientSoundEnabled,
          ambientVolume: get().ambientVolume,
          cinematicTransitionsEnabled: get().cinematicTransitionsEnabled,
          dialogueSpeedMultiplier: get().dialogueSpeedMultiplier,
          autoAdvanceDialogue: get().autoAdvanceDialogue,
        });
      },
    }),
    {
      name: "islam-journey-narrative",
      version: 1,
    },
  ),
);

// ═══════════════════════════════════════════════════════════════════════════════
// SELECTORS (for optimized re-renders)
// ═══════════════════════════════════════════════════════════════════════════════

export const selectActiveCharacterId = (state: NarrativeState) =>
  state.activeCharacterId;
export const selectUnlockedCharacters = (state: NarrativeState) =>
  state.unlockedCharacterIds;
export const selectCollectedScrolls = (state: NarrativeState) =>
  state.collectedScrolls;
export const selectScrollCount = (state: NarrativeState) =>
  state.collectedScrolls.length;
export const selectAtmosphere = (state: NarrativeState) =>
  state.preferredAtmosphere;
export const selectAmbientEnabled = (state: NarrativeState) =>
  state.ambientSoundEnabled;
export const selectCinematicEnabled = (state: NarrativeState) =>
  state.cinematicTransitionsEnabled;
export const selectPendingMilestones = (state: NarrativeState) =>
  state.storyMilestones.filter((m) => !m.celebrationShown);

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS (convenience hooks for common patterns)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get the current active character with full details
 */
export function useActiveCharacter() {
  const activeId = useNarrativeStore(selectActiveCharacterId);
  // Import character data dynamically to avoid circular deps
  // In components, use: const character = getCharacter(activeId)
  return activeId;
}

/**
 * Check if ambient sound should play
 */
export function useAmbientSoundSettings() {
  return useNarrativeStore((state) => ({
    enabled: state.ambientSoundEnabled,
    volume: state.ambientVolume,
    atmosphere: state.preferredAtmosphere,
  }));
}

/**
 * Get narrative preferences for cinematic features
 */
export function useNarrativePreferences() {
  return useNarrativeStore((state) => ({
    cinematicTransitions: state.cinematicTransitionsEnabled,
    dialogueSpeed: state.dialogueSpeedMultiplier,
    autoAdvance: state.autoAdvanceDialogue,
    currentScene: state.currentScene,
  }));
}
