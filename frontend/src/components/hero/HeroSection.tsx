"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Terminal, Sparkles, CheckCircle2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, KaggleIcon } from "@/components/ui/BrandIcons";
import InteractiveTerminal from "./InteractiveTerminal";
import MagneticButton from "../ui/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Personal Intro, Headline, Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6 z-10"
        >
          {/* Availability Badge & Stack Pill */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>{t.nav.status}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>PyTorch • Scikit-learn • BERT NLP • DuckDB OLAP</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {lang === "tr" ? (
                <>
                  Veriyi Değere Dönüştüren,{" "}
                  <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                    Yapay Zeka & ML
                  </span>{" "}
                  Mimarileri
                </>
              ) : (
                <>
                  Engineering Scalable{" "}
                  <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                    Data Science & AI
                  </span>{" "}
                  Pipelines
                </>
              )}
            </h1>
            <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal mt-2">
              {t.hero.greeting} <span className="text-slate-900 dark:text-zinc-100 font-bold">{t.hero.name}</span>. {t.hero.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <MagneticButton strength={0.3}>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-cyan-400 to-indigo-500 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{t.hero.exploreProjects}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300/80 dark:border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <span>{t.hero.contactMe}</span>
              </a>
            </MagneticButton>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href="https://github.com/safaksenel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 hover:text-cyan-500 border border-slate-200 dark:border-white/10 transition-colors"
                title="GitHub: safaksenel"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/%C5%9Fafak-%C5%9Fenel-70a633319/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 hover:text-cyan-500 border border-slate-200 dark:border-white/10 transition-colors"
                title="LinkedIn: Şafak Şenel"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.kaggle.com/afakenel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 hover:text-cyan-500 border border-slate-200 dark:border-white/10 transition-colors"
                title="Kaggle: afakenel"
              >
                <KaggleIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:safaksenel61@gmail.com"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 hover:text-emerald-500 border border-slate-200 dark:border-white/10 transition-colors"
                title="E-Mail: safaksenel61@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Verified Stats Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
                {t.hero.stats.records}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-tight">
                {t.hero.stats.recordsLabel}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {t.hero.stats.reduction}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-tight">
                {t.hero.stats.reductionLabel}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {t.hero.stats.bypass}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-tight">
                {t.hero.stats.bypassLabel}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live Python 3.14 Scraper Terminal Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full flex justify-center"
        >
          <InteractiveTerminal />
        </motion.div>
      </div>
    </section>
  );
}
