"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Globe,
  BookOpen,
  Users,
  Sparkles,
  Github,
  Mail,
  Star,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

const teamMembers = [
  {
    name: "Islam Journey Team",
    role: { en: "Developers & Designers", ar: "المطورون والمصممون" },
    avatar: "🌙",
  },
];

const milestones = [
  { year: "2024", event: { en: "Project inception", ar: "بداية المشروع" } },
  { year: "2024", event: { en: "Beta launch", ar: "إطلاق النسخة التجريبية" } },
  { year: "2025", event: { en: "Community expansion", ar: "توسع المجتمع" } },
];

export default function AboutPage() {
  const { language: lang } = useSettingsStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/journey">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {lang === "en" ? "Back" : "رجوع"}
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">
            {lang === "en" ? "About" : "حول التطبيق"}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-6 shadow-xl shadow-emerald-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className="text-5xl">🕌</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Islam Journey
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {lang === "en"
              ? "A beautiful, story-driven app to learn about Islam through interactive lessons, games, and immersive experiences."
              : "تطبيق جميل يعتمد على القصص لتعلم الإسلام من خلال دروس تفاعلية وألعاب وتجارب غامرة."}
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                {lang === "en" ? "Our Mission" : "مهمتنا"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === "en"
                  ? "To make Islamic education accessible, engaging, and enjoyable for everyone. We believe that learning about faith should be a beautiful journey, not a tedious task. Through storytelling, gamification, and thoughtful design, we aim to inspire a new generation of learners."
                  : "جعل التعليم الإسلامي متاحاً وجذاباً وممتعاً للجميع. نؤمن أن تعلم الدين يجب أن يكون رحلة جميلة، وليس مهمة مملة. من خلال السرد القصصي والألعاب والتصميم المدروس، نهدف إلى إلهام جيل جديد من المتعلمين."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: { en: "Interactive Lessons", ar: "دروس تفاعلية" },
              description: {
                en: "Engaging content with quizzes and progress tracking",
                ar: "محتوى جذاب مع اختبارات وتتبع التقدم",
              },
              color: "from-blue-400 to-indigo-500",
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: { en: "Immersive Stories", ar: "قصص غامرة" },
              description: {
                en: "Experience history through character narration",
                ar: "عش التاريخ من خلال رواية الشخصيات",
              },
              color: "from-purple-400 to-pink-500",
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: { en: "Bilingual Support", ar: "دعم ثنائي اللغة" },
              description: {
                en: "Full Arabic and English experience",
                ar: "تجربة كاملة بالعربية والإنجليزية",
              },
              color: "from-emerald-400 to-teal-500",
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: { en: "Made with Love", ar: "صُنع بحب" },
              description: {
                en: "Free, open-source, and community-driven",
                ar: "مجاني، مفتوح المصدر، ويقوده المجتمع",
              },
              color: "from-rose-400 to-red-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {feature.title[lang]}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {feature.description[lang]}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                {lang === "en" ? "Our Vision" : "رؤيتنا"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === "en"
                  ? "To become the world's most loved Islamic learning platform. We envision a future where anyone, anywhere, can embark on a meaningful journey to understand Islam's beauty, wisdom, and guidance."
                  : "أن نصبح أكثر منصة تعليم إسلامي محبوبة في العالم. نتصور مستقبلاً حيث يمكن لأي شخص، في أي مكان، أن يبدأ رحلة هادفة لفهم جمال الإسلام وحكمته وهدايته."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            {lang === "en" ? "Our Journey" : "رحلتنا"}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800 -translate-x-1/2" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-4 mb-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex-1 text-right">
                  {index % 2 === 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        {milestone.year}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        {milestone.event[lang]}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 z-10" />
                <div className="flex-1">
                  {index % 2 !== 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        {milestone.year}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        {milestone.event[lang]}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            {lang === "en" ? "The Team" : "الفريق"}
          </h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{member.avatar}</span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {member.role[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-3xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Rocket className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
          <h2 className="text-2xl font-bold mb-3">
            {lang === "en" ? "Join the Journey" : "انضم إلى الرحلة"}
          </h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            {lang === "en"
              ? "Contribute to the project, share feedback, or help translate content into more languages."
              : "ساهم في المشروع، شارك ملاحظاتك، أو ساعد في ترجمة المحتوى إلى لغات أكثر."}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              leftIcon={<Github className="w-4 h-4" />}
              className="border-white/20 text-white hover:bg-white/10"
            >
              GitHub
            </Button>
            <Link href="/contact">
              <Button leftIcon={<Mail className="w-4 h-4" />}>
                {lang === "en" ? "Contact Us" : "تواصل معنا"}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="flex items-center justify-center gap-2">
            {lang === "en" ? "Made with" : "صُنع بـ"}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {lang === "en" ? "for the Ummah" : "للأمة"}
          </p>
          <p className="text-sm mt-2">
            © 2024-2025 Islam Journey. All rights reserved.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
