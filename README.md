# 🕌 New Muslim Journey

An interactive Islamic learning game app designed for new Muslims and people curious about Islam. Available as both a Progressive Web App (PWA) and native mobile app.

<div align="center">

![New Muslim Journey](public/icons/icon-192x192.png)

**بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم**

*In the name of Allah, the Most Gracious, the Most Merciful*

</div>

## ✨ Features

### 📚 7-Chapter Learning Journey
- **Shahada** - Declaration of Faith
- **Salah** - Daily Prayers
- **Wudu** - Purification
- **Zakat** - Charity
- **Sawm** - Fasting
- **Hajj** - Pilgrimage
- **Community** - Islamic Brotherhood

### 🎮 Interactive Simulations
- **Wudu Trainer** - Step-by-step ablution guide
- **Salah Guide** - Learn prayer positions and recitations
- **Quran Recitations** - Listen to beautiful Quran audio

### 🌍 Bilingual Support
- Full English/Arabic translations
- RTL (Right-to-Left) layout support
- Authentic Islamic terminology

### 🏆 Gamification
- XP & Level progression
- Achievement badges
- Daily streaks
- Progress tracking

### 📱 Cross-Platform
- **PWA**: Install on any device from the browser
- **iOS/Android**: Native apps via Capacitor.js
- Offline support with service workers
- Beautiful Islamic-themed UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/islam-journey.git
cd islam-journey

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

### Building Mobile Apps (Capacitor)

```bash
# Build for mobile
npm run build:mobile

# Add iOS platform (requires macOS with Xcode)
npm run ios

# Add Android platform (requires Android Studio)
npm run android

# Sync changes to native projects
npm run cap:sync
```

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **UI**: React 19, Tailwind CSS v4
- **Animations**: Framer Motion 12
- **State Management**: Zustand 5
- **PWA**: Serwist (Service Worker)
- **Mobile**: Capacitor.js
- **i18n**: next-intl 4.8.1
- **Backend**: Supabase (Auth, Database, Storage)

## 📁 Project Structure

```
islam-journey/
├── app/                    # Next.js App Router pages
│   ├── journey/           # Journey chapters
│   ├── sw.ts              # Service worker
│   └── manifest.ts        # PWA manifest
├── components/            # React components
│   ├── layout/           # Navbar, Footer
│   ├── pwa/              # SplashScreen, InstallPrompt
│   └── ui/               # Button, Card, Progress, etc.
├── lib/                   # Utilities and helpers
├── stores/               # Zustand state stores
├── messages/             # i18n translations (en.json, ar.json)
├── public/               # Static assets
│   └── icons/            # App icons (SVG & PNG)
└── capacitor.config.ts   # Capacitor configuration
```

## 🎨 Design Philosophy

- **Islamic Aesthetics**: Emerald/gold color palette inspired by Islamic architecture
- **Arabesque Patterns**: Subtle geometric patterns
- **Mosque Silhouettes**: Visual identity elements
- **Premium Animations**: Smooth Framer Motion transitions
- **Accessibility**: Touch-friendly targets, reduced motion support

## 🌙 PWA Features

- **Installable**: Add to home screen on any device
- **Offline Ready**: Core content available offline
- **Push Notifications**: (Coming soon)
- **Background Sync**: Syncs progress when online

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Web (PWA) | ✅ Ready | All modern browsers |
| iOS | 🔧 Ready | Requires Xcode build |
| Android | 🔧 Ready | Requires Android Studio |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Quran API providers
- Islamic calligraphy artists
- The Muslim developer community

---

<div align="center">

**May Allah guide us all on the straight path** 🤲

</div>
