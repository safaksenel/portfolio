"use client";

import React from "react";
import { motion } from "motion/react";
import { User, Award, Milestone, Sparkles, CheckCircle2, Terminal, Code2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
          <User className="w-3.5 h-3.5" />
          <span>{lang === "tr" ? "Hakkımda & Deneyim" : "About Me & Experience"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.about.title}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Story & Technical Philosophy */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel bg-white dark:bg-[#0c0d16]/80 border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-500" />
              <span>{t.about.storyTitle}</span>
            </h3>
            
            <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
              <p>{t.about.storyP3}</p>
            </div>

            {/* Core Tech Pills */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
              <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                {lang === "tr" ? "Çekirdek Teknolojiler" : "Core Tech Stack"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {t.about.skillsSummary.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 hover:text-cyan-500 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Engineering Milestones Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel bg-white dark:bg-[#0c0d16]/80 border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              <span>{t.about.highlightsTitle}</span>
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-emerald-500 before:to-indigo-500">
              {t.about.milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-white dark:border-[#090a12] shadow-[0_0_10px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />

                  <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        {m.year}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {m.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
