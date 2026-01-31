"use client";

import { use } from "react";
import { QuizComponent } from "@/components/lesson";

interface QuizPageProps {
  params: Promise<{
    chapterId: string;
    lessonId: string;
  }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { chapterId, lessonId } = use(params);
  
  return <QuizComponent lessonId={lessonId} chapterId={chapterId} />;
}
