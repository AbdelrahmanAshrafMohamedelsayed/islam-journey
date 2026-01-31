"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  Scale,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

export default function TermsPage() {
  const { language: lang } = useSettingsStore();

  const sections = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: { en: "Acceptance of Terms", ar: "قبول الشروط" },
      content: {
        en: `By accessing and using Islam Journey ("the App"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.

These terms apply to all users, visitors, and others who access or use the App.`,
        ar: `من خلال الوصول إلى تطبيق رحلة الإسلام ("التطبيق") واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام التطبيق.

تنطبق هذه الشروط على جميع المستخدمين والزوار وغيرهم ممن يصلون إلى التطبيق أو يستخدمونه.`,
      },
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: { en: "Use of the App", ar: "استخدام التطبيق" },
      content: {
        en: `Islam Journey is an educational platform designed to help users learn about Islam. You agree to use the App only for lawful purposes and in accordance with these Terms.

You agree NOT to:
• Use the App in any way that violates any applicable law or regulation
• Attempt to interfere with or disrupt the App's functionality
• Copy, modify, or distribute the App's content without permission
• Use the App to spread misinformation about Islam
• Use automated systems to access the App`,
        ar: `رحلة الإسلام هي منصة تعليمية مصممة لمساعدة المستخدمين على تعلم الإسلام. توافق على استخدام التطبيق فقط لأغراض مشروعة ووفقاً لهذه الشروط.

توافق على عدم:
• استخدام التطبيق بأي طريقة تنتهك أي قانون أو لائحة سارية
• محاولة التدخل في وظائف التطبيق أو تعطيلها
• نسخ أو تعديل أو توزيع محتوى التطبيق بدون إذن
• استخدام التطبيق لنشر معلومات مضللة عن الإسلام
• استخدام أنظمة آلية للوصول إلى التطبيق`,
      },
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: { en: "Content", ar: "المحتوى" },
      content: {
        en: `All content in Islam Journey, including lessons, historical information, duas, and educational materials, is provided for informational and educational purposes.

While we strive for accuracy, the content:
• Should not replace advice from qualified Islamic scholars
• May contain simplified explanations for educational purposes
• Is based on mainstream Islamic sources (Quran and Sunnah)
• May be updated or modified at any time

For religious rulings (fatwas) or personal religious guidance, please consult qualified scholars.`,
        ar: `جميع المحتوى في رحلة الإسلام، بما في ذلك الدروس والمعلومات التاريخية والأدعية والمواد التعليمية، مقدم لأغراض إعلامية وتعليمية.

بينما نسعى للدقة، المحتوى:
• لا ينبغي أن يحل محل نصيحة العلماء المؤهلين
• قد يحتوي على تفسيرات مبسطة لأغراض تعليمية
• يستند إلى المصادر الإسلامية الرئيسية (القرآن والسنة)
• قد يتم تحديثه أو تعديله في أي وقت

للفتاوى أو الإرشاد الديني الشخصي، يرجى استشارة العلماء المؤهلين.`,
      },
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: { en: "Intellectual Property", ar: "الملكية الفكرية" },
      content: {
        en: `Islam Journey is open-source software. The source code is available under the MIT License on GitHub.

However:
• The "Islam Journey" name and logo are protected
• Some content may be sourced from third parties with permission
• Quranic text and authentic hadith are in the public domain
• User-generated content remains the property of its creators`,
        ar: `رحلة الإسلام برنامج مفتوح المصدر. الكود المصدري متاح تحت رخصة MIT على جيت هب.

ومع ذلك:
• اسم "رحلة الإسلام" والشعار محميان
• بعض المحتوى قد يكون من أطراف ثالثة بإذن
• النص القرآني والأحاديث الصحيحة في المجال العام
• المحتوى الذي ينشئه المستخدم يبقى ملكاً لمنشئيه`,
      },
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: { en: "Disclaimer", ar: "إخلاء المسؤولية" },
      content: {
        en: `Islam Journey is provided "as is" without warranties of any kind, either express or implied.

We do not warrant that:
• The App will be uninterrupted or error-free
• All content is 100% accurate or complete
• The App will meet your specific requirements

In no event shall Islam Journey be liable for any damages arising from the use of the App.`,
        ar: `يُقدم تطبيق رحلة الإسلام "كما هو" بدون ضمانات من أي نوع، صريحة أو ضمنية.

لا نضمن أن:
• التطبيق سيكون بدون انقطاع أو خالياً من الأخطاء
• جميع المحتوى دقيق 100% أو كامل
• التطبيق سيلبي متطلباتك المحددة

في أي حال من الأحوال لن تكون رحلة الإسلام مسؤولة عن أي أضرار ناشئة عن استخدام التطبيق.`,
      },
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: { en: "Community Guidelines", ar: "إرشادات المجتمع" },
      content: {
        en: `If you contribute to Islam Journey (through GitHub, feedback, or other means), you agree to:

• Respect others and maintain Islamic etiquette (adab)
• Provide constructive feedback
• Report any incorrect Islamic content you find
• Not submit content that contradicts established Islamic principles
• Help maintain a welcoming environment for all learners`,
        ar: `إذا ساهمت في رحلة الإسلام (من خلال جيت هب أو الملاحظات أو وسائل أخرى)، فإنك توافق على:

• احترام الآخرين والحفاظ على الآداب الإسلامية
• تقديم ملاحظات بناءة
• الإبلاغ عن أي محتوى إسلامي غير صحيح تجده
• عدم تقديم محتوى يتعارض مع المبادئ الإسلامية الثابتة
• المساعدة في الحفاظ على بيئة ترحيبية لجميع المتعلمين`,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/settings">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              {lang === "en" ? "Back" : "رجوع"}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              {lang === "en" ? "Terms of Service" : "شروط الخدمة"}
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-400 to-indigo-500 mb-4 shadow-lg shadow-blue-500/30">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {lang === "en" ? "Terms of Service" : "شروط الخدمة"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Please read these terms carefully before using Islam Journey."
              : "يرجى قراءة هذه الشروط بعناية قبل استخدام رحلة الإسلام."}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
            {lang === "en"
              ? "Last updated: January 2025"
              : "آخر تحديث: يناير 2025"}
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
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
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

        {/* Changes Notice */}
        <motion.div
          className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                {lang === "en" ? "Changes to Terms" : "التغييرات على الشروط"}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {lang === "en"
                  ? "We reserve the right to modify these terms at any time. Continued use of the App after changes constitutes acceptance of the new terms. We will notify users of significant changes."
                  : "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. الاستمرار في استخدام التطبيق بعد التغييرات يعني قبول الشروط الجديدة. سنخطر المستخدمين بالتغييرات المهمة."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="mt-8 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-bold text-slate-800 dark:text-white mb-2">
            {lang === "en" ? "Questions?" : "أسئلة؟"}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {lang === "en"
              ? "If you have any questions about these Terms, please contact us."
              : "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى التواصل معنا."}
          </p>
          <Link href="/contact">
            <Button>{lang === "en" ? "Contact Us" : "تواصل معنا"}</Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
