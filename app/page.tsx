"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, AnimatedCard, FeatureCard } from "@/components/ui";
import { JourneyMap } from "@/components/journey";
import { useSettingsStore, useProgressStore } from "@/lib/stores";
import {
  Sparkles,
  BookOpen,
  Globe,
  Trophy,
  History,
  MessageCircleQuestion,
  Play,
  ChevronRight,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { language } = useSettingsStore();
  const { totalXp, level, streakDays } = useProgressStore();
  const isArabic = language === "ar";

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: isArabic ? "تعلم تفاعلي" : "Interactive Learning",
      description: isArabic
        ? "تعلم من خلال محاكاة تفاعلية للصلاة والوضوء وغيرها"
        : "Learn through engaging simulations of prayer, ablution, and more",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: isArabic ? "رحلة موجهة" : "Guided Journey",
      description: isArabic
        ? "تقدم عبر فصول منظمة بعناية وفقاً لسرعتك"
        : "Progress through carefully structured chapters at your own pace",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: isArabic ? "دعم ثنائي اللغة" : "Bilingual Support",
      description: isArabic
        ? "محتوى كامل بالعربية والإنجليزية مع تلاوات صوتية"
        : "Full content in English and Arabic with audio recitations",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: isArabic ? "تقدم ممتع" : "Gamified Progress",
      description: isArabic
        ? "اكسب النقاط وافتح الإنجازات وتابع نموك الروحي"
        : "Earn XP, unlock achievements, and track your spiritual growth",
    },
    {
      icon: <History className="w-6 h-6" />,
      title: isArabic ? "تاريخ غني" : "Rich History",
      description: isArabic
        ? "استكشف التاريخ الإسلامي وقصص الأنبياء والحضارة"
        : "Explore Islamic history, prophets stories, and civilization",
    },
    {
      icon: <MessageCircleQuestion className="w-6 h-6" />,
      title: isArabic ? "إجابات واضحة" : "Clear Answers",
      description: isArabic
        ? "معالجة الشبهات الشائعة بردود مبنية على الأدلة"
        : "Address common misconceptions with evidence-based responses",
    },
  ];

  const stats = [
    { value: "7", label: isArabic ? "فصول تعليمية" : "Learning Chapters" },
    { value: "50+", label: isArabic ? "درس تفاعلي" : "Interactive Lessons" },
    {
      value: "100+",
      label: isArabic ? "إنجاز للفتح" : "Achievements to Unlock",
    },
    { value: "∞", label: isArabic ? "معرفة لاكتساب" : "Knowledge to Gain" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pattern-arabesque">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4" />
            <span>
              {isArabic ? "مجاني ١٠٠٪ • بدون إعلانات" : "100% Free • No Ads"}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-responsive-xl font-bold text-slate-900 dark:text-white mb-6"
          >
            {isArabic ? (
              <>
                ابدأ <span className="text-gradient">رحلتك</span> نحو الإسلام
              </>
            ) : (
              <>
                Begin Your <span className="text-gradient">Journey</span> to
                Islam
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-responsive-md text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10"
          >
            {isArabic
              ? "تجربة تفاعلية ممتعة مصممة للمسلمين الجدد والمهتمين بالتعرف على الإسلام. تعلم الصلاة والوضوء والقرآن وأكثر."
              : "An interactive, gamified experience designed for new Muslims and those curious about the faith. Learn prayer, ablution, Quran, and more."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/journey">
              <Button
                size="xl"
                variant="primary"
                leftIcon={<Play className="w-5 h-5" />}
              >
                {isArabic ? "ابدأ رحلتك" : "Start Your Journey"}
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="xl"
                variant="outline"
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                {isArabic ? "اعرف المزيد" : "Learn More"}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-slate-400 dark:bg-slate-600" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
              {isArabic ? "ماذا ستكتشف" : "What You Will Discover"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {isArabic
                ? "رحلة شاملة عبر أساسيات الإسلام مع أدوات تفاعلية ومحتوى غني"
                : "A comprehensive journey through the foundations of Islam with interactive tools and rich content"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
              {isArabic
                ? "طريقك عبر أركان الإسلام"
                : "Your Path Through the Pillars"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {isArabic
                ? "رحلة منظمة عبر أسس الإسلام - من الشهادة إلى الحج"
                : "A structured journey through the foundations of Islam - from Shahada to Hajj"}
            </p>
          </motion.div>

          <JourneyMap />
        </div>
      </section>

      {/* Misconceptions Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
                <MessageCircleQuestion className="w-4 h-4" />
                <span>
                  {isArabic ? "رد الشبهات" : "Addressing Misconceptions"}
                </span>
              </div>
              <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
                {isArabic
                  ? "إجابات واضحة على الأسئلة الشائعة"
                  : "Clear Answers to Common Questions"}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                {isArabic
                  ? "استكشف ردوداً مبنية على الأدلة للشبهات الشائعة حول الإسلام، مع اقتباسات من العلماء وفيديوهات توضيحية."
                  : "Explore evidence-based responses to common misconceptions about Islam, with scholar quotes and explanatory videos."}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  isArabic ? "المرأة في الإسلام" : "Women in Islam",
                  isArabic ? "الإسلام والسلام" : "Islam & Peace",
                  isArabic ? "العلم والإيمان" : "Science & Faith",
                  isArabic ? "الشريعة الإسلامية" : "Islamic Law",
                ].map((topic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/misconceptions">
                <Button
                  variant="primary"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  {isArabic ? "استكشف الردود" : "Explore Responses"}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    count: "50+",
                    label: isArabic
                      ? "شبهة مردود عليها"
                      : "Misconceptions Addressed",
                  },
                  {
                    count: "100+",
                    label: isArabic ? "فيديو توضيحي" : "Explanatory Videos",
                  },
                  {
                    count: "200+",
                    label: isArabic ? "اقتباس علمي" : "Scholar Quotes",
                  },
                  {
                    count: "8",
                    label: isArabic ? "فئات رئيسية" : "Main Categories",
                  },
                ].map((stat, index) => (
                  <AnimatedCard
                    key={index}
                    variant="default"
                    padding="lg"
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {stat.count}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
              {isArabic ? "استكشف المزيد" : "Explore More"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {isArabic
                ? "أدوات وموارد إضافية لرحلتك الإسلامية"
                : "Additional tools and resources for your Islamic journey"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/quran",
                icon: "📖",
                title: isArabic ? "القرآن الكريم" : "Quran Reader",
                description: isArabic
                  ? "اقرأ واستمع للقرآن مع الترجمة"
                  : "Read & listen to Quran with translation",
                color: "emerald",
              },
              {
                href: "/history",
                icon: "🕰️",
                title: isArabic ? "التاريخ الإسلامي" : "Islamic History",
                description: isArabic
                  ? "استكشف أحداث السيرة النبوية"
                  : "Explore the Prophet's life timeline",
                color: "amber",
              },
              {
                href: "/ramadan",
                icon: "🌙",
                title: isArabic ? "متتبع رمضان" : "Ramadan Tracker",
                description: isArabic
                  ? "تتبع صيامك وعباداتك في رمضان"
                  : "Track your fasting and worship",
                color: "indigo",
              },
              {
                href: "/misconceptions",
                icon: "💡",
                title: isArabic ? "رد الشبهات" : "Misconceptions",
                description: isArabic
                  ? "إجابات على الأسئلة الشائعة"
                  : "Answers to common questions",
                color: "rose",
              },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <AnimatedCard
                    variant="elevated"
                    padding="lg"
                    className="h-full text-center hover:scale-105 transition-transform"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </AnimatedCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl -z-10" />

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
                🕌
              </div>

              <h2 className="text-responsive-lg font-bold text-slate-900 dark:text-white mb-4">
                {isArabic ? "هل أنت مستعد للبدء؟" : "Ready to Begin?"}
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                {isArabic
                  ? "انضم إلى آلاف الباحثين في طريقهم نحو فهم الإسلام. رحلتك تبدأ بخطوة واحدة."
                  : "Join thousands of seekers on their path to understanding Islam. Your journey begins with a single step."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/journey">
                  <Button
                    size="xl"
                    variant="gold"
                    leftIcon={<Zap className="w-5 h-5" />}
                  >
                    {isArabic ? "ابدأ الرحلة مجاناً" : "Start Free Journey"}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {isArabic ? "بدون تسجيل مطلوب" : "No signup required"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{isArabic ? "مجاني للأبد" : "Free forever"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
