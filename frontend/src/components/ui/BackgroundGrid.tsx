"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

export default function BackgroundGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Base with smooth color transition */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#060609] transition-colors duration-300" />

      {/* Aurora Mesh Glow Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: isDark ? [0.15, 0.25, 0.15] : [0.08, 0.14, 0.08],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/25 via-cyan-500/15 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: isDark ? [0.12, 0.22, 0.12] : [0.07, 0.12, 0.07],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 -right-40 w-[650px] h-[650px] bg-gradient-to-bl from-indigo-500/25 via-purple-500/15 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: isDark ? [0.08, 0.18, 0.08] : [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-gradient-to-t from-cyan-500/20 via-emerald-500/15 to-transparent rounded-full blur-3xl"
      />

      {/* Precision Dot Grid with Radial Mask */}
      <div 
        className="absolute inset-0 dot-grid opacity-35 dark:opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)"
        }}
      />
    </div>
  );
}
