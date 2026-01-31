"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Info,
  Home,
  Play,
  Trophy,
  Droplets,
} from "lucide-react";

interface WuduStep {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  instruction: { en: string; ar: string };
  times: number;
  bodyPart: string;
  animation: string;
  tip?: { en: string; ar: string };
  sunnah?: boolean;
}

const wuduSteps: WuduStep[] = [
  {
    id: "intention",
    name: { en: "Intention (Niyyah)", ar: "النية" },
    description: {
      en: "Before starting wudu, make the intention in your heart that you are performing ablution to purify yourself for prayer.",
      ar: "قبل البدء بالوضوء، انوِ في قلبك أنك تتوضأ للتطهر للصلاة.",
    },
    instruction: {
      en: 'Say "Bismillah" (In the name of Allah) and intend to perform wudu.',
      ar: 'قل "بسم الله" وانوِ أداء الوضوء.',
    },
    times: 1,
    bodyPart: "heart",
    animation: "pulse",
    tip: {
      en: "The intention is in the heart, not spoken aloud. Simply think about purifying yourself for worship.",
      ar: "النية في القلب، لا تُنطق بصوت عالٍ. فكر ببساطة في تطهير نفسك للعبادة.",
    },
  },
  {
    id: "hands",
    name: { en: "Wash Hands", ar: "غسل اليدين" },
    description: {
      en: "Wash your hands up to the wrists thoroughly, making sure water reaches between the fingers.",
      ar: "اغسل يديك إلى الرسغين جيداً، مع التأكد من وصول الماء بين الأصابع.",
    },
    instruction: {
      en: "Wash your hands three times, rubbing between fingers.",
      ar: "اغسل يديك ثلاث مرات، مع فرك ما بين الأصابع.",
    },
    times: 3,
    bodyPart: "hands",
    animation: "wash-hands",
    tip: {
      en: "Start with the right hand, then the left. Interlace your fingers to ensure water reaches between them.",
      ar: "ابدأ باليد اليمنى، ثم اليسرى. شبّك أصابعك للتأكد من وصول الماء بينها.",
    },
  },
  {
    id: "mouth",
    name: { en: "Rinse Mouth", ar: "المضمضة" },
    description: {
      en: "Take water into your mouth with your right hand, swirl it around, and spit it out.",
      ar: "خذ الماء في فمك بيدك اليمنى، أدره حول فمك، ثم ابصقه.",
    },
    instruction: {
      en: "Rinse your mouth three times thoroughly.",
      ar: "تمضمض ثلاث مرات جيداً.",
    },
    times: 3,
    bodyPart: "mouth",
    animation: "rinse-mouth",
  },
  {
    id: "nose",
    name: { en: "Clean Nose", ar: "الاستنشاق" },
    description: {
      en: "Sniff water into your nostrils with your right hand, then blow it out with your left hand.",
      ar: "استنشق الماء في أنفك بيدك اليمنى، ثم انثره بيدك اليسرى.",
    },
    instruction: {
      en: "Inhale water into your nose three times and blow it out.",
      ar: "استنشق الماء في أنفك ثلاث مرات وانثره.",
    },
    times: 3,
    bodyPart: "nose",
    animation: "clean-nose",
    tip: {
      en: "Don't sniff water too deeply. Just enough to clean the inside of your nostrils.",
      ar: "لا تستنشق الماء بعمق كبير. فقط ما يكفي لتنظيف داخل أنفك.",
    },
  },
  {
    id: "face",
    name: { en: "Wash Face", ar: "غسل الوجه" },
    description: {
      en: "Wash your entire face from the hairline to the chin, and from ear to ear.",
      ar: "اغسل وجهك كاملاً من منبت الشعر إلى الذقن، ومن الأذن إلى الأذن.",
    },
    instruction: {
      en: "Wash your face three times, covering from hairline to chin.",
      ar: "اغسل وجهك ثلاث مرات، من منبت الشعر إلى الذقن.",
    },
    times: 3,
    bodyPart: "face",
    animation: "wash-face",
    tip: {
      en: "Make sure water reaches the beard (if you have one) and all parts of the face.",
      ar: "تأكد من وصول الماء إلى اللحية (إن وُجدت) وجميع أجزاء الوجه.",
    },
  },
  {
    id: "arms",
    name: { en: "Wash Arms", ar: "غسل الذراعين" },
    description: {
      en: "Wash your arms from fingertips to elbows, including the elbows. Start with the right arm.",
      ar: "اغسل ذراعيك من أطراف الأصابع إلى المرفقين، بما في ذلك المرفقين. ابدأ بالذراع اليمنى.",
    },
    instruction: {
      en: "Wash right arm three times, then left arm three times.",
      ar: "اغسل الذراع اليمنى ثلاث مرات، ثم اليسرى ثلاث مرات.",
    },
    times: 3,
    bodyPart: "arms",
    animation: "wash-arms",
    tip: {
      en: "Always start with the right side first in wudu. This is from the Sunnah.",
      ar: "ابدأ دائماً بالجانب الأيمن أولاً في الوضوء. هذا من السنة.",
    },
  },
  {
    id: "head",
    name: { en: "Wipe Head", ar: "مسح الرأس" },
    description: {
      en: "Wet your hands and wipe over your head from front to back, then back to front.",
      ar: "بلل يديك وامسح رأسك من الأمام إلى الخلف، ثم من الخلف إلى الأمام.",
    },
    instruction: {
      en: "Wipe your head once with wet hands.",
      ar: "امسح رأسك مرة واحدة بيدين مبللتين.",
    },
    times: 1,
    bodyPart: "head",
    animation: "wipe-head",
  },
  {
    id: "ears",
    name: { en: "Wipe Ears", ar: "مسح الأذنين" },
    description: {
      en: "Use your wet fingers to wipe the inside and outside of both ears.",
      ar: "استخدم أصابعك المبللة لمسح داخل وخارج كلتا الأذنين.",
    },
    instruction: {
      en: "Wipe inside with index fingers, outside with thumbs.",
      ar: "امسح الداخل بالسبابتين، والخارج بالإبهامين.",
    },
    times: 1,
    bodyPart: "ears",
    animation: "wipe-ears",
    sunnah: true,
    tip: {
      en: "Use the same water from wiping the head - no need for fresh water.",
      ar: "استخدم نفس الماء من مسح الرأس - لا حاجة لماء جديد.",
    },
  },
  {
    id: "feet",
    name: { en: "Wash Feet", ar: "غسل القدمين" },
    description: {
      en: "Wash your feet up to and including the ankles. Make sure water reaches between the toes.",
      ar: "اغسل قدميك إلى الكعبين وما فوقهما. تأكد من وصول الماء بين أصابع القدم.",
    },
    instruction: {
      en: "Wash right foot three times, then left foot three times.",
      ar: "اغسل القدم اليمنى ثلاث مرات، ثم اليسرى ثلاث مرات.",
    },
    times: 3,
    bodyPart: "feet",
    animation: "wash-feet",
    tip: {
      en: "Use your little finger to clean between the toes. Don't forget the heels and ankles!",
      ar: "استخدم إصبعك الصغير لتنظيف ما بين الأصابع. لا تنسَ الكعبين والكاحلين!",
    },
  },
];

