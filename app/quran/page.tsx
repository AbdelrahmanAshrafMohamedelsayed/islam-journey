"use client";

import Link from "next/link";
import { Book, ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function QuranPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <Construction className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Coming Soon
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The Quran reader feature is currently under development. 
          In the meantime, explore our learning journey to discover the beauty of Islam!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/journey">
            <Button variant="primary" className="w-full sm:w-auto">
              <Book className="w-5 h-5 mr-2" />
              Start Learning Journey
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
