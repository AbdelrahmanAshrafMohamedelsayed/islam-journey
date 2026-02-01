"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/Toast";
import { useAuthStore } from "@/lib/stores/auth";
import { useSettingsStore } from "@/lib/stores";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const { signInWithEmail, signUp, resendVerificationEmail } = useAuthStore();
  const { language } = useSettingsStore();
  const isArabic = language === "ar";

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to prevent flashing content while closing animation runs
      const timer = setTimeout(() => {
        setVerificationSent(false);
        setError(null);
        setLoading(false);
        setEmail("");
        setPassword("");
        setFullName("");
        setIsSignUp(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error(
            isArabic ? "الاسم الكامل مطلوب" : "Full name is required",
          );
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        setVerificationSent(true);
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        toast.success(
          isArabic ? "تم تسجيل الدخول بنجاح!" : "Signed in successfully!",
          isArabic ? "مرحباً بعودتك" : "Welcome back",
        );
        onClose();
      }
    } catch (err: any) {
      const msg =
        err.message || (isArabic ? "حدث خطأ ما" : "Something went wrong");

      // Handle "Email not confirmed" specifically
      if (
        msg.toLowerCase().includes("email not confirmed") ||
        msg.toLowerCase().includes("confirm your email")
      ) {
        setVerificationSent(true);
        // Show the verification screen again instead of just an error
        return;
      }

      setError(msg);
      toast.error(isArabic ? "خطأ" : "Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const { error } = await resendVerificationEmail(email);
      if (error) throw error;
      toast.success(
        isArabic ? "تم إرسال البريد" : "Email sent",
        isArabic
          ? "يرجى التحقق من مجلد الرسائل غير المرغوب فيها"
          : "Please check your spam folder",
      );
    } catch (err: any) {
      toast.error(isArabic ? "خطأ" : "Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative border border-slate-200 dark:border-slate-700"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {isSignUp
                      ? isArabic
                        ? "إنشاء حساب جديد"
                        : "Create Account"
                      : isArabic
                        ? "تسجيل الدخول"
                        : "Welcome Back"}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    {isSignUp
                      ? isArabic
                        ? "ابدأ رحلتك الإيمانية اليوم"
                        : "Start your spiritual journey today"
                      : isArabic
                        ? "تابع تقدمك وإنجازاتك"
                        : "Continue your progress and achievements"}
                  </p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <AnimatePresence mode="wait">
                  {verificationSent ? (
                    <motion.div
                      key="verification"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {isArabic
                          ? "تحقق من بريدك الإلكتروني"
                          : "Check your email"}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {isArabic
                          ? `لقد أرسلنا رابط التحقق إلى ${email}`
                          : `We've sent a verification link to ${email}`}
                      </p>

                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setVerificationSent(false);
                            setIsSignUp(false);
                          }}
                          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all"
                        >
                          {isArabic
                            ? "تم التحقق، تسجيل الدخول"
                            : "Verified, Sign In"}
                        </button>

                        <button
                          onClick={handleResend}
                          disabled={loading}
                          className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all disabled:opacity-50"
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                          ) : isArabic ? (
                            "إعادة إرسال البريد الإلكتروني"
                          ) : (
                            "Resend Verification Email"
                          )}
                        </button>
                      </div>

                      <button
                        onClick={onClose}
                        className="mt-6 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        {isArabic ? "إغلاق" : "Close"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                              {isArabic ? "الاسم الكامل" : "Full Name"}
                            </label>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white"
                                placeholder={
                                  isArabic ? "محمد أحمد" : "John Doe"
                                }
                                required={isSignUp}
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            {isArabic ? "البريد الإلكتروني" : "Email Address"}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white"
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                            {isArabic ? "كلمة المرور" : "Password"}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white"
                              placeholder="••••••••"
                              required
                              minLength={6}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                        >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : isSignUp ? (
                            isArabic ? (
                              "إنشاء الحساب"
                            ) : (
                              "Create Account"
                            )
                          ) : isArabic ? (
                            "تسجيل الدخول"
                          ) : (
                            "Sign In"
                          )}
                        </button>
                      </form>

                      {/* Toggle Mode */}
                      <div className="mt-6 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          {isSignUp
                            ? isArabic
                              ? "لديك حساب بالفعل؟"
                              : "Already have an account?"
                            : isArabic
                              ? "ليس لديك حساب؟"
                              : "Don't have an account?"}{" "}
                          <button
                            onClick={() => {
                              setIsSignUp(!isSignUp);
                              setError(null);
                            }}
                            className="text-emerald-500 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          >
                            {isSignUp
                              ? isArabic
                                ? "تسجيل الدخول"
                                : "Sign In"
                              : isArabic
                                ? "إنشاء حساب"
                                : "Sign Up"}
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
