// Supabase Database Types
// Auto-generated based on schema.sql

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          language: "en" | "ar";
          theme: "light" | "dark" | "system" | "mosque";
          font_size: "small" | "medium" | "large";
          audio_enabled: boolean;
          animations_enabled: boolean;
          notifications_enabled: boolean;
          learning_mode: "journey" | "modules";
          has_completed_onboarding: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          language?: "en" | "ar";
          theme?: "light" | "dark" | "system" | "mosque";
          font_size?: "small" | "medium" | "large";
          audio_enabled?: boolean;
          animations_enabled?: boolean;
          notifications_enabled?: boolean;
          learning_mode?: "journey" | "modules";
          has_completed_onboarding?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          language?: "en" | "ar";
          theme?: "light" | "dark" | "system" | "mosque";
          font_size?: "small" | "medium" | "large";
          audio_enabled?: boolean;
          animations_enabled?: boolean;
          notifications_enabled?: boolean;
          learning_mode?: "journey" | "modules";
          has_completed_onboarding?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          current_chapter: string;
          completed_lessons: string[];
          completed_chapters: string[];
          current_lesson: string | null;
          total_xp: number;
          level: number;
          streak_days: number;
          last_activity_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_chapter?: string;
          completed_lessons?: string[];
          completed_chapters?: string[];
          current_lesson?: string | null;
          total_xp?: number;
          level?: number;
          streak_days?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_chapter?: string;
          completed_lessons?: string[];
          completed_chapters?: string[];
          current_lesson?: string | null;
          total_xp?: number;
          level?: number;
          streak_days?: number;
          last_activity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          unlocked_achievements: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          unlocked_achievements?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          unlocked_achievements?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      game_stats: {
        Row: {
          id: string;
          user_id: string;
          games_played: number;
          high_score_trivia: number;
          high_score_memory: number;
          high_score_word_scramble: number;
          perfect_rounds: number;
          total_game_xp: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          games_played?: number;
          high_score_trivia?: number;
          high_score_memory?: number;
          high_score_word_scramble?: number;
          perfect_rounds?: number;
          total_game_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          games_played?: number;
          high_score_trivia?: number;
          high_score_memory?: number;
          high_score_word_scramble?: number;
          perfect_rounds?: number;
          total_game_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      fasting_logs: {
        Row: {
          id: string;
          user_id: string;
          is_tracking: boolean;
          current_fasting_day: string | null;
          completed_days: string[];
          suhoor_times: Json;
          iftar_times: Json;
          mood_logs: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          is_tracking?: boolean;
          current_fasting_day?: string | null;
          completed_days?: string[];
          suhoor_times?: Json;
          iftar_times?: Json;
          mood_logs?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          is_tracking?: boolean;
          current_fasting_day?: string | null;
          completed_days?: string[];
          suhoor_times?: Json;
          iftar_times?: Json;
          mood_logs?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
