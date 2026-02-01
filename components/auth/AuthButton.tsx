"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/stores/auth";
import { useSupabaseSync } from "@/lib/hooks/useSupabaseSync";
import { useSettingsStore } from "@/lib/stores";
import {
  LogIn,
  LogOut,
  Cloud,
  CloudOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { AuthModal } from "./AuthModal";

interface AuthButtonProps {
  variant?: "full" | "compact" | "icon";
  className?: string;
}

export function AuthButton({
  variant = "full",
  className = "",
}: AuthButtonProps) {
  const { user, isLoading, initialize, signOut } = useAuthStore();
  const { isSyncing, lastSyncedAt, error, pushToSupabase } = useSupabaseSync();
  const { language } = useSettingsStore();
  const isArabic = language === "ar";

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSignIn = () => {
    setShowAuthModal(true);
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
      <>
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
          <LogIn className="w-5 h-5 text-emerald-500" />
          {variant !== "icon" && (
            <span className="font-medium">
              {isArabic ? "تسجيل الدخول" : "Sign in"}
            </span>
          )}
        </button>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
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
