"use client";

import dynamic from "next/dynamic";

// Dynamic import for heavy simulation component - reduces initial bundle
const WuduSimulation = dynamic(
  () =>
    import("@/components/simulation/WuduSimulation").then(
      (mod) => mod.WuduSimulation,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-200 dark:bg-blue-800" />
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            Loading Wudu Simulation...
          </p>
        </div>
      </div>
    ),
  },
);

export default function WuduSimulationPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <WuduSimulation chapterId="salah" />
    </div>
  );
}
