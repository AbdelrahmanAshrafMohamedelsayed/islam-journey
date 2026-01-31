// Celebration Components - Lazy loaded for better performance
import dynamic from "next/dynamic";

// Heavy animation components - lazy loaded
export const Confetti = dynamic(
  () => import("./Confetti").then((mod) => mod.Confetti),
  { ssr: false },
);

export const Fireworks = dynamic(
  () => import("./Confetti").then((mod) => mod.Fireworks),
  { ssr: false },
);

export const Sparkle = dynamic(
  () => import("./Confetti").then((mod) => mod.Sparkle),
  { ssr: false },
);

export const LevelUpCelebration = dynamic(
  () => import("./LevelUpCelebration").then((mod) => mod.LevelUpCelebration),
  { ssr: false },
);

// Lightweight component - keep as regular export
export { AchievementUnlock } from "./AchievementUnlock";
