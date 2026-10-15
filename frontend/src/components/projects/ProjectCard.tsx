"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const title = project.title[lang];
  const shortDesc = project.shortDescription[lang];
  const problem = project.problemStatement[lang];
  const solution = project.solutionArchitecture[lang];

  const images =
    project.images && project.images.length > 0
      ? project.images
      : project.thumbnailUrl
      ? [project.thumbnailUrl]
      : [];

  const currentImage = images[activeImageIndex] || project.thumbnailUrl;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="group rounded-2xl glass-panel bg-white dark:bg-[#0c0d16]/80 p-6 sm:p-7 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
      >
        <div>
          {/* Project Screenshot Banner / Interactive Multi-Image Gallery */}
          {currentImage && (
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative aspect-[16/9] w-full mb-4.5 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-950 group/img cursor-zoom-in select-none"
              title={lang === "tr" ? "Büyütmek için tıklayın" : "Click to view full image"}
            >
              <Image
                src={currentImage}
                alt={`${title} - screenshot ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity pointer-events-none" />

              {/* Multi-Image Navigation Controls (Only if > 1 image) */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-80 sm:opacity-0 group-hover/img:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer z-10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-80 sm:opacity-0 group-hover/img:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer z-10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer",
                          idx === activeImageIndex
                            ? "w-4 bg-cyan-400"
                            : "bg-white/40 hover:bg-white/80"
                        )}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Zoom Pill on hover */}
              <div className="absolute top-2.5 left-2.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono text-zinc-200 bg-black/70 backdrop-blur-md border border-white/15">
                  <Maximize2 className="w-3 h-3 text-cyan-400" />
                  <span>{lang === "tr" ? "Büyüt" : "Zoom"}</span>
                </span>
              </div>

              {/* Floating Badges */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium backdrop-blur-md border shadow-sm",
                      cat.badge
                    )}
                  >
                    {cat[lang]}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md border border-white/10">
                    {lang === "tr" ? "Gerçek Ekran Görüntüsü" : "Live Screenshot"}
                  </span>
                </div>

                {images.length > 1 && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold text-cyan-300 bg-black/75 backdrop-blur-md border border-cyan-500/30">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>
                      {activeImageIndex + 1} / {images.length}
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Header Row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            {!currentImage && (
              <span className={cn("px-3 py-1 rounded-full text-xs font-mono font-medium border", cat.badge)}>
                {cat[lang]}
              </span>
            )}
            <div className="flex items-center gap-2 ml-auto">
              {!project.githubUrl && !project.liveUrl && (
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {lang === "tr" ? "Kurumsal Çözüm (NDA)" : "Enterprise Solution (NDA)"}
                </span>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-500 dark:hover:text-white transition-colors"
                  title={t.projects.viewCode}
                  aria-label={`${title} - ${t.projects.viewCode}`}
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {Boolean(project.liveUrl) && project.liveUrl !== project.githubUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 border border-cyan-500/20 transition-colors"
                  title={t.projects.viewDemo}
                  aria-label={`${title} - ${t.projects.viewDemo}`}
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
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls={`project-details-${project.id}`}
              className="w-full flex items-center justify-between text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors py-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
            >
              <span>{expanded ? (lang === "tr" ? "Detayları Gizle" : "Hide Details") : t.projects.architectureSummary}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  id={`project-details-${project.id}`}
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

      {/* High-Resolution Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl flex items-center justify-between gap-4 py-2 text-white border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className={cn("px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border", cat.badge)}>
                  {cat[lang]}
                </span>
                <h4 className="text-sm sm:text-base font-bold truncate max-w-md sm:max-w-xl text-zinc-100">
                  {title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                {images.length > 1 && (
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    {activeImageIndex + 1} / {images.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Center Stage */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden"
            >
              <motion.img
                key={currentImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                src={currentImage}
                alt={title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Prev / Next Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Image"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 shadow-2xl cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Image"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-cyan-500 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-200 hover:scale-110 shadow-2xl cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2.5 max-w-full overflow-x-auto py-2 px-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10"
              >
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0",
                      idx === activeImageIndex
                        ? "border-cyan-400 scale-105 shadow-md"
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/50"
                    )}
                  >
                    <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
