"use client";

import { useParams } from "next/navigation";
import {
  LessonViewer,
  QuizComponent,
  getLessonById,
} from "@/components/lesson";
import { WuduSimulation, SalahSimulation } from "@/components/simulation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

// We need to export this for static generation
export const dynamic = "force-static";

// Map lesson IDs to simulation types
const simulationMap: Record<string, "wudu" | "salah"> = {
  "salah-wudu": "wudu",
  "salah-positions": "salah",
  "salah-complete": "salah",
};

export default function LessonPage() {
  const params = useParams();
  const chapterId = params.chapterId as string;
  const lessonId = params.lessonId as string;
  const [isQuiz, setIsQuiz] = useState(false);
  const [simulationType, setSimulationType] = useState<"wudu" | "salah" | null>(
    null,
  );
  const [lessonExists, setLessonExists] = useState(true);

  useEffect(() => {
    // Check if this is a simulation
    if (simulationMap[lessonId]) {
      setSimulationType(simulationMap[lessonId]);
      return;
    }

    const lesson = getLessonById(lessonId);
    if (!lesson) {
      setLessonExists(false);
    } else {
      setIsQuiz(lesson.type === "quiz");
    }
  }, [lessonId]);

  // Simulation pages
  if (simulationType === "wudu") {
    return <WuduSimulation chapterId={chapterId} />;
  }

  if (simulationType === "salah") {
    return <SalahSimulation chapterId={chapterId} />;
  }

  if (!lessonExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Coming Soon!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This lesson is being prepared with care. Check back soon!
          </p>
          <Link href={`/journey/${chapterId}`}>
            <Button
              variant="primary"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Chapter
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isQuiz) {
    return <QuizComponent lessonId={lessonId} chapterId={chapterId} />;
  }

  return <LessonViewer lessonId={lessonId} chapterId={chapterId} />;
}
