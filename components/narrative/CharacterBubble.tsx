"use client";

/**
 * CharacterBubble Component
 *
 * Displays a character with a speech bubble for dialogue in lessons.
 * Used to make learning more engaging and narrative-driven.
 */

import { motion } from "framer-motion";
import { CharacterAvatar } from "./CharacterAvatar";
import {
  CHARACTERS,
  type Character,
  type CharacterEmotion,
} from "@/lib/content/characters";

interface CharacterBubbleProps {
  characterId: string;
  message: string;
  emotion?: CharacterEmotion;
  position?: "left" | "right";
  lang?: "en" | "ar";
  className?: string;
}

export function CharacterBubble({
  characterId,
  message,
  emotion = "welcoming",
  position = "left",
  lang = "en",
  className = "",
  priority = false, // Add priority prop
}: CharacterBubbleProps & { priority?: boolean }) {
  const character = CHARACTERS[characterId];

  if (!character) return null;

  const isRight = position === "right";
  const isArabic = lang === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 mb-6 ${isRight ? "flex-row-reverse" : ""} ${className}`}
    >
      {/* Character Avatar */}
      <div className="shrink-0">
        <CharacterAvatar
          character={character}
          emotion={emotion}
          size="md"
          showGlow
          animate
          priority={priority}
        />
      </div>

      {/* Speech Bubble */}
      <div
        className={`flex-1 max-w-md ${isRight ? "text-right" : "text-left"}`}
      >
        {/* Character Name */}
        <p
          className={`text-xs font-medium mb-1 ${
            characterId === "khabib"
              ? "text-amber-600 dark:text-amber-400"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {character.name[lang as keyof typeof character.name]}
        </p>

        {/* Message Bubble */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`
            relative inline-block px-4 py-3 rounded-2xl
            ${
              characterId === "khabib"
                ? "bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"
                : "bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
            }
            ${isRight ? "rounded-br-none" : "rounded-bl-none"}
          `}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p
            className={`text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${isArabic ? "font-arabic" : ""}`}
          >
            {message}
          </p>

          {/* Bubble Tail */}
          <div
            className={`
              absolute bottom-0 w-3 h-3
              ${
                characterId === "khabib"
                  ? "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800"
                  : "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
              }
              ${
                isRight
                  ? "right-0 translate-x-1/2 border-r border-b rounded-br-lg -rotate-45"
                  : "left-0 -translate-x-1/2 border-l border-b rounded-bl-lg rotate-45"
              }
            `}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Get a random greeting from a character
 */
export function getCharacterGreeting(
  characterId: string,
  lang: "en" | "ar",
): string {
  const character = CHARACTERS[characterId];
  if (!character) return "";

  const greetings = character.greetings[lang];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

/**
 * Get a random encouragement from a character
 */
export function getCharacterEncouragement(
  characterId: string,
  lang: "en" | "ar",
): string {
  const character = CHARACTERS[characterId];
  if (!character) return "";

  const encouragements = character.encouragements[lang];
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}

/**
 * Get a random farewell from a character
 */
export function getCharacterFarewell(
  characterId: string,
  lang: "en" | "ar",
): string {
  const character = CHARACTERS[characterId];
  if (!character) return "";

  const farewells = character.farewells[lang];
  return farewells[Math.floor(Math.random() * farewells.length)];
}

export default CharacterBubble;
