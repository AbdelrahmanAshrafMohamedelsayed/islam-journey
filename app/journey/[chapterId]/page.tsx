"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { ProgressBar } from "@/components/ui/Progress";
import {
  ArrowLeft,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";

// Chapter data
const chaptersData = {
  shahada: {
    title: { en: "Shahada", ar: "الشهادة" },
    subtitle: { en: "Declaration of Faith", ar: "شهادة الإيمان" },
    description: {
      en: "The Shahada is the Islamic declaration of faith and the first pillar of Islam. It declares that there is no god but Allah and Muhammad is His messenger.",
      ar: "الشهادة هي إعلان الإيمان الإسلامي والركن الأول من أركان الإسلام. تعلن أنه لا إله إلا الله وأن محمداً رسول الله.",
    },
    color: "from-emerald-500 to-green-600",
    icon: "☪️",
    lessons: [
      {
        id: "shahada-meaning",
        title: { en: "The Meaning of Shahada", ar: "معنى الشهادة" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "shahada-tawheed",
        title: { en: "Understanding Tawheed", ar: "فهم التوحيد" },
        duration: 15,
        type: "lesson",
      },
      {
        id: "shahada-conditions",
        title: { en: "Conditions of Shahada", ar: "شروط الشهادة" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "shahada-prophet",
        title: { en: "Prophet Muhammad ﷺ", ar: "النبي محمد ﷺ" },
        duration: 20,
        type: "lesson",
      },
      {
        id: "shahada-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  salah: {
    title: { en: "Salah", ar: "الصلاة" },
    subtitle: { en: "Five Daily Prayers", ar: "الصلوات الخمس" },
    description: {
      en: "Salah is the second pillar of Islam. It is the ritual prayer performed five times daily, connecting the believer directly with Allah.",
      ar: "الصلاة هي الركن الثاني من أركان الإسلام. وهي العبادة التي تُؤدى خمس مرات يومياً، وتربط المؤمن مباشرة بالله.",
    },
    color: "from-blue-500 to-indigo-600",
    icon: "🙏",
    lessons: [
      {
        id: "salah-importance",
        title: { en: "Importance of Salah", ar: "أهمية الصلاة" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "salah-wudu",
        title: { en: "Learn Wudu (Ablution)", ar: "تعلم الوضوء" },
        duration: 15,
        type: "simulation",
        simulationType: "wudu",
      },
      {
        id: "salah-times",
        title: { en: "Prayer Times", ar: "أوقات الصلاة" },
        duration: 8,
        type: "lesson",
      },
      {
        id: "salah-positions",
        title: { en: "Prayer Positions", ar: "حركات الصلاة" },
        duration: 20,
        type: "simulation",
        simulationType: "salah",
      },
      {
        id: "salah-recitations",
        title: { en: "Prayer Recitations", ar: "أذكار الصلاة" },
        duration: 25,
        type: "lesson",
      },
      {
        id: "salah-complete",
        title: { en: "Complete Prayer Practice", ar: "ممارسة الصلاة الكاملة" },
        duration: 30,
        type: "simulation",
        simulationType: "salah",
      },
      {
        id: "salah-mistakes",
        title: { en: "Common Mistakes", ar: "الأخطاء الشائعة" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "salah-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  zakat: {
    title: { en: "Zakat", ar: "الزكاة" },
    subtitle: { en: "Purification & Charity", ar: "التطهير والصدقة" },
    description: {
      en: "Zakat is the third pillar of Islam. It is obligatory charity that purifies wealth and helps those in need.",
      ar: "الزكاة هي الركن الثالث من أركان الإسلام. وهي صدقة واجبة تُطهّر المال وتساعد المحتاجين.",
    },
    color: "from-amber-500 to-orange-600",
    icon: "💝",
    lessons: [
      {
        id: "zakat-meaning",
        title: { en: "Understanding Zakat", ar: "فهم الزكاة" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "zakat-calculation",
        title: { en: "Calculating Zakat", ar: "حساب الزكاة" },
        duration: 15,
        type: "interactive",
      },
      {
        id: "zakat-recipients",
        title: { en: "Who Receives Zakat", ar: "مستحقو الزكاة" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "zakat-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  sawm: {
    title: { en: "Sawm", ar: "الصيام" },
    subtitle: { en: "Fasting in Ramadan", ar: "صيام رمضان" },
    description: {
      en: "Sawm is the fourth pillar of Islam. Fasting during Ramadan teaches self-discipline and brings closer to Allah.",
      ar: "الصيام هو الركن الرابع من أركان الإسلام. الصيام في رمضان يُعلّم ضبط النفس ويُقرّب إلى الله.",
    },
    color: "from-purple-500 to-violet-600",
    icon: "🌙",
    lessons: [
      {
        id: "sawm-meaning",
        title: { en: "The Purpose of Fasting", ar: "الحكمة من الصيام" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "sawm-rules",
        title: { en: "Rules of Fasting", ar: "أحكام الصيام" },
        duration: 15,
        type: "lesson",
      },
      {
        id: "sawm-ramadan",
        title: { en: "The Month of Ramadan", ar: "شهر رمضان" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "sawm-tracker",
        title: { en: "Fasting Tracker", ar: "متتبع الصيام" },
        duration: 5,
        type: "interactive",
      },
      {
        id: "sawm-exemptions",
        title: { en: "Exemptions from Fasting", ar: "الإعفاءات من الصيام" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "sawm-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  hajj: {
    title: { en: "Hajj", ar: "الحج" },
    subtitle: { en: "Pilgrimage to Makkah", ar: "الحج إلى مكة" },
    description: {
      en: "Hajj is the fifth pillar of Islam. It is the pilgrimage to Makkah that every able Muslim must perform once in their lifetime.",
      ar: "الحج هو الركن الخامس من أركان الإسلام. وهو الرحلة إلى مكة التي يجب على كل مسلم قادر أداؤها مرة في العمر.",
    },
    color: "from-teal-500 to-cyan-600",
    icon: "🕋",
    lessons: [
      {
        id: "hajj-meaning",
        title: { en: "Significance of Hajj", ar: "أهمية الحج" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "hajj-rituals",
        title: { en: "Rituals of Hajj", ar: "مناسك الحج" },
        duration: 20,
        type: "lesson",
      },
      {
        id: "hajj-virtual",
        title: { en: "Virtual Hajj Tour", ar: "جولة الحج الافتراضية" },
        duration: 15,
        type: "interactive",
      },
      {
        id: "hajj-umrah",
        title: { en: "Understanding Umrah", ar: "فهم العمرة" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "hajj-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  quran: {
    title: { en: "Quran", ar: "القرآن" },
    subtitle: { en: "Allah's Book", ar: "كتاب الله" },
    description: {
      en: "The Quran is the holy book of Islam, revealed to Prophet Muhammad ﷺ. Learning to read and understand it is essential for every Muslim.",
      ar: "القرآن هو الكتاب المقدس للإسلام، أُنزل على النبي محمد ﷺ. تعلم قراءته وفهمه أمر ضروري لكل مسلم.",
    },
    color: "from-rose-500 to-pink-600",
    icon: "📖",
    lessons: [
      {
        id: "quran-intro",
        title: { en: "Introduction to Quran", ar: "مقدمة في القرآن" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "quran-arabic",
        title: { en: "Arabic Alphabet", ar: "الحروف العربية" },
        duration: 20,
        type: "interactive",
      },
      {
        id: "quran-fatiha",
        title: { en: "Surah Al-Fatiha", ar: "سورة الفاتحة" },
        duration: 15,
        type: "audio",
      },
      {
        id: "quran-short-surahs",
        title: { en: "Short Surahs", ar: "قصار السور" },
        duration: 25,
        type: "audio",
      },
      {
        id: "quran-tajweed",
        title: { en: "Basics of Tajweed", ar: "أساسيات التجويد" },
        duration: 15,
        type: "lesson",
      },
      {
        id: "quran-player",
        title: { en: "Quran Audio Player", ar: "مشغل القرآن الصوتي" },
        duration: 0,
        type: "interactive",
      },
      {
        id: "quran-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
  akhlaq: {
    title: { en: "Akhlaq", ar: "الأخلاق" },
    subtitle: { en: "Islamic Character", ar: "الشخصية الإسلامية" },
    description: {
      en: "Akhlaq refers to Islamic ethics and morality. It encompasses the character traits and behavior that Islam encourages in a believer's daily life.",
      ar: "الأخلاق تشير إلى الآداب والأخلاق الإسلامية. وتشمل الصفات والسلوكيات التي يشجعها الإسلام في الحياة اليومية للمؤمن.",
    },
    color: "from-cyan-500 to-sky-600",
    icon: "✨",
    lessons: [
      {
        id: "akhlaq-intro",
        title: { en: "Islamic Character", ar: "الأخلاق الإسلامية" },
        duration: 10,
        type: "lesson",
      },
      {
        id: "akhlaq-honesty",
        title: { en: "Honesty & Truthfulness", ar: "الصدق والأمانة" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "akhlaq-kindness",
        title: { en: "Kindness & Compassion", ar: "اللطف والرحمة" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "akhlaq-patience",
        title: { en: "Patience & Gratitude", ar: "الصبر والشكر" },
        duration: 12,
        type: "lesson",
      },
      {
        id: "akhlaq-family",
        title: { en: "Family Relations", ar: "العلاقات الأسرية" },
        duration: 15,
        type: "lesson",
      },
      {
        id: "akhlaq-quiz",
        title: { en: "Chapter Quiz", ar: "اختبار الفصل" },
        duration: 5,
        type: "quiz",
      },
    ],
  },
};

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.chapterId as string;
  const { language } = useSettingsStore();
  const { completedLessons, completeLesson, addXp } = useProgressStore();
  const isArabic = language === "ar";

  const chapter = chaptersData[chapterId as keyof typeof chaptersData];

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {isArabic ? "الفصل غير موجود" : "Chapter Not Found"}
          </h1>
          <Link href="/journey">
            <Button variant="primary">
              {isArabic ? "العودة للرحلة" : "Back to Journey"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = chapter.lessons.filter((l) =>
    completedLessons.includes(l.id),
  ).length;
  const progress = (completedCount / chapter.lessons.length) * 100;

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "simulation":
        return "🎮";
      case "quiz":
        return "📝";
      case "interactive":
        return "✨";
      case "audio":
        return "🎧";
      default:
        return "📖";
    }
  };

  const getLessonHref = (lesson: (typeof chapter.lessons)[0]) => {
    if (
      lesson.type === "simulation" &&
      "simulationType" in lesson &&
      lesson.simulationType
    ) {
      return `/simulations/${lesson.simulationType}`;
    }
    return `/journey/${chapterId}/${lesson.id}`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/journey">
            <Button
              variant="ghost"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {isArabic ? "العودة للرحلة" : "Back to Journey"}
            </Button>
          </Link>
        </motion.div>

        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${chapter.color} rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden`}
        >
          <div className="absolute inset-0 pattern-arabesque opacity-20" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">{chapter.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isArabic ? chapter.title.ar : chapter.title.en}
            </h1>
            <p className="text-xl text-white/80 mb-4">
              {isArabic ? chapter.subtitle.ar : chapter.subtitle.en}
            </p>
            <p className="text-white/70 max-w-2xl">
              {isArabic ? chapter.description.ar : chapter.description.en}
            </p>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-600 dark:text-slate-400">
              {isArabic ? "تقدم الفصل" : "Chapter Progress"}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {completedCount}/{chapter.lessons.length}{" "}
              {isArabic ? "مكتمل" : "completed"}
            </span>
          </div>
          <ProgressBar value={progress} variant="default" showLabel />
        </motion.div>

        {/* Lessons List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {isArabic ? "الدروس" : "Lessons"}
          </h2>

          <div className="space-y-4">
            {chapter.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const previousCompleted =
                index === 0 ||
                completedLessons.includes(chapter.lessons[index - 1].id);
              const isLocked = !previousCompleted;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    href={isLocked ? "#" : getLessonHref(lesson)}
                    className={`block ${isLocked ? "cursor-not-allowed" : ""}`}
                  >
                    <div
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                        isLocked
                          ? "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60"
                          : isCompleted
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md"
                      }`}
                    >
                      {/* Lesson Number / Status */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                          isLocked
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                            : isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-5 h-5" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {getLessonIcon(lesson.type)}
                          </span>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {isArabic ? lesson.title.ar : lesson.title.en}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          {lesson.duration > 0 && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {lesson.duration} {isArabic ? "دقيقة" : "min"}
                              </span>
                            </div>
                          )}
                          <span className="capitalize">
                            {lesson.type === "simulation"
                              ? isArabic
                                ? "محاكاة"
                                : "Simulation"
                              : lesson.type === "quiz"
                                ? isArabic
                                  ? "اختبار"
                                  : "Quiz"
                                : lesson.type === "interactive"
                                  ? isArabic
                                    ? "تفاعلي"
                                    : "Interactive"
                                  : lesson.type === "audio"
                                    ? isArabic
                                      ? "صوتي"
                                      : "Audio"
                                    : isArabic
                                      ? "درس"
                                      : "Lesson"}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      {!isLocked && (
                        <div className="flex items-center gap-2">
                          {isCompleted && (
                            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-medium">
                                +50 XP
                              </span>
                            </div>
                          )}
                          <ChevronRight
                            className={`w-5 h-5 ${
                              isCompleted
                                ? "text-emerald-500"
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
