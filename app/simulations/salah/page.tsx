"use client";

import dynamic from "next/dynamic";

// Dynamic import for heavy simulation component - reduces initial bundle
const SalahSimulation = dynamic(
  () =>
    import("@/components/simulation/SalahSimulation").then(
      (mod) => mod.SalahSimulation,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-200 dark:bg-emerald-800" />
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            Loading Salah Simulation...
          </p>
        </div>
      </div>
    ),
  },
);

export default function SalahSimulationPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <SalahSimulation chapterId="salah" />
    </div>
  );
}
