"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

export default function PrivacyPage() {
  const { language: lang } = useSettingsStore();

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
      content: {
        en: `Islam Journey collects minimal data to provide you with a personalized learning experience:

• **Local Storage Data**: Your progress, preferences, and settings are stored locally on your device using browser local storage. This data never leaves your device.

• **Anonymous Analytics**: We may collect anonymous usage statistics to improve our app. This includes general patterns like which features are most used, but never personal information.

• **No Account Required**: Islam Journey does not require you to create an account. All your data remains on your device.`,
        ar: `يجمع تطبيق رحلة الإسلام الحد الأدنى من البيانات لتزويدك بتجربة تعلم مخصصة:

• **بيانات التخزين المحلي**: يتم تخزين تقدمك وتفضيلاتك وإعداداتك محلياً على جهازك باستخدام التخزين المحلي للمتصفح. لا تغادر هذه البيانات جهازك أبداً.

• **تحليلات مجهولة**: قد نجمع إحصائيات استخدام مجهولة لتحسين تطبيقنا. يشمل ذلك أنماطاً عامة مثل الميزات الأكثر استخداماً، ولكن ليس معلومات شخصية أبداً.

• **لا حاجة لحساب**: لا يتطلب تطبيق رحلة الإسلام إنشاء حساب. تبقى جميع بياناتك على جهازك.`,
      },
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: { en: "Data Security", ar: "أمان البيانات" },
      content: {
        en: `We take data security seriously:

• All data is stored locally on your device
• We use secure HTTPS connections
• No sensitive personal information is transmitted to our servers
• We do not sell or share your data with third parties`,
        ar: `نأخذ أمان البيانات على محمل الجد:

• يتم تخزين جميع البيانات محلياً على جهازك
• نستخدم اتصالات HTTPS آمنة
• لا يتم نقل معلومات شخصية حساسة إلى خوادمنا
• لا نبيع أو نشارك بياناتك مع أطراف ثالثة`,
      },
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: { en: "How We Use Your Data", ar: "كيف نستخدم بياناتك" },
      content: {
        en: `Your data is used solely to enhance your experience:

• **Personalization**: Remember your language preference, theme, and learning progress
• **Streak Tracking**: Track your daily learning streaks locally
• **Achievements**: Store your unlocked achievements and XP
• **Saved Content**: Remember your saved duas and bookmarks`,
        ar: `تُستخدم بياناتك فقط لتحسين تجربتك:

• **التخصيص**: تذكر تفضيل لغتك والمظهر وتقدم التعلم
• **تتبع السلاسل**: تتبع سلاسل التعلم اليومية محلياً
• **الإنجازات**: تخزين إنجازاتك المفتوحة ونقاط الخبرة
• **المحتوى المحفوظ**: تذكر الأدعية المحفوظة والإشارات المرجعية`,
      },
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: { en: "Your Rights", ar: "حقوقك" },
      content: {
        en: `You have full control over your data:

• **Access**: View all your stored data in your browser's developer tools
• **Delete**: Clear all data by clearing your browser's local storage or using the app's reset function
• **Export**: Your browser allows you to export local storage data
• **Opt-out**: Disable analytics through your browser settings`,
        ar: `لديك سيطرة كاملة على بياناتك:

• **الوصول**: اعرض جميع بياناتك المخزنة في أدوات المطور بمتصفحك
• **الحذف**: امسح جميع البيانات بمسح التخزين المحلي للمتصفح أو باستخدام وظيفة إعادة التعيين بالتطبيق
• **التصدير**: يسمح متصفحك بتصدير بيانات التخزين المحلي
• **إلغاء الاشتراك**: عطّل التحليلات من خلال إعدادات متصفحك`,
      },
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: { en: "Notifications", ar: "الإشعارات" },
      content: {
        en: `If you enable notifications:

• Notifications are processed locally on your device
• We do not track notification interactions
• You can disable notifications at any time through your browser or device settings`,
        ar: `إذا فعّلت الإشعارات:

• تُعالج الإشعارات محلياً على جهازك
• لا نتتبع تفاعلات الإشعارات
• يمكنك تعطيل الإشعارات في أي وقت من خلال إعدادات متصفحك أو جهازك`,
      },
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      title: { en: "Data Deletion", ar: "حذف البيانات" },
      content: {
        en: `To delete all your data:

1. Open your browser's settings
2. Navigate to Privacy or Site Settings
3. Find Islam Journey and clear site data
4. Alternatively, use the "Clear All Data" option in the app's Settings page

Once deleted, your data cannot be recovered as we do not store backups.`,
        ar: `لحذف جميع بياناتك:

1. افتح إعدادات متصفحك
2. انتقل إلى الخصوصية أو إعدادات الموقع
3. ابحث عن رحلة الإسلام وامسح بيانات الموقع
4. بدلاً من ذلك، استخدم خيار "مسح جميع البيانات" في صفحة الإعدادات

بمجرد الحذف، لا يمكن استعادة بياناتك لأننا لا نخزن نسخاً احتياطية.`,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/settings">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {lang === "en" ? "Back" : "رجوع"}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
            </h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-4 shadow-lg shadow-emerald-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {lang === "en" ? "Your Privacy Matters" : "خصوصيتك مهمة"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Islam Journey is committed to protecting your privacy. We collect minimal data and store everything locally on your device."
              : "تلتزم رحلة الإسلام بحماية خصوصيتك. نجمع الحد الأدنى من البيانات ونخزن كل شيء محلياً على جهازك."}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
            {lang === "en" ? "Last updated: January 2025" : "آخر تحديث: يناير 2025"}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {section.title[lang]}
                  </h2>
                  <div className="prose prose-slate dark:prose-invert prose-sm max-w-none">
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {section.content[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          className="mt-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-bold text-slate-800 dark:text-white mb-2">
            {lang === "en" ? "Questions about Privacy?" : "أسئلة حول الخصوصية؟"}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {lang === "en"
              ? "If you have any questions about this Privacy Policy, please contact us."
              : "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا."}
          </p>
          <Link href="/contact">
            <Button>{lang === "en" ? "Contact Us" : "تواصل معنا"}</Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
