"use client";

import { SalahSimulation } from "@/components/simulation";
import { motion } from "framer-motion";

export default function SalahSimulationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
    >
      <SalahSimulation />
    </motion.div>
  );
}
