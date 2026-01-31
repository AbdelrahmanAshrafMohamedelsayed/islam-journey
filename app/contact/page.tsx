"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Github,
  Twitter,
  Heart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettingsStore } from "@/lib/stores";

export default function ContactPage() {
  const { language: lang } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: { en: "Email", ar: "البريد الإلكتروني" },
      value: "contact@islamjourney.app",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: { en: "GitHub", ar: "جيت هب" },
      value: "github.com/islam-journey",
      color: "from-slate-600 to-slate-800",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: { en: "Twitter", ar: "تويتر" },
      value: "@islamjourney",
      color: "from-sky-400 to-blue-500",
    },
  ];

  const faqs = [
    {
      q: { en: "Is Islam Journey free?", ar: "هل تطبيق رحلة الإسلام مجاني؟" },
      a: {
        en: "Yes! Islam Journey is completely free and open-source. We believe Islamic education should be accessible to everyone.",
        ar: "نعم! تطبيق رحلة الإسلام مجاني تماماً ومفتوح المصدر. نؤمن أن التعليم الإسلامي يجب أن يكون متاحاً للجميع.",
      },
    },
    {
      q: { en: "How can I contribute?", ar: "كيف يمكنني المساهمة؟" },
      a: {
        en: "You can contribute by reporting bugs, suggesting features, helping with translations, or contributing code on GitHub.",
        ar: "يمكنك المساهمة بالإبلاغ عن الأخطاء، اقتراح ميزات، المساعدة في الترجمات، أو المساهمة بالكود على جيت هب.",
      },
    },
    {
      q: { en: "Who reviews the content?", ar: "من يراجع المحتوى؟" },
      a: {
        en: "All content is reviewed by knowledgeable Muslims to ensure accuracy and authenticity in accordance with Quran and Sunnah.",
        ar: "يتم مراجعة جميع المحتوى من قبل مسلمين على علم لضمان الدقة والأصالة وفقاً للقرآن والسنة.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-slate-900">
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
            {lang === "en" ? "Contact Us" : "تواصل معنا"}
          </h1>
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
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 mb-4 shadow-lg shadow-blue-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {lang === "en" ? "Get in Touch" : "تواصل معنا"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {lang === "en"
              ? "Have questions, feedback, or suggestions? We'd love to hear from you!"
              : "لديك أسئلة أو ملاحظات أو اقتراحات؟ نحب أن نسمع منك!"}
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white mx-auto mb-4`}
              >
                {method.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                {method.title[lang]}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {method.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
            {lang === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
          </h2>

          {status === "success" ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {lang === "en" ? "Message Sent!" : "تم إرسال الرسالة!"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {lang === "en"
                  ? "We'll get back to you as soon as possible."
                  : "سنرد عليك في أقرب وقت ممكن."}
              </p>
              <Button onClick={() => setStatus("idle")}>
                {lang === "en" ? "Send Another" : "أرسل رسالة أخرى"}
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {lang === "en" ? "Your Name" : "اسمك"}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white"
                    placeholder={lang === "en" ? "Ahmed" : "أحمد"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {lang === "en" ? "Email Address" : "البريد الإلكتروني"}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white"
                    placeholder="ahmed@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {lang === "en" ? "Subject" : "الموضوع"}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white"
                >
                  <option value="">
                    {lang === "en" ? "Select a topic..." : "اختر موضوعاً..."}
                  </option>
                  <option value="feedback">
                    {lang === "en" ? "Feedback" : "ملاحظات"}
                  </option>
                  <option value="bug">
                    {lang === "en" ? "Report a Bug" : "الإبلاغ عن خطأ"}
                  </option>
                  <option value="feature">
                    {lang === "en" ? "Feature Request" : "طلب ميزة"}
                  </option>
                  <option value="content">
                    {lang === "en" ? "Content Suggestion" : "اقتراح محتوى"}
                  </option>
                  <option value="other">
                    {lang === "en" ? "Other" : "أخرى"}
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {lang === "en" ? "Message" : "الرسالة"}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white resize-none"
                  placeholder={lang === "en" ? "Your message..." : "رسالتك..."}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                leftIcon={
                  status === "sending" ? undefined : (
                    <Send className="w-4 h-4" />
                  )
                }
                className="w-full"
              >
                {status === "sending"
                  ? lang === "en"
                    ? "Sending..."
                    : "جارٍ الإرسال..."
                  : lang === "en"
                    ? "Send Message"
                    : "إرسال الرسالة"}
              </Button>
            </form>
          )}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            {lang === "en" ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                  {faq.q[lang]}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {faq.a[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="flex items-center justify-center gap-2">
            {lang === "en" ? "Made with" : "صُنع بـ"}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {lang === "en" ? "for the Ummah" : "للأمة"}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
