"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Share,
  Plus,
  Smartphone,
  CheckCircle,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);
    if (standalone) return;

    // Check if iOS
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Check if prompt was dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissedAt) {
      const daysSinceDismissed =
        (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return;
    }

    // Show after a short delay for better UX
    const showTimer = setTimeout(() => {
      if (ios) {
        setShowPrompt(true);
      }
    }, 3000);

    // Listen for beforeinstallprompt (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem("pwa-prompt-dismissed");
    });

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <>
      {/* Main install prompt */}
      <AnimatePresence>
        {!showIOSInstructions && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-[400px]"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Header gradient */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

              <div className="p-5">
                {/* Close button */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                <div className="flex items-start gap-4">
                  {/* App icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <span className="text-3xl">🕌</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                      Install New Muslim Journey
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Get quick access and offline support
                    </p>
                    <p
                      className="text-sm text-slate-500 dark:text-slate-500 font-arabic"
                      dir="rtl"
                    >
                      تثبيت رحلة المسلم الجديد
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { icon: "⚡", text: "Instant access" },
                    { icon: "📴", text: "Works offline" },
                    { icon: "🔔", text: "Get reminders" },
                    { icon: "✨", text: "Native feel" },
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                    >
                      <span>{benefit.icon}</span>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Not now
                  </button>
                  <button
                    onClick={handleInstall}
                    className="flex-1 px-4 py-3 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Installation Instructions Modal */}
      <AnimatePresence>
        {showIOSInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleDismiss}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Install on iPhone</h3>
                    <p className="text-white/80 text-sm font-arabic" dir="rtl">
                      التثبيت على الآيفون
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Follow these simple steps to add the app to your home screen:
                </p>

                {[
                  {
                    step: 1,
                    icon: <Share className="w-5 h-5" />,
                    text: "Tap the Share button",
                    textAr: "اضغط على زر المشاركة",
                    description: "At the bottom of your browser",
                  },
                  {
                    step: 2,
                    icon: <Plus className="w-5 h-5" />,
                    text: 'Tap "Add to Home Screen"',
                    textAr: 'اضغط "إضافة إلى الشاشة الرئيسية"',
                    description: "Scroll down to find this option",
                  },
                  {
                    step: 3,
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: 'Tap "Add"',
                    textAr: 'اضغط "إضافة"',
                    description: "Confirm to install the app",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {item.step}. {item.text}
                      </div>
                      <p
                        className="text-sm text-slate-500 dark:text-slate-400 font-arabic"
                        dir="rtl"
                      >
                        {item.textAr}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Done button */}
                <button
                  onClick={handleDismiss}
                  className="w-full mt-6 px-4 py-3 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                >
                  Got it!
                </button>
              </div>

              {/* Home indicator line for iOS feel */}
              <div className="pb-2 flex justify-center md:hidden">
                <div className="w-32 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default InstallPrompt;