const completionDua = {
  arabic:
    "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
  transliteration:
    "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan abduhu wa rasuluh",
  meaning: {
    en: "I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and messenger.",
    ar: "أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله.",
  },
};

interface WuduSimulationProps {
  chapterId: string;
}

export function WuduSimulation({ chapterId }: WuduSimulationProps) {
  const { language } = useSettingsStore();
  const { addXP } = useProgressStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);

  const lang = language as "en" | "ar";

  const step = wuduSteps[currentStep] || wuduSteps[0];
  const progress = ((currentStep + 1) / wuduSteps.length) * 100;

  const handleStart = useCallback(() => {
    setStarted(true);
    setCurrentStep(0);
    setCompleted(false);
    setAnimationCount(0);
  }, []);

  const handleComplete = useCallback(() => {
    if (!step) return;
    setAnimationCount((prev) => prev + 1);

    if (animationCount + 1 >= step.times) {
      // Move to next step
      if (currentStep < wuduSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setAnimationCount(0);
        setShowTip(false);
      } else {
        // Wudu complete!
        setCompleted(true);
        addXP(75);
      }
    }
  }, [animationCount, step?.times, currentStep, addXP]);

  const handleRestart = useCallback(() => {
    setStarted(false);
    setCompleted(false);
    setCurrentStep(0);
    setAnimationCount(0);
    setShowTip(false);
  }, []);

  // Render body part illustration
  const renderBodyPart = () => {
    const parts: Record<string, React.ReactNode> = {
      heart: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-8xl"
        >
          💚
        </motion.div>
      ),
      hands: (
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl"
        >
          🙌
        </motion.div>
      ),
      mouth: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-8xl"
        >
          👄
        </motion.div>
      ),
      nose: (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl"
        >
          👃
        </motion.div>
      ),
      face: (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-8xl"
        >
          😊
        </motion.div>
      ),
      arms: (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-8xl"
        >
          💪
        </motion.div>
      ),
      head: (
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl"
        >
          🧠
        </motion.div>
      ),
      ears: (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl"
        >
          👂
        </motion.div>
      ),
      feet: (
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl"
        >
          🦶
        </motion.div>
      ),
    };

    return parts[step.bodyPart] || <div className="text-8xl">💧</div>;
  };

  // Welcome screen
  if (!started) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card variant="elevated" padding="lg" className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              💧
            </motion.div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Learn Wudu" : "تعلم الوضوء"}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {lang === "en"
                ? "Wudu (ablution) is the Islamic procedure for cleansing the body before prayer. Follow along step by step!"
                : "الوضوء هو الإجراء الإسلامي لتطهير الجسم قبل الصلاة. تابع خطوة بخطوة!"}
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>{lang === "en" ? "Time:" : "الوقت:"}</strong> ~5{" "}
                {lang === "en" ? "minutes" : "دقائق"}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>{lang === "en" ? "Steps:" : "الخطوات:"}</strong>{" "}
                {wuduSteps.length}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              leftIcon={<Play className="w-5 h-5" />}
              fullWidth
            >
              {lang === "en" ? "Start Learning" : "ابدأ التعلم"}
            </Button>

            <Link href={`/journey/${chapterId}`} className="mt-4 inline-block">
              <Button
                variant="ghost"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back to Chapter" : "العودة للفصل"}
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Completion screen
  if (completed) {
    return (
      <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card variant="elevated" padding="lg" className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 rounded-full bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Wudu Complete!" : "اكتمل الوضوء!"}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {lang === "en"
                ? "Excellent! You've learned all the steps of wudu. Now say this dua:"
                : "ممتاز! لقد تعلمت جميع خطوات الوضوء. الآن قل هذا الدعاء:"}
            </p>

            {/* Completion Dua */}
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 mb-6 text-right">
              <p className="text-xl font-arabic text-emerald-800 dark:text-emerald-200 mb-2">
                {completionDua.arabic}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 italic text-left mb-2">
                {completionDua.transliteration}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 text-left">
                {completionDua.meaning[lang]}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-6">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">
                +75 XP {lang === "en" ? "earned!" : "مكتسبة!"}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRestart}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="flex-1"
              >
                {lang === "en" ? "Practice Again" : "تدرب مرة أخرى"}
              </Button>
              <Link href={`/journey/${chapterId}`} className="flex-1">
                <Button
                  variant="primary"
                  leftIcon={<Home className="w-4 h-4" />}
                  fullWidth
                >
                  {lang === "en" ? "Continue" : "متابعة"}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main simulation view
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {lang === "en" ? "Restart" : "إعادة"}
            </Button>
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Step" : "خطوة"} {currentStep + 1}/
                {wuduSteps.length}
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-blue-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step name */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {step.name[lang]}
              </h1>
              {step.sunnah && (
                <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm rounded-full">
                  {lang === "en" ? "Sunnah (Recommended)" : "سنة (مستحب)"}
                </span>
              )}
            </div>

            {/* Body part illustration */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center relative"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 20px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {renderBodyPart()}

                {/* Counter badge */}
                {step.times > 1 && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {animationCount}/{step.times}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Description */}
            <Card className="mb-6">
              <p className="text-slate-700 dark:text-slate-300 text-center">
                {step.description[lang]}
              </p>
            </Card>

            {/* Instruction */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200 font-medium text-center">
                {step.instruction[lang]}
              </p>
            </div>

            {/* Tip button */}
            {step.tip && (
              <div className="mb-6">
                <button
                  onClick={() => setShowTip(!showTip)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  <Info className="w-4 h-4" />
                  {lang === "en" ? "Show tip" : "أظهر نصيحة"}
                </button>

                <AnimatePresence>
                  {showTip && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          💡 {step.tip[lang]}
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleComplete}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="min-w-[200px]"
              >
                {animationCount < step.times - 1
                  ? lang === "en"
                    ? `Repeat (${animationCount + 1}/${step.times})`
                    : `كرر (${animationCount + 1}/${step.times})`
                  : currentStep < wuduSteps.length - 1
                    ? lang === "en"
                      ? "Next Step"
                      : "الخطوة التالية"
                    : lang === "en"
                      ? "Complete"
                      : "إنهاء"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
