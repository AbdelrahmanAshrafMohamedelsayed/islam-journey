import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson | New Muslim Journey",
  description: "Learn about Islam with our interactive lessons",
};

// Generate static params for all lessons across all chapters
export function generateStaticParams() {
  const chapters = [
    "shahada",
    "salah",
    "zakat",
    "sawm",
    "hajj",
    "quran",
    "akhlaq",
  ];

  const lessonsByChapter: Record<string, string[]> = {
    shahada: [
      "shahada-meaning",
      "shahada-tawheed",
      "shahada-conditions",
      "shahada-prophet",
      "shahada-quiz",
    ],
    salah: [
      "salah-importance",
      "salah-wudu",
      "salah-times",
      "salah-positions",
      "salah-recitations",
      "salah-complete",
      "salah-mistakes",
      "salah-quiz",
    ],
    zakat: [
      "zakat-meaning",
      "zakat-calculation",
      "zakat-recipients",
      "zakat-quiz",
    ],
    sawm: [
      "sawm-meaning",
      "sawm-rules",
      "sawm-ramadan",
      "sawm-tracker",
      "sawm-exemptions",
      "sawm-quiz",
    ],
    hajj: [
      "hajj-meaning",
      "hajj-rituals",
      "hajj-virtual",
      "hajj-umrah",
      "hajj-quiz",
    ],
    quran: [
      "quran-intro",
      "quran-arabic",
      "quran-fatiha",
      "quran-short-surahs",
      "quran-tajweed",
      "quran-player",
      "quran-quiz",
    ],
    akhlaq: [
      "akhlaq-intro",
      "akhlaq-honesty",
      "akhlaq-kindness",
      "akhlaq-family",
      "akhlaq-community",
      "akhlaq-quiz",
    ],
  };

  const params: { chapterId: string; lessonId: string }[] = [];

  for (const chapter of chapters) {
    const lessons = lessonsByChapter[chapter] || [];
    for (const lesson of lessons) {
      params.push({ chapterId: chapter, lessonId: lesson });
    }
  }

  return params;
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
