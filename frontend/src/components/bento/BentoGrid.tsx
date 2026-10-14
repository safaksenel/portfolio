"use client";

import React from "react";
import { Brain, Sparkles, Database, BarChart3, Bot, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
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
          <span>{lang === "tr" ? "Veri Bilimi & Yapay Zeka Mimarisi" : "Data Science & AI Architecture"}</span>
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
        
        {/* BOX 1: Applied AI, NLP & Deep Learning (Wide - 8 cols) - FLAGSHIP */}
        <SpotlightCard
          className="col-span-12 lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101b] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-purple-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(168, 85, 247, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {t.bento.card1.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                      PyTorch • 22 Türkçe BERT • Intel OpenVINO • Optuna
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-xs font-mono font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === "tr" ? "F1: 0.892 • RMSE: 0.1418" : "F1: 0.892 • RMSE: 0.1418"}</span>
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
                  {lang === "tr" ? "NLP Mimarisi" : "NLP Architecture"}
                </span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">22 Türkçe BERT Modeli</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent">
                <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  {lang === "tr" ? "Çıkarım Motoru" : "Inference Engine"}
                </span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Intel OpenVINO (4x CPU)</span>
              </div>
              <div className="flex flex-col gap-1 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent">
                <span className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  {lang === "tr" ? "Datathon Çözümü" : "Datathon Solution"}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">56K Satır (Stacking ML)</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {[
                "PyTorch",
                "HuggingFace",
                "BERT",
                "Intel OpenVINO",
                "SHAP",
                "LightGBM",
                "CatBoost",
                "Scikit-learn",
                "Optuna Bayesian",
              ].map((tag) => (
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

        {/* BOX 2: Multi-Agent AI & In-Memory DuckDB OLAP (4 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-4 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(6, 182, 212, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.bento.card2.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    LangGraph • DuckDB OLAP • Python 3.14
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.bento.card2.desc}
              </p>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>OLAP Hızı:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">3.42ms (500K Satır)</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Ajan Mimarisi:</span>
                <span className="text-emerald-600 dark:text-emerald-400">LangGraph Router</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Güvenlik:</span>
                <span className="text-indigo-600 dark:text-indigo-400">Python AST Sandbox</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["LangGraph", "DuckDB OLAP", "FastAPI", "Python AST", "Self-Healing"].map((tag) => (
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

        {/* BOX 3: Large-Scale Data Mining & Web Scraping (4 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-4 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-emerald-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(16, 185, 129, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.bento.card3.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    Crawl4AI • Playwright • WAF Bypass
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t.bento.card3.desc}
              </p>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Bot Geçiş Oranı:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">%99.4 Başarı</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-zinc-300">
                <span>Korumalar:</span>
                <span className="text-cyan-600 dark:text-cyan-400">Cloudflare Turnstile</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {["Crawl4AI", "Playwright Stealth", "Selenium 4", "TLS JA4", "Proxy Rotation"].map((tag) => (
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

        {/* BOX 4: MLOps, Model Deployment & API (Wide - 8 cols) */}
        <SpotlightCard
          className="col-span-12 lg:col-span-8 p-6 sm:p-8 bg-white dark:bg-gradient-to-br dark:from-[#0e101c] dark:via-[#0b0c14] dark:to-[#080910] border-slate-200 dark:border-indigo-500/20 shadow-sm dark:shadow-none"
          spotlightColor="rgba(99, 102, 241, 0.16)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {t.bento.card4.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                      FastAPI • Docker • Supabase PostgreSQL 17 • Streamlit • Next.js 16
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === "tr" ? "Production-Ready" : "Production-Ready"}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {t.bento.card4.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#07080f]/90 border border-slate-200/80 dark:border-white/5 font-mono text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">API Gecikmesi</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">&lt;15ms REST API</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">Veritabanı</span>
                <span className="text-cyan-600 dark:text-cyan-300 font-semibold">PostgreSQL 17 (Pooler)</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 dark:text-zinc-400 text-[10px]">Konteyner & Cloud</span>
                <span className="text-emerald-600 dark:text-emerald-300 font-semibold">Docker & Vercel Edge</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
              {[
                "FastAPI",
                "Docker",
                "Docker Compose",
                "RESTful APIs",
                "Supabase PostgreSQL 17",
                "Streamlit",
                "Next.js 16",
                "Vercel Serverless",
              ].map((tag) => (
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
