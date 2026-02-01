"use client";

import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  isConfigured: boolean;

  // Actions
  initialize: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: Error | null }>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  isConfigured: isSupabaseConfigured(),

  initialize: async () => {
    if (get().isInitialized) return;

    // Skip if Supabase is not configured
    if (!isSupabaseConfigured()) {
      set({ isLoading: false, isInitialized: true, isConfigured: false });
      return;
    }

    set({ isLoading: true });

    try {
      // Dynamic import to avoid build issues
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      // Get initial session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      set({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isInitialized: true,
        isConfigured: true,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session,
          isLoading: false,
        });
      });
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ isLoading: false, isInitialized: true });
    }
  },

  signInWithGoogle: async () => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase not configured") };
    }

    set({ isLoading: true });

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        set({ isLoading: false });
        return { error };
      }

      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signInWithEmail: async (email, password) => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase not configured") };
    }

    set({ isLoading: true });

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false });
        // Return a cleaner error message
        return { error: new Error(error.message) };
      }

      // Session update will be handled by onAuthStateChange listener
      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signUp: async (email, password, fullName) => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase not configured") };
    }

    set({ isLoading: true });

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        set({ isLoading: false });
        return { error: new Error(error.message) };
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  resendVerificationEmail: async (email) => {
    if (!isSupabaseConfigured()) {
      return { error: new Error("Supabase not configured") };
    }

    set({ isLoading: true });

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      set({ isLoading: false });
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      set({ isLoading: false });
      return { error: error as Error };
    }
  },

  signOut: async () => {
    if (!isSupabaseConfigured()) {
      set({ user: null, session: null });
      return;
    }

    set({ isLoading: true });

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      await supabase.auth.signOut();

      set({
        user: null,
        session: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      set({ user: null, session: null, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, user: session?.user ?? null }),
}));
