"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useProgressStore, useSettingsStore } from "@/lib/stores";
import { chapterColors } from "@/lib/theme";
import { Lock, CheckCircle, Play } from "lucide-react";
import type { ChapterId } from "@/types";

interface Chapter {
  id: ChapterId;
  number: number;
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  lessonsCount: number;
}

const chapters: Chapter[] = [
  {
    id: "shahada",
    number: 1,
    title: { en: "Declaration of Faith", ar: "شهادة الإيمان" },
    subtitle: { en: "Shahada", ar: "الشهادة" },
    description: {
      en: "Understand the meaning and significance of becoming Muslim",
      ar: "افهم معنى وأهمية أن تصبح مسلماً",
    },
    icon: "☪️",
    lessonsCount: 5,
  },
  {
    id: "wudu",
    number: 2,
    title: { en: "Purification", ar: "الطهارة" },
    subtitle: { en: "Wudu", ar: "الوضوء" },
    description: {
      en: "Learn the ritual ablution that purifies body and soul",
      ar: "تعلم الوضوء الذي يطهر الجسد والروح",
    },
    icon: "💧",
    lessonsCount: 6,
  },
  {
    id: "salah",
    number: 3,
    title: { en: "The Prayer", ar: "الصلاة" },
    subtitle: { en: "Salah", ar: "الصلاة" },
    description: {
      en: "Master the five daily prayers that connect you to Allah",
      ar: "أتقن الصلوات الخمس التي تصلك بالله",
    },
    icon: "🕌",
    lessonsCount: 10,
  },
  {
    id: "quran",
    number: 4,
    title: { en: "The Holy Book", ar: "الكتاب المقدس" },
    subtitle: { en: "Quran", ar: "القرآن" },
    description: {
      en: "Begin your journey with the words of Allah",
      ar: "ابدأ رحلتك مع كلام الله",
    },
    icon: "📖",
    lessonsCount: 8,
  },
  {
    id: "sawm",
    number: 5,
    title: { en: "Fasting", ar: "الصيام" },
    subtitle: { en: "Sawm", ar: "الصوم" },
    description: {
      en: "Experience the spiritual discipline of Ramadan",
      ar: "عش تجربة الانضباط الروحي في رمضان",
    },
    icon: "🌙",
    lessonsCount: 7,
  },
  {
    id: "zakat",
    number: 6,
    title: { en: "Charity", ar: "الزكاة" },
    subtitle: { en: "Zakat", ar: "الزكاة" },
    description: {
      en: "Learn how giving purifies wealth and helps others",
      ar: "تعلم كيف يطهر العطاء المال ويساعد الآخرين",
    },
    icon: "💝",
    lessonsCount: 5,
  },
  {
    id: "hajj",
    number: 7,
    title: { en: "The Pilgrimage", ar: "الحج" },
    subtitle: { en: "Hajj", ar: "الحج" },
    description: {
      en: "Discover the journey of a lifetime to Mecca",
      ar: "اكتشف رحلة العمر إلى مكة",
    },
    icon: "🕋",
    lessonsCount: 8,
  },
  {
    id: "new-muslims",
    number: 8,
    title: { en: "New Muslim Guide", ar: "دليل المسلم الجديد" },
    subtitle: { en: "Essential Knowledge", ar: "المعرفة الأساسية" },
    description: {
      en: "Learn what is forbidden in Islam and how to protect your faith",
      ar: "تعلم المحرمات في الإسلام وكيف تحمي إيمانك",
    },
    icon: "⭐",
    lessonsCount: 3,
  },
  {
    id: "akhlaq",
    number: 9,
    title: { en: "Character & Ethics", ar: "الأخلاق" },
    subtitle: { en: "Akhlaq", ar: "الأخلاق" },
    description: {
      en: "Develop noble character and Islamic manners",
      ar: "طور الخلق النبيل والآداب الإسلامية",
    },
    icon: "💎",
    lessonsCount: 5,
  },
];

