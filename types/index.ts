// ==========================================
// NEW MUSLIM JOURNEY - TYPE DEFINITIONS
// ==========================================

// Bilingual text support
export interface BilingualText {
  en: string;
  ar: string;
}

// ==========================================
// USER & AUTH TYPES
// ==========================================
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: BilingualText;
  avatarUrl?: string;
  preferredLanguage: "en" | "ar";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  isPublic: boolean;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  dailyReminder: boolean;
  prayerTimes: boolean;
  achievements: boolean;
  streakReminder: boolean;
}

// ==========================================
// JOURNEY & PROGRESS TYPES
// ==========================================
export type ChapterId =
  | "shahada"
  | "wudu"
  | "salah"
  | "quran"
  | "sawm"
  | "zakat"
  | "hajj"
  | "new-muslims"
  | "akhlaq";

export interface Chapter {
  id: ChapterId;
  number: number;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  color: string;
  lessons: Lesson[];
  requiredXp: number;
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  chapterId: ChapterId;
  title: BilingualText;
  description: BilingualText;
  type: LessonType;
  content: LessonContent;
  xpReward: number;
  duration: number; // minutes
  order: number;
}

export type LessonType =
  | "reading"
  | "video"
  | "interactive"
  | "simulation"
  | "quiz"
  | "practice";

export interface LessonContent {
  sections: ContentSection[];
  media?: MediaItem[];
  quiz?: Quiz;
  simulation?: SimulationConfig;
}

export interface ContentSection {
  id: string;
  title?: BilingualText;
  content: BilingualText;
  type:
    | "text"
    | "heading"
    | "quote"
    | "ayah"
    | "hadith"
    | "tip"
    | "warning"
    | "story"
    | "narrative"
    | "media"
    | "quran"
    | "video"
    | "image"
    | "audio"
    | "animation"
    | "interactive";
  reference?: string;
  storyConfig?: {
    backgroundImage?: string;
    character?: string;
    mood?: string;
    animation?: string;
  };
  mediaUrl?: string;
  mediaCaption?: BilingualText;
}

export interface MediaItem {
  type: "image" | "video" | "audio" | "animation";
  url: string;
  caption?: BilingualText;
  duration?: number;
}

// ==========================================
// SIMULATION TYPES
// ==========================================
export interface SimulationConfig {
  type: "wudu" | "salah" | "hajj";
  steps: SimulationStep[];
  audioEnabled: boolean;
}

export interface SimulationStep {
  id: string;
  title: BilingualText;
  instruction: BilingualText;
  dua?: BilingualText;
  duaTransliteration?: string;
  animationKey: string;
  audioUrl?: string;
  duration: number;
  highlightAreas?: string[];
}

export interface WuduStep extends SimulationStep {
  bodyPart:
    | "hands"
    | "mouth"
    | "nose"
    | "face"
    | "arms"
    | "head"
    | "ears"
    | "feet";
  repetitions: number;
}

export interface SalahStep extends SimulationStep {
  position: "standing" | "bowing" | "prostrating" | "sitting" | "turning";
  recitation?: BilingualText;
  recitationTransliteration?: string;
}

// ==========================================
// QUIZ & GAMIFICATION TYPES
// ==========================================
export interface Quiz {
  id: string;
  title: BilingualText;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // seconds
}

export interface QuizQuestion {
  id: string;
  question: BilingualText;
  type: "multiple-choice" | "true-false" | "fill-blank" | "matching";
  options?: BilingualText[];
  correctAnswer: number | string | number[];
  explanation: BilingualText;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  maxScore: number;
  answers: Record<string, number | string>;
  completedAt: Date;
  timeTaken: number;
}

// ==========================================
// ACHIEVEMENT TYPES
// ==========================================
export type AchievementRarity = "common" | "rare" | "epic" | "legendary";
export type AchievementCategory =
  | "learning"
  | "streak"
  | "community"
  | "special"
  | "mastery";

export interface Achievement {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  xpReward: number;
  condition: AchievementCondition;
  unlockedAt?: Date;
}

export interface AchievementCondition {
  type:
    | "lesson_complete"
    | "chapter_complete"
    | "streak"
    | "xp_total"
    | "quiz_perfect"
    | "custom";
  target: string | number;
  current?: number;
}

// ==========================================
// LEVEL SYSTEM
// ==========================================
export interface Level {
  level: number;
  title: BilingualText;
  minXp: number;
  maxXp: number;
  icon: string;
  perks?: string[];
}

