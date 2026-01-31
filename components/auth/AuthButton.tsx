"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth";
import { useSupabaseSync } from "@/lib/hooks/useSupabaseSync";
import { useSettingsStore } from "@/lib/stores";
import {
  LogIn,
  LogOut,
  User,
  Cloud,
  CloudOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import Image from "next/image";

interface AuthButtonProps {
  variant?: "full" | "compact" | "icon";
  className?: string;
}

export function AuthButton({
  variant = "full",
  className = "",
}: AuthButtonProps) {
  const { user, isLoading, initialize, signInWithGoogle, signOut } =
    useAuthStore();
  const { isSyncing, lastSyncedAt, error, pushToSupabase } = useSupabaseSync();
  const { language } = useSettingsStore();
  const isArabic = language === "ar";

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    // Push local data before signing out
    await pushToSupabase();
    await signOut();
    setShowDropdown(false);
  };

  const handleSync = async () => {
    await pushToSupabase();
  };

  // Loading state
  if (isLoading && !user) {
    return (
      <div
        className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-full ${
          variant === "icon" ? "w-10 h-10" : "w-32 h-10"
        } ${className}`}
      />
    );
  }

  // Not logged in
  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          bg-white dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700
          hover:bg-slate-50 dark:hover:bg-slate-700
          transition-all duration-200
          text-slate-700 dark:text-slate-200
          shadow-sm hover:shadow-md
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {variant !== "icon" && (
          <span className="font-medium">
            {isArabic ? "تسجيل الدخول" : "Sign in"}
          </span>
        )}
      </button>
    );
  }

  // Logged in - show user avatar with dropdown
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {user.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full border-2 border-emerald-500"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
            {user.email?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        {variant === "full" && (
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
            {user.user_metadata?.full_name || user.email?.split("@")[0]}
          </span>
        )}

        {/* Sync indicator */}
        {isSyncing ? (
          <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
        ) : error ? (
          <CloudOff className="w-4 h-4 text-red-500" />
        ) : (
          <Cloud className="w-4 h-4 text-emerald-500" />
        )}
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className={`
                absolute top-full mt-2 z-50
                ${isArabic ? "left-0" : "right-0"}
                w-72 bg-white dark:bg-slate-800 
                rounded-xl shadow-xl border border-slate-200 dark:border-slate-700
                overflow-hidden
              `}
            >
              {/* User info header */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sync status */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {isArabic ? "جاري المزامنة..." : "Syncing..."}
                        </span>
                      </>
                    ) : error ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {isArabic ? "فشل المزامنة" : "Sync failed"}
                        </span>
                      </>
                    ) : lastSyncedAt ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {isArabic ? "تم المزامنة" : "Synced"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {isArabic ? "السحابة" : "Cloud backup"}
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-4 h-4 text-slate-600 dark:text-slate-400 ${
                        isSyncing ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="p-2">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isArabic ? "تسجيل الخروج" : "Sign out"}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact version for mobile navbar
export function AuthButtonCompact() {
  return <AuthButton variant="compact" />;
}

// Icon only version
export function AuthButtonIcon() {
  return <AuthButton variant="icon" />;
}
