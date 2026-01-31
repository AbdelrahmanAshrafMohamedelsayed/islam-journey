"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import {
  useSettingsStore,
  useProgressStore,
  type LearningMode,
} from "@/lib/stores";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Moon,
  Sun,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  CheckCircle2,
  Trophy,
  Layers,
  Map,
  Unlock,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  type: "info" | "choice" | "mode";
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: { en: "Assalamu Alaikum! 👋", ar: "السلام عليكم! 👋" },
    description: {
      en: "Peace be upon you! Welcome to your Islamic learning journey. This app is designed to help you learn Islam step by step, at your own pace.",
      ar: "السلام عليكم! مرحباً بكم في رحلتكم لتعلم الإسلام. هذا التطبيق مصمم لمساعدتكم على تعلم الإسلام خطوة بخطوة، بسرعتكم الخاصة.",
    },
    image: "🌙",
    type: "info",
  },
  {
    id: "why",
    title: { en: "Why This App?", ar: "لماذا هذا التطبيق؟" },
    description: {
      en: "We understand that learning a new faith can feel overwhelming. That's why we've created a clear, friendly path that explains everything from scratch - no prior knowledge needed!",
      ar: "نحن نفهم أن تعلم دين جديد قد يبدو مربكاً. لذلك أنشأنا مساراً واضحاً وودوداً يشرح كل شيء من الصفر - لا حاجة لمعرفة سابقة!",
    },
    image: "💚",
    type: "info",
  },
  {
    id: "features",
    title: { en: "What You'll Learn", ar: "ما ستتعلمه" },
    description: {
      en: "• The Five Pillars of Islam\n• How to pray (Salah) with interactive guides\n• How to perform Wudu (ablution)\n• Understanding the Quran\n• Islamic history & values\n• And much more!",
      ar: "• أركان الإسلام الخمسة\n• كيفية الصلاة مع أدلة تفاعلية\n• كيفية الوضوء\n• فهم القرآن\n• التاريخ والقيم الإسلامية\n• والمزيد!",
    },
    image: "📚",
    type: "info",
  },
  {
    id: "mode",
    title: { en: "Choose Your Path", ar: "اختر طريقك" },
    description: {
      en: "How would you like to learn?",
      ar: "كيف تريد أن تتعلم؟",
    },
    image: "🎯",
    type: "mode",
  },
  {
    id: "language",
    title: { en: "Preferences", ar: "التفضيلات" },
    description: {
      en: "Choose your language and appearance. You can change these later in settings.",
      ar: "اختر لغتك ومظهرك. يمكنك تغيير هذا لاحقاً في الإعدادات.",
    },
    image: "🌍",
    type: "choice",
  },
  {
    id: "ready",
    title: { en: "You're All Set! 🎉", ar: "أنت جاهز! 🎉" },
    description: {
      en: "Your journey begins now. Remember: every scholar was once a beginner. Take your time, and may Allah guide your path.",
      ar: "رحلتك تبدأ الآن. تذكر: كل عالم كان مبتدئاً يوماً ما. خذ وقتك، وليهدك الله في طريقك.",
    },
    image: "✨",
    type: "info",
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    hasCompletedOnboarding,
    completeOnboarding,
    learningMode,
    setLearningMode,
  } = useSettingsStore();
  const { resetProgress } = useProgressStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedMode, setSelectedMode] = useState<LearningMode>(learningMode);

  // Sync selectedLanguage with store language when it changes (e.g., from hydration)
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const lang = selectedLanguage as "en" | "ar";
  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  // If already completed, redirect
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.push("/journey");
    }
  }, [hasCompletedOnboarding, router]);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      // Complete onboarding
      setLanguage(selectedLanguage);
      setLearningMode(selectedMode);
      completeOnboarding();
      resetProgress();
      router.push("/journey");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleLanguageSelect = (lang: "en" | "ar") => {
    setSelectedLanguage(lang);
  };

  const handleModeSelect = (mode: LearningMode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
        <div className="h-1 bg-slate-200 dark:bg-slate-800">
          <motion.div
            className="h-full bg-linear-to-r from-emerald-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full"
          >
            <Card variant="elevated" padding="lg" className="text-center">
              {/* Image/Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="text-7xl mb-6"
              >
                {step.image}
              </motion.div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {step.title[lang]}
              </h1>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line mb-8">
                {step.description[lang]}
              </p>

              {/* Mode selection */}
              {step.id === "mode" && (
                <div className="space-y-4 mb-8">
                  {/* Journey Mode */}
                  <button
                    onClick={() => handleModeSelect("journey")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedMode === "journey"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedMode === "journey"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <Map className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {lang === "en" ? "Journey Mode" : "وضع الرحلة"}
                          </h3>
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                            {lang === "en" ? "Recommended" : "موصى به"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {lang === "en"
                            ? "Gamified learning with levels, XP, achievements, and a guided path. Lessons unlock as you progress."
                            : "تعلم بالألعاب مع المستويات والخبرة والإنجازات ومسار موجه. الدروس تُفتح كلما تقدمت."}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> XP & Levels
                          </span>
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Achievements
                          </span>
                        </div>
                      </div>
                      {selectedMode === "journey" && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Modules Mode */}
                  <button
                    onClick={() => handleModeSelect("modules")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedMode === "modules"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedMode === "modules"
                            ? "bg-blue-500 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <Layers className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {lang === "en" ? "Free Modules" : "الوحدات الحرة"}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {lang === "en"
                            ? "Access all content freely without any locks. Jump to any topic you want to learn."
                            : "الوصول لكل المحتوى بحرية بدون قفل. انتقل إلى أي موضوع تريد تعلمه."}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Unlock className="w-3 h-3" /> All Unlocked
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Self-paced
                          </span>
                        </div>
                      </div>
                      {selectedMode === "modules" && (
                        <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                      )}
                    </div>
                  </button>
                </div>
              )}

              {/* Language selection for the language step */}
              {step.id === "language" && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedLanguage === "en"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    <Globe className="w-8 h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    <p className="font-semibold text-slate-900 dark:text-white">
                      English
                    </p>
                    {selectedLanguage === "en" && (
                      <CheckCircle2 className="w-5 h-5 mx-auto mt-2 text-emerald-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("ar")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedLanguage === "ar"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    <Globe className="w-8 h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                    <p className="font-semibold text-slate-900 dark:text-white font-arabic">
                      العربية
                    </p>
                    {selectedLanguage === "ar" && (
                      <CheckCircle2 className="w-5 h-5 mx-auto mt-2 text-emerald-500" />
                    )}
                  </button>
                </div>
              )}

              {/* Theme toggle */}
              {step.id === "language" && (
                <div className="mb-8">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {lang === "en" ? "Appearance" : "المظهر"}
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        theme === "light"
                          ? "border-amber-400 bg-amber-50"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <Sun className="w-6 h-6 text-amber-500" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        theme === "dark"
                          ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <Moon className="w-6 h-6 text-indigo-500" />
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        theme === "system"
                          ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <Sparkles className="w-6 h-6 text-emerald-500" />
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    {lang === "en" ? "Back" : "رجوع"}
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  fullWidth={currentStep === 0}
                  className="flex-1"
                >
                  {currentStep === onboardingSteps.length - 1
                    ? lang === "en"
                      ? "Start Journey"
                      : "ابدأ الرحلة"
                    : lang === "en"
                      ? "Continue"
                      : "متابعة"}
                </Button>
              </div>

              {/* Step indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {onboardingSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentStep
                        ? "bg-emerald-500 w-6"
                        : i < currentStep
                          ? "bg-emerald-300"
                          : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