export const LEVELS: Level[] = [
  {
    level: 1,
    title: { en: "Seeker", ar: "الباحث" },
    minXp: 0,
    maxXp: 100,
    icon: "🌱",
  },
  {
    level: 2,
    title: { en: "Learner", ar: "المتعلم" },
    minXp: 100,
    maxXp: 300,
    icon: "📖",
  },
  {
    level: 3,
    title: { en: "Student", ar: "الطالب" },
    minXp: 300,
    maxXp: 600,
    icon: "✨",
  },
  {
    level: 4,
    title: { en: "Practitioner", ar: "الممارس" },
    minXp: 600,
    maxXp: 1000,
    icon: "🌟",
  },
  {
    level: 5,
    title: { en: "Devoted", ar: "المخلص" },
    minXp: 1000,
    maxXp: 1500,
    icon: "💫",
  },
  {
    level: 6,
    title: { en: "Scholar", ar: "العالم" },
    minXp: 1500,
    maxXp: 2200,
    icon: "📚",
  },
  {
    level: 7,
    title: { en: "Teacher", ar: "المعلم" },
    minXp: 2200,
    maxXp: 3000,
    icon: "🎓",
  },
  {
    level: 8,
    title: { en: "Guide", ar: "المرشد" },
    minXp: 3000,
    maxXp: 4000,
    icon: "🌙",
  },
  {
    level: 9,
    title: { en: "Master", ar: "الأستاذ" },
    minXp: 4000,
    maxXp: 5500,
    icon: "⭐",
  },
  {
    level: 10,
    title: { en: "Enlightened", ar: "المستنير" },
    minXp: 5500,
    maxXp: Infinity,
    icon: "🕌",
  },
];

// ==========================================
// MISCONCEPTIONS SECTION TYPES
// ==========================================
export type MisconceptionCategory =
  | "women"
  | "violence"
  | "quran"
  | "prophet"
  | "shariah"
  | "science"
  | "west"
  | "practices";

export interface Misconception {
  id: string;
  category: MisconceptionCategory;
  title: BilingualText;
  misconception: BilingualText;
  shortAnswer: BilingualText;
  detailedResponse: BilingualText;
  evidence: Evidence[];
  videos: VideoResource[];
  quotes: QuoteResource[];
  relatedTopics: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Evidence {
  type: "quran" | "hadith" | "scholarly" | "historical" | "scientific";
  reference: string;
  text: BilingualText;
  source: string;
  authenticity?: string;
}

export interface VideoResource {
  id: string;
  title: BilingualText;
  speaker: string;
  platform: "youtube" | "vimeo";
  videoId: string;
  duration: number;
  thumbnail: string;
  language: "en" | "ar" | "both";
}

export interface QuoteResource {
  id: string;
  text: BilingualText;
  author: string;
  authorCredentials: string;
  source: string;
  year?: number;
}

// ==========================================
// ISLAMIC HISTORY TYPES
// ==========================================
export type HistoryEra =
  | "pre-islamic"
  | "prophetic"
  | "rashidun"
  | "umayyad"
  | "abbasid"
  | "regional"
  | "ottoman"
  | "modern";

export interface HistoryEvent {
  id: string;
  era: HistoryEra;
  title: BilingualText;
  description: BilingualText;
  date: string;
  dateHijri?: string;
  location?: string;
  significance: BilingualText;
  relatedPeople: string[];
  media?: MediaItem[];
}

export interface ProphetStory {
  id: string;
  name: BilingualText;
  arabicName: string;
  alternativeName?: string;
  era: string;
  story: ContentSection[];
  lessons: BilingualText[];
  quranReferences: string[];
  order: number;
}

// ==========================================
// FASTING / RAMADAN TYPES
// ==========================================
export interface FastingDay {
  id: string;
  userId: string;
  date: Date;
  type: "ramadan" | "voluntary" | "makeup";
  suhoorTime?: Date;
  iftarTime?: Date;
  completed: boolean;
  notes?: string;
  moodRating?: 1 | 2 | 3 | 4 | 5;
  prayersCompleted: string[];
}

export interface PrayerTime {
  name: "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
  time: Date;
  displayName: BilingualText;
}

export interface RamadanProgress {
  year: number;
  daysCompleted: number;
  totalDays: number;
  currentStreak: number;
  quranPagesRead: number;
  taraweehPrayed: number;
  sadaqahGiven: number;
}

// ==========================================
// QURAN AUDIO TYPES
// ==========================================
export interface Reciter {
  id: string;
  name: BilingualText;
  style: string;
  imageUrl?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  text: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
  surahNumber: number;
  juzNumber: number;
}

// ==========================================
// APP STATE TYPES
// ==========================================
export interface AppSettings {
  language: "en" | "ar";
  theme: "light" | "dark" | "system" | "mosque";
  fontSize: "small" | "medium" | "large";
  audioEnabled: boolean;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface JourneyProgress {
  currentChapter: ChapterId;
  completedLessons: string[];
  completedChapters: ChapterId[];
  currentLesson?: string;
  totalXp: number;
  level: number;
  streakDays: number;
  lastActivityDate: Date;
}
