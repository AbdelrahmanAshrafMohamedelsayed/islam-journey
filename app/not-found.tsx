import { Metadata } from "next";
import Link from "next/link";
import { Home, Search, Map } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found | Muslim Journey",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-6">🔍</div>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          الصفحة غير موجودة
        </p>
        <p className="text-slate-500 dark:text-slate-500 mb-8">
          The path you seek leads elsewhere. Let us guide you back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link href="/journey">
            <Button variant="outline" leftIcon={<Map className="w-4 h-4" />}>
              Start Journey
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
          <p className="text-emerald-700 dark:text-emerald-400 font-medium mb-2">
            &ldquo;Verily, with hardship comes ease.&rdquo;
          </p>
          <p className="text-emerald-600 dark:text-emerald-500 text-sm font-arabic">
            إِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>
          <p className="text-emerald-500 dark:text-emerald-600 text-xs mt-2">
            — Quran 94:6
          </p>
        </div>
      </div>
    </div>
  );
}
