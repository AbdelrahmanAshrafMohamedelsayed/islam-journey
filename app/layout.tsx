import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Navbar, Footer } from "@/components/layout";
import { ToastContainer } from "@/components/ui";
import { InstallPrompt, SplashScreen } from "@/components/pwa";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "New Muslim Journey | Learn Islam Interactively",
    template: "%s | New Muslim Journey",
  },
  description:
    "An interactive, gamified journey to learn Islam. Perfect for new Muslims and those curious about the faith. Learn prayer, Quran, and more.",
  keywords: [
    "Islam",
    "New Muslim",
    "Learn Islam",
    "Prayer",
    "Salah",
    "Quran",
    "Islamic Education",
    "Muslim Journey",
  ],
  authors: [{ name: "New Muslim Journey" }],
  creator: "New Muslim Journey",
  metadataBase: new URL("https://newmuslimjourney.com"),
  applicationName: "New Muslim Journey",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Muslim Journey",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    url: "https://newmuslimjourney.com",
    siteName: "New Muslim Journey",
    title: "New Muslim Journey | Learn Islam Interactively",
    description:
      "An interactive, gamified journey to learn Islam. Perfect for new Muslims and those curious about the faith.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "New Muslim Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Muslim Journey | Learn Islam Interactively",
    description: "An interactive, gamified journey to learn Islam.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1929" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
            <ToastContainer />
            <InstallPrompt />
            <SplashScreen />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
