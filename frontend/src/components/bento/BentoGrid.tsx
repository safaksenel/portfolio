"use client";

import React from "react";
import { Bot, Cpu, BarChart3, Globe, ShieldAlert, Zap, Layers } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { useLanguage } from "@/context/LanguageContext";

export default function BentoGrid() {
  const { lang, t } = useLanguage();

  return (
    <section id="expertise" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-medium mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>{lang === "tr" ? "Uzmanlık & Teknoloji Mimarisi" : "Technical Expertise & Architecture"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.bento.title}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {t.bento.subtitle}
        </p>
      </div>

      {/* Asymmetric Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-5">
        
        {/* BOX 1: Web Scraping & Bot Automation (Wide - 8 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101b] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-emerald-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(16, 185, 129, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {t.bento.card1.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                      Python 3.14 • Crawl4AI • Playwright • Anti-Bot Stealth
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-medium">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{lang === "tr" ? "%99.8 Bot Başarısı" : "99.8% Bypass Rate"}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {t.bento.card1.desc}
              </p>
            </div>

            {/* Visual Micro-Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex flex-col gap-1 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent">
                <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  {lang === "tr" ? "Bypass Yöntemi" : "Bypass Method"}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TLS JA4 Fingerprint</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent">
                <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  {lang === "tr" ? "Motor" : "Core Engine"}
                </span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Crawl4AI & Playwright</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent">
                <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  {lang === "tr" ? "Eşzamanlılık" : "Concurrency"}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AsyncIO Semaphore(50)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["Crawl4AI", "Playwright Stealth", "Selenium", "TLS JA4", "Proxy Rotation", "AsyncIO", "BeautifulSoup4"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 hover:border-emerald-500/40 hover:text-emerald-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* BOX 2: Backend & Python 3.14 (4 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-4 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(6, 182, 212, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.bento.card2.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    Django 6.1 • Ninja • Supabase
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.bento.card2.desc}
              </p>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Supabase Pooler:</span>
                <span className="text-emerald-600 dark:text-emerald-400">Port 6543 Uyumlu</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Sürücü:</span>
                <span className="text-cyan-600 dark:text-cyan-400">Psycopg 3.2</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Runtime:</span>
                <span className="text-indigo-600 dark:text-indigo-400">Python 3.14.8</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["Django 6.1", "Django Ninja", "FastAPI", "PostgreSQL 17", "Redis", "Docker"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 hover:text-cyan-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* BOX 3: AI / NLP & Data Analytics (5 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-5 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-purple-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(168, 85, 247, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.bento.card3.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    BERT • OpenVINO • Optuna
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.bento.card3.desc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-zinc-400">FLO Group:</span>
                <span className="text-purple-600 dark:text-purple-300 font-semibold">22 BERT Modeli</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-zinc-400">YZTA Datathon:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Top %10 Başarı</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["PyTorch", "HuggingFace", "OpenVINO", "SHAP", "LightGBM", "CatBoost", "Pandas"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 hover:border-purple-500/40 hover:text-purple-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* BOX 4: Modern Frontend & Cloud Architecture (7 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-indigo-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(99, 102, 241, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.bento.card4.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    Next.js 16.4 • React 19.3 • Tailwind v4 • Vercel
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.bento.card4.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">Framework</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Next.js 16 App Router</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">Styling</span>
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">Tailwind CSS v4 (Oxide)</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">Motion</span>
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Motion & Lenis Scroll</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Motion", "Lenis", "Vercel"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 hover:border-indigo-500/40 hover:text-indigo-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
