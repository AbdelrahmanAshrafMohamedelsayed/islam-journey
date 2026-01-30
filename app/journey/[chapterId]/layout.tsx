import type { ReactNode } from "react";

// Define all valid chapter IDs for static generation
export function generateStaticParams() {
  return [
    { chapterId: "shahada" },
    { chapterId: "salah" },
    { chapterId: "zakat" },
    { chapterId: "sawm" },
    { chapterId: "hajj" },
    { chapterId: "community" },
  ];
}

export default function ChapterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
