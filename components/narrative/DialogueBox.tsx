"use client";

/**
 * DialogueBox Component
 * 
 * Beautiful speech bubbles with typewriter effect for character dialogue.
 * Supports RTL for Arabic, character emotions, and smooth animations.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { MiniAvatar } from "./CharacterAvatar";
import { useNarrativeStore } from "@/lib/stores/narrativeStore";
import type { Character, CharacterEmotion } from "@/lib/content/characters";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface DialogueBoxProps {
  character: Character;
  text: string;
  emotion?: CharacterEmotion;
  isRTL?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  showContinue?: boolean;
  continueLabel?: string;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  className?: string;
}

interface DialogueSequenceProps {
  character: Character;
  dialogues: Array<{
    text: string;
    emotion?: CharacterEmotion;
    isRTL?: boolean;
  }>;
  onComplete?: () => void;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPEWRITER HOOK
// ═══════════════════════════════════════════════════════════════════════════════

function useTypewriter(
  text: string,
  speed: number = 30,
  onComplete?: () => void
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    if (!text) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  const skipToEnd = useCallback(() => {
    setDisplayedText(text);
    setIsComplete(true);
    onComplete?.();
  }, [text, onComplete]);

  return { displayedText, isComplete, skipToEnd };
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIALOGUE BOX COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function DialogueBox({
  character,
  text,
  emotion,
  isRTL = false,
  onComplete,
  onSkip,
  showContinue = true,
  continueLabel = "Continue",
  autoAdvance = false,
  autoAdvanceDelay = 2000,
  className = "",
}: DialogueBoxProps) {
  const { dialogueSpeedMultiplier } = useNarrativeStore();
  const baseSpeed = 30 / dialogueSpeedMultiplier;
  
  const { displayedText, isComplete, skipToEnd } = useTypewriter(
    text,
    baseSpeed,
    onComplete
  );

  // Auto-advance after completion
  useEffect(() => {
    if (isComplete && autoAdvance && onSkip) {
      const timer = setTimeout(onSkip, autoAdvanceDelay);
      return () => clearTimeout(timer);
    }
  }, [isComplete, autoAdvance, autoAdvanceDelay, onSkip]);

  const currentEmotion = emotion || character.defaultEmotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative ${className}`}
    >
      {/* Main dialogue container */}
      <div
        className={`
          relative flex items-start gap-3
          ${isRTL ? "flex-row-reverse" : "flex-row"}
        `}
      >
        {/* Character avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
        >
          <MiniAvatar
            character={character}
            emotion={currentEmotion}
            size={48}
          />
        </motion.div>

        {/* Speech bubble */}
        <div className="flex-1 relative">
          {/* Bubble pointer */}
          <div
            className={`
              absolute top-4 w-3 h-3 rotate-45
              bg-card border-l border-t border-border
              ${isRTL ? "-right-1.5" : "-left-1.5"}
            `}
            style={{
              borderColor: `${character.primaryColor}30`,
            }}
          />

          {/* Bubble content */}
          <motion.div
            className={`
              relative px-4 py-3 rounded-2xl
              bg-card border shadow-lg
              ${isRTL ? "text-right" : "text-left"}
            `}
            style={{
              borderColor: `${character.primaryColor}30`,
              boxShadow: `0 4px 20px ${character.primaryColor}10`,
            }}
            onClick={() => !isComplete && skipToEnd()}
          >
            {/* Character name */}
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: character.primaryColor }}
            >
              {isRTL ? character.name.ar : character.name.en}
            </p>

            {/* Dialogue text with typewriter */}
            <p
              className={`text-base leading-relaxed ${isRTL ? "font-arabic" : ""}`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {displayedText}
              {/* Blinking cursor */}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                  style={{ backgroundColor: character.primaryColor }}
                />
              )}
            </p>

            {/* Skip hint */}
            {!isComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="text-xs text-muted-foreground mt-2"
              >
                Tap to skip
              </motion.p>
            )}

            {/* Continue button */}
            <AnimatePresence>
              {isComplete && showContinue && onSkip && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSkip();
                  }}
                  className={`
                    mt-3 px-4 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                  `}
                  style={{
                    backgroundColor: `${character.primaryColor}20`,
                    color: character.primaryColor,
                    border: `1px solid ${character.primaryColor}40`,
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    {continueLabel}
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIALOGUE SEQUENCE (Multiple dialogues in sequence)
// ═══════════════════════════════════════════════════════════════════════════════

export function DialogueSequence({
  character,
  dialogues,
  onComplete,
  className = "",
}: DialogueSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    
    if (currentIndex < dialogues.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      onComplete?.();
    }
  }, [currentIndex, dialogues.length, isAnimating, onComplete]);

  const currentDialogue = dialogues[currentIndex];

  return (
    <div className={className}>
      {/* Progress dots */}
      {dialogues.length > 1 && (
        <div className="flex justify-center gap-1.5 mb-3">
          {dialogues.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor:
                  index <= currentIndex
                    ? character.primaryColor
                    : `${character.primaryColor}30`,
                scale: index === currentIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Current dialogue */}
      <AnimatePresence mode="wait">
        <DialogueBox
          key={currentIndex}
          character={character}
          text={currentDialogue.text}
          emotion={currentDialogue.emotion}
          isRTL={currentDialogue.isRTL}
          onSkip={handleNext}
          continueLabel={
            currentIndex < dialogues.length - 1 ? "Continue" : "Got it!"
          }
        />
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING DIALOGUE (for overlays)
// ═══════════════════════════════════════════════════════════════════════════════

interface FloatingDialogueProps {
  character: Character;
  text: string;
  emotion?: CharacterEmotion;
  isRTL?: boolean;
  position?: "bottom" | "center" | "top";
  onDismiss?: () => void;
  backdrop?: boolean;
  className?: string;
}

export function FloatingDialogue({
  character,
  text,
  emotion,
  isRTL = false,
  position = "bottom",
  onDismiss,
  backdrop = true,
  className = "",
}: FloatingDialogueProps) {
  const positionClasses = {
    top: "top-4",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-4",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-end justify-center p-4 ${className}`}
        onClick={onDismiss}
      >
        {/* Backdrop */}
        {backdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
        )}

        {/* Dialogue */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`relative w-full max-w-md ${positionClasses[position]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogueBox
            character={character}
            text={text}
            emotion={emotion}
            isRTL={isRTL}
            onSkip={onDismiss}
            continueLabel="Dismiss"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUICK TIP BUBBLE (small inline tips)
// ═══════════════════════════════════════════════════════════════════════════════

interface QuickTipProps {
  character: Character;
  text: string;
  className?: string;
}

export function QuickTip({ character, text, className = "" }: QuickTipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 p-2 rounded-lg ${className}`}
      style={{
        backgroundColor: `${character.primaryColor}10`,
        border: `1px solid ${character.primaryColor}20`,
      }}
    >
      <MiniAvatar character={character} size={24} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </motion.div>
  );
}

export default DialogueBox;
