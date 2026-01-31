import { MetadataRoute } from "next";

const BASE_URL = "https://islam-journey.vercel.app";

// Chapter and lesson data for sitemap
const chaptersData = [
  {
    id: "shahada",
    lessons: ["shahada-meaning", "shahada-tawheed", "shahada-conditions"],
  },
  {
    id: "wudu",
    lessons: ["wudu-intro", "wudu-steps", "wudu-fiqh"],
  },
  {
    id: "salah",
    lessons: [
      "salah-intro",
      "salah-times",
      "salah-positions",
      "salah-recitation",
      "salah-practice",
    ],
  },
  {
    id: "sawm",
    lessons: ["sawm-intro", "sawm-rules", "sawm-benefits"],
  },
  {
    id: "zakat",
    lessons: ["zakat-intro", "zakat-calculation", "zakat-recipients"],
  },
  {
    id: "hajj",
    lessons: ["hajj-intro", "hajj-rites", "hajj-spiritual"],
  },
  {
    id: "akhlaq",
    lessons: ["akhlaq-intro", "akhlaq-character", "akhlaq-relations"],
  },
  {
    id: "new-muslims",
    lessons: [
      "new-muslims-intro",
      "new-muslims-community",
      "new-muslims-challenges",
    ],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/journey`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/onboarding`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ramadan`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/dua`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/history`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/misconceptions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/achievements`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/settings`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/simulations/salah`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/simulations/wudu`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic chapter pages
  const chapterPages: MetadataRoute.Sitemap = chaptersData.map((chapter) => ({
    url: `${BASE_URL}/journey/${chapter.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic lesson pages
  const lessonPages: MetadataRoute.Sitemap = chaptersData.flatMap((chapter) =>
    chapter.lessons.map((lessonId) => ({
      url: `${BASE_URL}/journey/${chapter.id}/${lessonId}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...chapterPages, ...lessonPages];
}
