"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Card } from "@/components/ui";
import { ProgressBar } from "@/components/ui/Progress";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import {
  getLessonById,
  glossaryTerms,
  type LessonContent,
  type LessonSection,
} from "@/lib/content/lessons";
import {
  CharacterBubble,
  getCharacterGreeting,
  getCharacterEncouragement,
} from "@/components/narrative";
import { getCharactersForChapter } from "@/lib/content/characters";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Volume2,
  VolumeX,
  HelpCircle,
  Star,
  Trophy,
  X,
  Lightbulb,
  AlertTriangle,
  Quote,
  BookMarked,
  Play,
  Pause,
  Maximize2,
  RotateCcw,
} from "lucide-react";

// Dynamically import Lottie player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

// Interactive Section Component for tap-to-reveal, clickable elements
function InteractiveSection({
  section,
  lang,
  content,
}: {
  section: LessonSection;
  lang: "en" | "ar";
  content: string;
}) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  // Parse interactive items from section data
  const items = section.items || [];

  const handleReveal = (index: number) => {
    const newRevealed = new Set(revealed);
    newRevealed.add(index);
    setRevealed(newRevealed);

    if (newRevealed.size === items.length) {
      setCompleted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8"
    >
      <Card variant="glass" padding="lg">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {content || (lang === "en" ? "Tap to learn" : "اضغط للتعلم")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lang === "en"
              ? `${revealed.size} of ${items.length} discovered`
              : `${revealed.size} من ${items.length} مكتشفة`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(
            (
              item: {
                label: { en: string; ar: string };
                detail: { en: string; ar: string };
                icon?: string;
              },
              index: number,
            ) => (
              <motion.button
                key={index}
                onClick={() => handleReveal(index)}
                className={`p-4 rounded-xl transition-all ${
                  revealed.has(index)
                    ? "bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500"
                    : "bg-slate-100 dark:bg-slate-800 border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{item.icon || "✨"}</div>
                <div className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                  {item.label[lang]}
                </div>
                {revealed.has(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-xs text-emerald-600 dark:text-emerald-400"
                  >
                    {item.detail[lang]}
                  </motion.div>
                )}
              </motion.button>
            ),
          )}
        </div>

        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">
                {lang === "en" ? "All discovered!" : "تم اكتشاف الكل!"}
              </span>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

interface LessonViewerProps {
  lessonId: string;
  chapterId: string;
}

export function LessonViewer({ lessonId, chapterId }: LessonViewerProps) {
  const { language } = useSettingsStore();
  const { completeLesson, addXP, completedLessons } = useProgressStore();

  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showGlossary, setShowGlossary] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showCharacterIntro, setShowCharacterIntro] = useState(true);

  const lang = language as "en" | "ar";

  // Get recommended character for this chapter
  const recommendedCharacters = useMemo(
    () => getCharactersForChapter(chapterId),
    [chapterId],
  );
  const primaryCharacter = recommendedCharacters[0]?.id || "yusuf";

  // Generate greeting message once
  const characterGreeting = useMemo(
    () => getCharacterGreeting(primaryCharacter, lang),
    [primaryCharacter, lang],
  );

  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    if (lessonData) {
      setLesson(lessonData);
      setIsCompleted(completedLessons.includes(lessonId));
    }
  }, [lessonId, completedLessons]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            Loading lesson...
          </p>
        </div>
      </div>
    );
  }

  // Handle lessons with sections array OR simple content
  const sections = lesson.sections || [];
  const hasSimpleContent = !!lesson.content && sections.length === 0;

  const totalSections = hasSimpleContent ? 1 : sections.length;
  const progress = ((currentSectionIndex + 1) / totalSections) * 100;
  const currentSection = hasSimpleContent
    ? null
    : sections[currentSectionIndex];

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      // Lesson completed
      handleLessonComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleLessonComplete = () => {
    if (!isCompleted) {
      completeLesson(lessonId, lesson.xpReward);
      addXP(lesson.xpReward);
      setIsCompleted(true);
    }
    setShowCompletion(true);
  };

  // Find glossary terms in text
  const renderTextWithGlossary = (text: string) => {
    const terms = Object.keys(glossaryTerms);
    let result = text;

    terms.forEach((term) => {
      const regex = new RegExp(`\\b(${term})\\b`, "gi");
      if (regex.test(result)) {
        result = result.replace(regex, `__GLOSSARY_${term}__`);
      }
    });

    const parts = result.split(/(__GLOSSARY_\w+__)/g);

    return parts.map((part, index) => {
      const match = part.match(/__GLOSSARY_(\w+)__/);
      if (match) {
        const termKey = match[1].toLowerCase();
        return (
          <button
            key={index}
            onClick={() => setShowGlossary(termKey)}
            className="text-emerald-600 dark:text-emerald-400 underline decoration-dotted hover:decoration-solid cursor-help"
          >
            {match[1]}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Render simple markdown content (for lessons with just content field)
  const renderSimpleContent = () => {
    if (!lesson?.content) return null;
    const content = lesson.content[lang];

    return (
      <motion.div
        key="simple-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-lg dark:prose-invert max-w-none"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div
          className={`text-slate-700 dark:text-slate-300 leading-relaxed ${lang === "ar" ? "text-right font-arabic" : ""}`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              strong: ({ children }) => (
                <strong className="text-slate-900 dark:text-white font-bold">
                  {children}
                </strong>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                  {children}
                </h3>
              ),
              ul: ({ children }) => (
                <ul className="list-none space-y-2 my-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-none space-y-2 my-4">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
    );
  };

  const renderSection = (section: LessonSection | null) => {
    // Handle simple content (no sections)
    if (!section) {
      return renderSimpleContent();
    }

    const content = section.content[lang];

    switch (section.type) {
      case "text":
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg dark:prose-invert max-w-none"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <div
              className={`text-slate-700 dark:text-slate-300 leading-relaxed ${lang === "ar" ? "text-right font-arabic" : ""}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="text-slate-900 dark:text-white font-bold">
                      {children}
                    </strong>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 my-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-none space-y-2 my-4">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>
        );

      case "quote":
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8"
          >
            <Card variant="gradient" padding="lg" className="text-center">
              <Quote className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
              <p className="text-2xl md:text-3xl font-arabic text-slate-900 dark:text-white mb-4 leading-loose">
                {content}
              </p>
              {section.transliteration && (
                <p className="text-lg text-emerald-600 dark:text-emerald-400 italic mb-2">
                  {section.transliteration}
                </p>
              )}
            </Card>
          </motion.div>
        );

      case "quran":
        const quranRef =
          typeof section.reference === "object"
            ? section.reference[lang]
            : section.reference;
        return (
          <motion.div
            key={section.id || `quran-${currentSectionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8"
          >
            <Card
              variant="glass"
              padding="lg"
              className="border-l-4 border-emerald-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <BookMarked className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {quranRef}
                </span>
              </div>
              <p
                dir={lang === "ar" ? "rtl" : "ltr"}
                className={`text-xl ${lang === "ar" ? "font-arabic text-right" : ""} text-slate-800 dark:text-slate-200 leading-relaxed`}
              >
                "{content}"
              </p>
            </Card>
          </motion.div>
        );

      case "hadith":
        const hadithRef =
          typeof section.reference === "object"
            ? section.reference[lang]
            : section.reference;
        const sourceRef = section.source ? section.source[lang] : hadithRef;
        return (
          <motion.div
            key={section.id || `hadith-${currentSectionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8"
          >
            <Card
              variant="glass"
              padding="lg"
              className="border-l-4 border-amber-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Hadith - {sourceRef}
                </span>
              </div>
              <p
                dir={lang === "ar" ? "rtl" : "ltr"}
                className={`text-lg italic text-slate-700 dark:text-slate-300 ${lang === "ar" ? "font-arabic text-right" : ""}`}
              >
                {content}
              </p>
            </Card>
          </motion.div>
        );

      case "tip":
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="my-6"
          >
            <Card className="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800">
              <div
                className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}
              >
                <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div dir={lang === "ar" ? "rtl" : "ltr"}>
                  <p
                    className={`font-semibold text-emerald-800 dark:text-emerald-300 mb-1 ${lang === "ar" ? "text-right" : ""}`}
                  >
                    {lang === "en" ? "Tip" : "نصيحة"}
                  </p>
                  <p
                    className={`text-emerald-700 dark:text-emerald-400 ${lang === "ar" ? "text-right font-arabic" : ""}`}
                  >
                    {content}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case "warning":
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="my-6"
          >
            <Card className="bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800">
              <div
                className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}
              >
                <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div dir={lang === "ar" ? "rtl" : "ltr"}>
                  <p
                    className={`font-semibold text-amber-800 dark:text-amber-300 mb-1 ${lang === "ar" ? "text-right" : ""}`}
                  >
                    {lang === "en" ? "Note" : "ملاحظة"}
                  </p>
                  <p
                    className={`text-amber-700 dark:text-amber-400 ${lang === "ar" ? "text-right font-arabic" : ""}`}
                  >
                    {content}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        );

      // Video section - for instructional videos
      case "video":
        return (
          <motion.div
            key={section.id || `video-${currentSectionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8"
          >
            <Card variant="glass" padding="none" className="overflow-hidden">
              <div className="aspect-video relative bg-slate-900 rounded-t-xl overflow-hidden">
                {section.mediaUrl ? (
                  section.mediaUrl.includes("youtube.com") ||
                  section.mediaUrl.includes("youtu.be") ? (
                    <iframe
                      src={section.mediaUrl
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "youtube.com/embed/")}
                      title={content}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={section.mediaUrl}
                      controls
                      className="w-full h-full object-contain"
                      poster={section.posterUrl}
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p>
                        {lang === "en"
                          ? "Video coming soon"
                          : "الفيديو قادم قريباً"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {content && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {content}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        );

      // Animation section - for Lottie animations
      case "animation":
        return (
          <motion.div
            key={section.id || `animation-${currentSectionIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-8"
          >
            <Card variant="glass" padding="lg" className="text-center">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {section.mediaUrl ? (
                  <Player
                    src={section.mediaUrl}
                    autoplay
                    loop={section.loop !== false}
                    className="w-full h-full"
                    background="transparent"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <div className="text-center">
                      <RotateCcw className="w-12 h-12 mx-auto mb-2 opacity-50 animate-spin" />
                      <p className="text-sm">
                        {lang === "en"
                          ? "Animation loading..."
                          : "جاري تحميل الرسوم المتحركة..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {content && (
                <p className="mt-4 text-slate-700 dark:text-slate-300">
                  {content}
                </p>
              )}
            </Card>
          </motion.div>
        );

      // Image section - for illustrative images with zoom
      case "image":
        return (
          <motion.div
            key={section.id || `image-${currentSectionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-8"
          >
            <Card
              variant="glass"
              padding="none"
              className="overflow-hidden group"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {section.mediaUrl ? (
                  <>
                    <Image
                      src={section.mediaUrl}
                      alt={content || "Lesson illustration"}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        // Open image in full screen modal
                        window.open(section.mediaUrl, "_blank");
                      }}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <p>
                      {lang === "en"
                        ? "Image coming soon"
                        : "الصورة قادمة قريباً"}
                    </p>
                  </div>
                )}
              </div>
              {content && (
                <div className="p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center italic">
                    {content}
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        );

      // Interactive section - for tap-to-reveal, clickable diagrams, etc.
      case "interactive":
        return (
          <InteractiveSection
            key={section.id || `interactive-${currentSectionIndex}`}
            section={section}
            lang={lang}
            content={content}
          />
        );

      // Audio section - for recitations or pronunciation guides
      case "audio":
        return (
          <motion.div
            key={section.id || `audio-${currentSectionIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6"
          >
            <Card variant="glass" className="flex items-center gap-4">
              <button
                className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                onClick={() => {
                  if (section.mediaUrl) {
                    const audio = new Audio(section.mediaUrl);
                    audio.play();
                  }
                }}
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {content}
                </p>
                {section.transliteration && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 italic">
                    {section.transliteration}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        );

      default:
        return (
          <div key={section.id} className="text-slate-700 dark:text-slate-300">
            {content}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href={`/journey/${chapterId}`}>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back" : "رجوع"}
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <BookOpen className="w-4 h-4" />
              <span>
                {currentSectionIndex + 1} / {totalSections}
              </span>
            </div>
          </div>
          <ProgressBar value={progress} showLabel={false} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          key={`title-${currentSectionIndex}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {lesson.title[lang]}
          </h1>
          {lesson.subtitle && (
            <p className="text-slate-600 dark:text-slate-400">
              {lesson.subtitle[lang]}
            </p>
          )}
        </motion.div>

        {/* Character Introduction (shown only on first section) */}
        <AnimatePresence>
          {showCharacterIntro && currentSectionIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <CharacterBubble
                characterId={primaryCharacter}
                message={characterGreeting}
                emotion="welcoming"
                position="left"
                lang={lang}
              />
              <button
                onClick={() => setShowCharacterIntro(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors ml-16"
              >
                {lang === "en" ? "Hide greeting" : "إخفاء التحية"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {renderSection(currentSection)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {lang === "en" ? "Previous" : "السابق"}
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={
              currentSectionIndex === totalSections - 1 ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )
            }
          >
            {currentSectionIndex === totalSections - 1
              ? lang === "en"
                ? "Complete"
                : "إنهاء"
              : lang === "en"
                ? "Next"
                : "التالي"}
          </Button>
        </div>

        {/* Key Points (show on last section) */}
        {currentSectionIndex === totalSections - 1 &&
          lesson.keyPoints &&
          lesson.keyPoints.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card variant="gradient" padding="lg">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  {lang === "en" ? "Key Takeaways" : "النقاط الرئيسية"}
                </h3>
                <ul className="space-y-2">
                  {lesson.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{point[lang]}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
      </div>

      {/* Glossary Modal */}
      <AnimatePresence>
        {showGlossary && glossaryTerms[showGlossary] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowGlossary(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                    {showGlossary}
                  </h3>
                  <p className="text-2xl font-arabic text-emerald-600 dark:text-emerald-400">
                    {glossaryTerms[showGlossary].arabicWord}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    {glossaryTerms[showGlossary].pronunciation}
                  </p>
                </div>
                <button
                  onClick={() => setShowGlossary(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {glossaryTerms[showGlossary][lang]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {lang === "en" ? "Lesson Complete!" : "اكتمل الدرس!"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {lang === "en"
                  ? `You earned ${lesson.xpReward} XP for completing this lesson!`
                  : `لقد ربحت ${lesson.xpReward} نقطة خبرة لإكمال هذا الدرس!`}
              </p>

              <div className="flex gap-3">
                <Link href={`/journey/${chapterId}`} className="flex-1">
                  <Button variant="outline" fullWidth>
                    {lang === "en" ? "Back to Chapter" : "العودة للفصل"}
                  </Button>
                </Link>
                {lesson.quiz && lesson.quiz.length > 0 && (
                  <Link
                    href={`/journey/${chapterId}/${lessonId}/quiz`}
                    className="flex-1"
                  >
                    <Button variant="primary" fullWidth>
                      {lang === "en" ? "Take Quiz" : "خذ الاختبار"}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
