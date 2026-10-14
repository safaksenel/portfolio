"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { LocalizedProject } from "@/lib/projectsData";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: LocalizedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const title = project.title[lang];
  const shortDesc = project.shortDescription[lang];
  const problem = project.problemStatement[lang];
  const solution = project.solutionArchitecture[lang];

  const categoryLabels: Record<string, { tr: string; en: string; badge: string }> = {
    scraping: {
      tr: "Web Scraping & Bot",
      en: "Web Scraping & Automation",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    backend: {
      tr: "Backend & API",
      en: "Backend & API",
      badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    },
    data: {
      tr: "Veri Bilimi & NLP",
      en: "Data Science & NLP",
      badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    fullstack: {
      tr: "Full-Stack Web",
      en: "Full-Stack Web",
      badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
  };

  const cat = categoryLabels[project.category] || {
    tr: project.category,
    en: project.category,
    badge: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl glass-panel bg-white dark:bg-[#0c0d16]/80 p-6 sm:p-7 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
    >
      <div>
        {/* Category & Links */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-mono font-medium border", cat.badge)}>
            {cat[lang]}
          </span>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-white transition-colors"
                title={t.projects.viewCode}
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 border border-cyan-500/20 transition-colors"
                title={t.projects.viewDemo}
                aria-label="Live Demo Link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors tracking-tight mb-2.5">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-5">
          {shortDesc}
        </p>

        {/* Key Metrics Chips */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{key}</span>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400 truncate">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable Problem & Solution Accordion */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors py-1 cursor-pointer focus:outline-none"
          >
            <span>{expanded ? (lang === "tr" ? "Detayları Gizle" : "Hide Details") : t.projects.architectureSummary}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden flex flex-col gap-3 pt-3 text-xs leading-relaxed"
              >
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t.projects.problem}</span>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400">{problem}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t.projects.solution}</span>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400">{solution}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
