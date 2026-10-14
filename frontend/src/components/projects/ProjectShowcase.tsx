"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderGit2 } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { localizedProjects, LocalizedProject } from "@/lib/projectsData";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectShowcase() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: t.projects.filterAll },
    { id: "data", label: t.projects.filterData },
    { id: "backend", label: t.projects.filterBackend },
    { id: "scraping", label: t.projects.filterScraping },
    { id: "fullstack", label: t.projects.filterFullstack },
  ];

  const filteredProjects = localizedProjects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-medium mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>{lang === "tr" ? "Mühendislik Projeleri" : "Engineering Projects"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.projects.title}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {t.projects.subtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer",
                isActive
                  ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/40 shadow-sm"
                  : "bg-white dark:bg-[#0b0c15] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border-slate-200 dark:border-white/5"
              )}
            >
              <span>{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 rounded-xl border border-cyan-500/60 pointer-events-none"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
