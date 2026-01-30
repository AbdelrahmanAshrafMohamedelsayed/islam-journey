import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.newmuslimjourney.app",
  appName: "New Muslim Journey",
  webDir: "out",

  // Server configuration for development
  server: {
    androidScheme: "https",
    // Uncomment for live reload during development
    // url: 'http://localhost:3000',
    // cleartext: true,
  },

  // iOS specific configuration
  ios: {
    backgroundColor: "#fdfbf7",
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "New Muslim Journey",
    webContentsDebuggingEnabled: false,
  },

  // Android specific configuration
  android: {
    backgroundColor: "#fdfbf7",
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },

  // Plugins configuration
  plugins: {
    // Splash screen configuration
    SplashScreen: {
      launchShowDuration: 0, // We control this with our custom splash
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: "#064e3b",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large",
      spinnerColor: "#10b981",
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Status bar configuration
    StatusBar: {
      style: "DARK",
      backgroundColor: "#064e3b",
    },

    // Keyboard configuration
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },

    // Local notifications (for prayer reminders later)
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#10b981",
      sound: "beep.wav",
    },
  },
};

export default config;
