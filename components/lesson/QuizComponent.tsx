"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import { getLessonById, type QuizQuestion } from "@/lib/content/lessons";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  Star,
  RotateCcw,
  Home,
} from "lucide-react";

interface QuizComponentProps {
  lessonId: string;
  chapterId: string;
}

export function QuizComponent({ lessonId, chapterId }: QuizComponentProps) {
  const { language } = useSettingsStore();
  const { addXP } = useProgressStore();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const lang = language as "en" | "ar";

  useEffect(() => {
    const lesson = getLessonById(lessonId);
    if (lesson?.quiz) {
      setQuestions(lesson.quiz);
      setAnswers(new Array(lesson.quiz.length).fill(null));
    }
  }, [lessonId]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            No quiz available for this lesson.
          </p>
          <Link href={`/journey/${chapterId}`}>
            <Button variant="primary" className="mt-4">
              Back to Chapter
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const percentage = (score / totalQuestions) * 100;
    // Award XP based on performance
    const xpEarned = Math.round(percentage);
    addXP(xpEarned);
    setQuizComplete(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) {
      return { en: "Perfect! You're a star! ⭐", ar: "مثالي! أنت نجم! ⭐" };
    } else if (percentage >= 80) {
      return { en: "Excellent work! Keep it up!", ar: "عمل ممتاز! استمر!" };
    } else if (percentage >= 60) {
      return {
        en: "Good job! Room to improve.",
        ar: "عمل جيد! هناك مجال للتحسن.",
      };
    } else {
      return {
        en: "Keep learning! You'll get there.",
        ar: "استمر في التعلم! ستصل.",
      };
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const message = getScoreMessage();

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
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
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                percentage >= 80
                  ? "bg-gradient-to-br from-amber-400 to-yellow-600"
                  : percentage >= 60
                    ? "bg-gradient-to-br from-emerald-400 to-green-600"
                    : "bg-gradient-to-br from-blue-400 to-indigo-600"
              }`}
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {lang === "en" ? "Quiz Complete!" : "اكتمل الاختبار!"}
            </h2>

            <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 my-4">
              {score}/{totalQuestions}
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-2">
              {percentage}% {lang === "en" ? "correct" : "صحيح"}
            </p>

            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-6">
              {message[lang]}
            </p>

            {/* Stars display */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Star
                    className={`w-10 h-10 ${
                      (i === 0 && percentage >= 33) ||
                      (i === 1 && percentage >= 66) ||
                      (i === 2 && percentage >= 90)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRetry}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="flex-1"
              >
                {lang === "en" ? "Retry" : "إعادة"}
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href={`/journey/${chapterId}/${lessonId}`}>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {lang === "en" ? "Back" : "رجوع"}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {lang === "en" ? "Question" : "سؤال"} {currentQuestionIndex + 1}
                /{totalQuestions}
              </span>
            </div>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question text */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              {currentQuestion.question[lang]}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrectness = showResult;

                let bgClass =
                  "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700";
                let ringClass = "";

                if (showCorrectness) {
                  if (isCorrect) {
                    bgClass =
                      "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500";
                    ringClass = "ring-2 ring-emerald-500";
                  } else if (isSelected && !isCorrect) {
                    bgClass = "bg-red-50 dark:bg-red-900/30 border-red-500";
                    ringClass = "ring-2 ring-red-500";
                  }
                } else if (isSelected) {
                  bgClass =
                    "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500";
                  ringClass = "ring-2 ring-emerald-500";
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${ringClass} ${
                      !showResult
                        ? "hover:border-emerald-400 cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showCorrectness && isCorrect
                            ? "bg-emerald-500 text-white"
                            : showCorrectness && isSelected && !isCorrect
                              ? "bg-red-500 text-white"
                              : isSelected
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {showCorrectness && isCorrect ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : showCorrectness && isSelected && !isCorrect ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {option[lang]}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6"
                >
                  <Card
                    className={`${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
                        : "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className={`font-semibold mb-1 ${
                            selectedAnswer === currentQuestion.correctAnswer
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? lang === "en"
                              ? "Correct!"
                              : "صحيح!"
                            : lang === "en"
                              ? "Not quite!"
                              : "ليس تماماً!"}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          {currentQuestion.explanation[lang]}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="mt-8 flex justify-center">
              {!showResult ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className="min-w-[200px]"
                >
                  {lang === "en" ? "Check Answer" : "تحقق من الإجابة"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="min-w-[200px]"
                >
                  {currentQuestionIndex === totalQuestions - 1
                    ? lang === "en"
                      ? "See Results"
                      : "شاهد النتائج"
                    : lang === "en"
                      ? "Next Question"
                      : "السؤال التالي"}
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
