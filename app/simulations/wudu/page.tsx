"use client";

import { WuduSimulation } from "@/components/simulation";
import { motion } from "framer-motion";

export default function WuduSimulationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800"
    >
      <WuduSimulation chapterId="salah" />
    </motion.div>
  );
}
