// ==========================================
// ISLAMIC DESIGN SYSTEM - THEME CONFIGURATION
// ==========================================

export const islamicTheme = {
  colors: {
    // Primary - Mosque Serenity (Emerald & Gold)
    primary: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981", // Main emerald
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22",
    },

    // Secondary - Royal Gold
    gold: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308", // Main gold
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006",
    },

    // Accent - Arabian Night (Deep Blue)
    accent: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#0a1929", // Deep night
    },

    // Semantic colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Light theme
  light: {
    background: {
      primary: "#fdfbf7", // Warm parchment
      secondary: "#f5f0e8", // Soft cream
      tertiary: "#ffffff", // Pure white
      card: "#ffffff",
    },
    text: {
      primary: "#1a1a2e", // Deep charcoal
      secondary: "#4a5568", // Muted gray
      tertiary: "#718096", // Light gray
      inverse: "#ffffff",
    },
    border: {
      light: "#e8e0d4",
      medium: "#d4c9b8",
      dark: "#b8a890",
    },
  },

  // Dark theme
  dark: {
    background: {
      primary: "#0a1929", // Deep midnight
      secondary: "#132f4c", // Navy
      tertiary: "#1e3a5f", // Lighter navy
      card: "#173a5e",
    },
    text: {
      primary: "#f5f5f5", // Off-white
      secondary: "#b0bec5", // Muted
      tertiary: "#78909c", // Dimmed
      inverse: "#0a1929",
    },
    border: {
      light: "#1e3a5f",
      medium: "#2d4a6f",
      dark: "#3d5a80",
    },
  },

  // Mosque Mode - Dim warm lantern light for prayers
  mosque: {
    background: {
      primary: "#1a1510", // Very dark warm brown
      secondary: "#241d15", // Slightly lighter
      tertiary: "#2e251a", // Card backgrounds
      card: "#2a2118",
    },
    text: {
      primary: "#e8dcc8", // Warm cream
      secondary: "#b8a890", // Muted warm
      tertiary: "#8a7a68", // Dimmed warm
      inverse: "#1a1510",
    },
    border: {
      light: "#3d3225",
      medium: "#4d4035",
      dark: "#5d5045",
    },
    accent: {
      glow: "rgba(251, 191, 36, 0.15)", // Soft golden glow
      lantern: "#fbbf24", // Lantern yellow
    },
  },

  // Typography
  fonts: {
    arabic: '"Amiri", "Noto Naskh Arabic", serif',
    english: '"Inter", "Geist", system-ui, sans-serif',
    display: '"Playfair Display", serif',
    mono: '"Geist Mono", "Fira Code", monospace',
  },

  // Spacing scale
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // Border radius
  radius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    glow: "0 0 20px rgba(16, 185, 129, 0.3)", // Emerald glow
    goldGlow: "0 0 20px rgba(234, 179, 8, 0.3)", // Gold glow
  },

  // Animation
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

// Chapter colors for journey map
export const chapterColors: Record<
  string,
  { bg: string; text: string; accent: string }
> = {
  shahada: {
    bg: "from-emerald-500 to-emerald-700",
    text: "text-emerald-500",
    accent: "#10b981",
  },
  wudu: {
    bg: "from-cyan-500 to-cyan-700",
    text: "text-cyan-500",
    accent: "#06b6d4",
  },
  salah: {
    bg: "from-blue-500 to-blue-700",
    text: "text-blue-500",
    accent: "#3b82f6",
  },
  quran: {
    bg: "from-purple-500 to-purple-700",
    text: "text-purple-500",
    accent: "#8b5cf6",
  },
  sawm: {
    bg: "from-amber-500 to-amber-700",
    text: "text-amber-500",
    accent: "#f59e0b",
  },
  zakat: {
    bg: "from-green-500 to-green-700",
    text: "text-green-500",
    accent: "#22c55e",
  },
  hajj: {
    bg: "from-rose-500 to-rose-700",
    text: "text-rose-500",
    accent: "#f43f5e",
  },
};

// Geometric pattern SVGs
export const patterns = {
  arabesque: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,

  stars: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.05'%3E%3Cpath d='M40 0l5 15h15l-12.5 9.5L52.5 40 40 30.5 27.5 40l5-15.5L20 15h15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,

  geometric: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Cpath fill-rule='evenodd' d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
};

export default islamicTheme;