export function JourneyMap() {
  const { completedChapters, currentChapter, completedLessons } =
    useProgressStore();
  const { language } = useSettingsStore();
  const isArabic = language === "ar";

  const getChapterStatus = (chapterId: ChapterId, index: number) => {
    if (completedChapters.includes(chapterId)) return "completed";
    if (chapterId === currentChapter) return "current";
    // New Muslims chapter is always accessible (important guide for new converts)
    if (chapterId === "new-muslims") return "current";
    // Akhlaq chapter is also always accessible
    if (chapterId === "akhlaq") return "current";
    // Unlock next chapter if previous is completed
    if (index === 0) return "current"; // First chapter always unlocked
    if (completedChapters.includes(chapters[index - 1].id)) return "current";
    return "locked";
  };

  const getCompletedLessonsInChapter = (chapterId: ChapterId) => {
    return completedLessons.filter((id) => id.startsWith(chapterId)).length;
  };

  return (
    <div className="relative py-8">
      {/* Connection line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-emerald-200 via-emerald-300 to-emerald-200 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-800 -translate-x-1/2 hidden md:block" />

      <div className="space-y-8 md:space-y-12">
        {chapters.map((chapter, index) => {
          const status = getChapterStatus(chapter.id, index);
          const completedCount = getCompletedLessonsInChapter(chapter.id);
          const progress = (completedCount / chapter.lessonsCount) * 100;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row items-center gap-4 md:gap-8",
                isEven ? "md:flex-row" : "md:flex-row-reverse",
              )}
            >
              {/* Chapter Card */}
              <div
                className={cn(
                  "flex-1 w-full max-w-lg",
                  isEven ? "md:text-right" : "md:text-left",
                )}
              >
                <Link
                  href={status === "locked" ? "#" : `/journey/${chapter.id}`}
                  className={cn(
                    "block p-6 rounded-2xl border-2 transition-all duration-300",
                    status === "completed" &&
                      "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700",
                    status === "current" &&
                      "bg-white dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30",
                    status === "locked" &&
                      "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-4",
                      isEven ? "md:flex-row-reverse" : "",
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                        status === "completed"
                          ? "bg-emerald-500 text-white"
                          : status === "current"
                            ? `bg-linear-to-br ${chapterColors[chapter.id].bg} text-white`
                            : "bg-slate-200 dark:bg-slate-700",
                      )}
                    >
                      {status === "completed" ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : status === "locked" ? (
                        <Lock className="w-6 h-6 text-slate-400" />
                      ) : (
                        chapter.icon
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            status === "completed"
                              ? "bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300"
                              : status === "current"
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
                                : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
                          )}
                        >
                          {isArabic
                            ? `الفصل ${chapter.number}`
                            : `Chapter ${chapter.number}`}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {isArabic ? chapter.subtitle.ar : chapter.subtitle.en}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          "text-xl font-bold mb-2",
                          status === "locked"
                            ? "text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white",
                        )}
                      >
                        {isArabic ? chapter.title.ar : chapter.title.en}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {isArabic
                          ? chapter.description.ar
                          : chapter.description.en}
                      </p>

                      {/* Progress */}
                      {status !== "locked" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400">
                              {completedCount} / {chapter.lessonsCount}{" "}
                              {isArabic ? "دروس" : "lessons"}
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className={cn(
                                "h-full rounded-full bg-linear-to-r",
                                chapterColors[chapter.id].bg,
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      {status === "current" && (
                        <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <Play className="w-4 h-4" />
                          <span>
                            {isArabic ? "متابعة التعلم" : "Continue Learning"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Center node */}
              <div className="relative z-10 hidden md:flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                  className={cn(
                    "w-12 h-12 rounded-full border-4 flex items-center justify-center text-lg font-bold shadow-lg",
                    status === "completed"
                      ? "bg-emerald-500 border-emerald-300 text-white"
                      : status === "current"
                        ? "bg-white dark:bg-slate-900 border-emerald-500 text-emerald-600"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400",
                  )}
                >
                  {status === "completed" ? "✓" : chapter.number}
                </motion.div>
              </div>

              {/* Spacer for layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
