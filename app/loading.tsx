export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Mosque Icon */}
        <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <span className="text-4xl">🕌</span>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Loading...
        </h2>
        <p className="text-slate-500 dark:text-slate-500 mb-4 font-arabic">
          جارٍ التحميل...
        </p>

        {/* Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full w-1/3 animate-pulse" />
        </div>

        {/* Inspirational Text */}
        <p className="mt-6 text-sm text-slate-400 dark:text-slate-600 italic">
          &ldquo;Patience is the key to relief.&rdquo;
        </p>
      </div>
    </div>
  );
}
