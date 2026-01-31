"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="w-24 h-24 bg-linear-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <AlertTriangle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          حدث خطأ غير متوقع
        </p>
        <p className="text-slate-500 dark:text-slate-500 mb-8">
          Don&apos;t worry, you can try again or return home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left">
          <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
            Error details:
          </p>
          <code className="text-xs text-red-600 dark:text-red-400 break-all">
            {error.message || "An unexpected error occurred"}
          </code>
        </div>
      </motion.div>
    </div>
  );
}
