"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Trophy,
} from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning" | "achievement";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  icon?: React.ReactNode;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

// Simple store for toasts
let toastListeners: Set<() => void> = new Set();
let toasts: Toast[] = [];

function notify() {
  toastListeners.forEach((listener) => listener());
}

export const toast = {
  success: (title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    toasts = [
      ...toasts,
      { id, type: "success", title, message, duration: 4000 },
    ];
    notify();
  },
  error: (title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    toasts = [...toasts, { id, type: "error", title, message, duration: 5000 }];
    notify();
  },
  info: (title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    toasts = [...toasts, { id, type: "info", title, message, duration: 4000 }];
    notify();
  },
  warning: (title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    toasts = [
      ...toasts,
      { id, type: "warning", title, message, duration: 4500 },
    ];
    notify();
  },
  achievement: (title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    toasts = [
      ...toasts,
      { id, type: "achievement", title, message, duration: 6000 },
    ];
    notify();
  },
  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};

const toastStyles: Record<
  ToastType,
  { bg: string; icon: React.ReactNode; iconBg: string }
> = {
  success: {
    bg: "bg-white dark:bg-slate-800 border-green-500",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  error: {
    bg: "bg-white dark:bg-slate-800 border-red-500",
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
  info: {
    bg: "bg-white dark:bg-slate-800 border-blue-500",
    icon: <Info className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  warning: {
    bg: "bg-white dark:bg-slate-800 border-amber-500",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
  achievement: {
    bg: "bg-linear-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-amber-400",
    icon: <Trophy className="w-5 h-5 text-amber-500" />,
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
  },
};

function ToastItem({
  toast: t,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const style = toastStyles[t.type];

  useEffect(() => {
    if (t.duration) {
      const timer = setTimeout(onClose, t.duration);
      return () => clearTimeout(timer);
    }
  }, [t.duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg max-w-sm w-full",
        style.bg,
      )}
    >
      <div className={cn("shrink-0 p-1.5 rounded-lg", style.iconBg)}>
        {t.icon || style.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 dark:text-white">
          {t.title}
        </p>
        {t.message && (
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
            {t.message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = () => {
      setCurrentToasts([...toasts]);
    };
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {currentToasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => toast.remove(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
