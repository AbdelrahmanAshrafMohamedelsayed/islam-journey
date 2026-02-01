-- Islam Journey Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- USER PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Settings
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'ar')),
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system', 'mosque')),
  font_size TEXT DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  audio_enabled BOOLEAN DEFAULT true,
  animations_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  learning_mode TEXT DEFAULT 'journey' CHECK (learning_mode IN ('journey', 'modules')),
  has_completed_onboarding BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- USER PROGRESS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Progress data
  current_chapter TEXT DEFAULT 'shahada',
  completed_lessons TEXT[] DEFAULT '{}',
  completed_chapters TEXT[] DEFAULT '{}',
  current_lesson TEXT,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one progress record per user
  UNIQUE(user_id)
);

-- ==========================================
-- USER ACHIEVEMENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Achievements data
  unlocked_achievements TEXT[] DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one achievements record per user
  UNIQUE(user_id)
);

-- ==========================================
-- GAME STATS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS game_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Game statistics
  games_played INTEGER DEFAULT 0,
  high_score_trivia INTEGER DEFAULT 0,
  high_score_memory INTEGER DEFAULT 0,
  high_score_word_scramble INTEGER DEFAULT 0,
  perfect_rounds INTEGER DEFAULT 0,
  total_game_xp INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one stats record per user
  UNIQUE(user_id)
);

-- ==========================================
-- RAMADAN/FASTING LOGS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS fasting_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Fasting data
  is_tracking BOOLEAN DEFAULT false,
  current_fasting_day DATE,
  completed_days DATE[] DEFAULT '{}',
  suhoor_times JSONB DEFAULT '{}',
  iftar_times JSONB DEFAULT '{}',
  mood_logs JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one fasting log per user
  UNIQUE(user_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Progress policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own achievements" ON user_achievements
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Game stats policies
CREATE POLICY "Users can view own game stats" ON game_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own game stats" ON game_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game stats" ON game_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Fasting logs policies
CREATE POLICY "Users can view own fasting logs" ON fasting_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own fasting logs" ON fasting_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own fasting logs" ON fasting_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- FUNCTIONS & TRIGGERS
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_achievements_updated_at
  BEFORE UPDATE ON user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_stats_updated_at
  BEFORE UPDATE ON game_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fasting_logs_updated_at
  BEFORE UPDATE ON fasting_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- FUNCTION: Handle new user signup
-- ==========================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Create empty progress record
  INSERT INTO user_progress (user_id) VALUES (NEW.id);
  
  -- Create empty achievements record
  INSERT INTO user_achievements (user_id) VALUES (NEW.id);
  
  -- Create empty game stats record
  INSERT INTO game_stats (user_id) VALUES (NEW.id);
  
  -- Create empty fasting logs record
  INSERT INTO fasting_logs (user_id) VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions;

-- Trigger to auto-create user data on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_game_stats_user_id ON game_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_logs_user_id ON fasting_logs(user_id);
