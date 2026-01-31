"use client";

import Link from "next/link";
import { useSettingsStore } from "@/lib/stores";
import { Heart, Github, Twitter } from "lucide-react";

export function Footer() {
  const { language } = useSettingsStore();
  const isArabic = language === "ar";

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                🕌
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {isArabic ? "رحلة المسلم الجديد" : "New Muslim Journey"}
                </h3>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              {isArabic
                ? "تطبيق تفاعلي مجاني لتعلم أساسيات الإسلام بطريقة ممتعة وشيقة للمسلمين الجدد والمهتمين بالتعرف على الإسلام."
                : "A free interactive app to learn the basics of Islam in an engaging and fun way, designed for new Muslims and those curious about the faith."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/journey", label: isArabic ? "الرحلة" : "Journey" },
                {
                  href: "/misconceptions",
                  label: isArabic ? "رد الشبهات" : "Misconceptions",
                },
                { href: "/history", label: isArabic ? "التاريخ" : "History" },
                { href: "/ramadan", label: isArabic ? "رمضان" : "Ramadan" },
                { href: "/games", label: isArabic ? "الألعاب" : "Games" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              {isArabic ? "المصادر" : "Resources"}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: isArabic ? "عن التطبيق" : "About" },
                { href: "/privacy", label: isArabic ? "الخصوصية" : "Privacy" },
                { href: "/terms", label: isArabic ? "الشروط" : "Terms" },
                {
                  href: "/contact",
                  label: isArabic ? "تواصل معنا" : "Contact",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            {isArabic ? "صنع بـ" : "Made with"}{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            {isArabic ? "للأمة الإسلامية" : "for the Ummah"}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} New Muslim Journey
          </p>
        </div>
      </div>
    </footer>
  );
}
