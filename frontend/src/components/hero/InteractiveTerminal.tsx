"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Play, RotateCw, Check, Copy, Code, FileJson, Sparkles } from "lucide-react";
import { TERMINAL_TABS } from "@/lib/data";
import { TerminalTabConfig } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function InteractiveTerminal() {
  const { lang } = useLanguage();
  const [activeTabId, setActiveTabId] = useState<string>("bert_nlp");
  const [isRunning, setIsRunning] = useState(false);
  const [activeView, setActiveView] = useState<"code" | "output">("output");
  const [copied, setCopied] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [executionDone, setExecutionDone] = useState(true);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const activeConfig = TERMINAL_TABS.find((t) => t.id === activeTabId) || TERMINAL_TABS[0];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionDone(false);
    setDisplayedLogs([]);
    setActiveView("output");

    const logs = activeConfig.executionLogs;
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < logs.length) {
        setDisplayedLogs((prev) => [...prev, logs[currentIdx]]);
        currentIdx++;
        if (logsContainerRef.current) {
          logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setExecutionDone(true);
      }
    }, activeConfig.durationMs / logs.length);
  };

  useEffect(() => {
    setDisplayedLogs(activeConfig.executionLogs);
    setExecutionDone(true);
    setIsRunning(false);
  }, [activeTabId]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeConfig.outputData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#090a12] border border-slate-300 dark:border-cyan-500/25 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 hover:border-cyan-500/40">
      {/* Top Ambient Glow Bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0d0e17] border-b border-white/5 gap-2">
        <div className="flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-zinc-300 font-medium">
              safak@ml-node: ~/mlops/nlp-pipeline
            </span>
          </div>
        </div>

        {/* Status Chip & Run Button */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border transition-colors",
              isRunning
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : executionDone
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-zinc-800 text-zinc-400 border-zinc-700"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isRunning ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
              )}
            />
            <span>
              {isRunning
                ? lang === "tr"
                  ? "ÇIKARIM YAPILIYOR..."
                  : "INFERRING..."
                : "200 OK"}
            </span>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 text-xs font-mono font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
          >
            {isRunning ? (
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-cyan-300" />
            )}
            <span>
              {isRunning
                ? lang === "tr"
                  ? "Simüle Ediliyor"
                  : "Simulating"
                : lang === "tr"
                ? "Modeli Çalıştır (Run)"
                : "Run Inference"}
            </span>
          </button>
        </div>
      </div>

      {/* Script Selection Tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 bg-[#090a12] border-b border-white/5 overflow-x-auto scrollbar-none">
        {TERMINAL_TABS.map((tab) => {
          const isActive = tab.id === activeTabId;
          const tabLabel =
            tab.id === "bert_nlp"
              ? lang === "tr"
                ? "FLO BERT NLP (22 Model)"
                : "FLO BERT NLP (22 Models)"
              : tab.id === "datathon_ml"
              ? lang === "tr"
                ? "Datathon Stacking ML"
                : "Datathon Stacking ML"
              : tab.id === "copilot_duckdb"
              ? lang === "tr"
                ? "Agentic Copilot & DuckDB"
                : "Agentic Copilot & DuckDB"
              : tab.title;

          const tabBadge =
            tab.id === "bert_nlp"
              ? "BERT"
              : tab.id === "datathon_ml"
              ? "Stacking"
              : tab.id === "copilot_duckdb"
              ? "OLAP"
              : "AI";

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-2 rounded-t-lg font-mono text-xs font-medium transition-all whitespace-nowrap cursor-pointer",
                isActive
                  ? "bg-[#11121d] text-cyan-300 border-t border-l border-r border-cyan-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              )}
            >
              <span>{tabLabel}</span>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded font-sans",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-200"
                    : "bg-white/5 text-zinc-500"
                )}
              >
                {tabBadge}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-toolbar: Switch between Code and Real Output */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0c0d15] border-b border-white/5 text-xs">
        <div className="flex items-center gap-1 bg-[#141522] p-0.5 rounded-lg border border-white/5 font-mono">
          <button
            onClick={() => setActiveView("output")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
              activeView === "output"
                ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>{lang === "tr" ? "Çıktı & JSON" : "Output & JSON"}</span>
          </button>
          <button
            onClick={() => setActiveView("code")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
              activeView === "code"
                ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{lang === "tr" ? "Python Kodu" : "Python Code"}</span>
          </button>
        </div>

        {activeView === "output" && (
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">{lang === "tr" ? "Kopyalandı!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{lang === "tr" ? "JSON Kopyala" : "Copy JSON"}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Terminal Screen Area */}
      <div className="relative p-4 font-mono text-xs sm:text-sm h-[320px] overflow-y-auto bg-[#07080f] terminal-scanlines">
        <AnimatePresence mode="wait">
          {activeView === "code" ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-zinc-300 whitespace-pre overflow-x-auto leading-relaxed"
            >
              {activeConfig.codeSnippet}
            </motion.div>
          ) : (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {/* Log Stream Section */}
              <div
                ref={logsContainerRef}
                className="flex flex-col gap-1 text-zinc-400 border-b border-white/5 pb-3 max-h-[120px] overflow-y-auto"
              >
                {displayedLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-cyan-500 select-none">›</span>
                    <span
                      className={cn(
                        "leading-tight",
                        log.includes("SUCCESS") || log.includes("200 OK")
                          ? "text-emerald-400 font-semibold"
                          : log.includes("STARTING") || log.includes("INITIALIZING")
                          ? "text-cyan-300"
                          : "text-zinc-300"
                      )}
                    >
                      {log}
                    </span>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                    <span>›</span>
                    <span className="inline-block w-2 h-4 bg-cyan-400" />
                  </div>
                )}
              </div>

              {/* JSON Formatted Data Output */}
              {executionDone && (
                <div className="rounded-xl bg-[#0b0c16] p-3 border border-white/5 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2 text-[11px] text-zinc-400 border-b border-white/5 pb-1">
                    <span className="font-semibold text-cyan-300">
                      {lang === "tr" ? "// Ayıklanmış Veri (Formatted JSON)" : "// Extracted Data (Formatted JSON)"}
                    </span>
                    <span className="text-emerald-400">status: 200 OK</span>
                  </div>
                  <pre className="text-emerald-300 text-xs leading-normal">
                    {JSON.stringify(activeConfig.outputData, null, 2)}
                  </pre>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Footer Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#090a12] border-t border-white/5 text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Python 3.14 PEP 649 Concurrency Engine</span>
        </span>
        <span className="hidden sm:inline text-zinc-400">
          {lang === "tr" ? "Canlı Simülasyon" : "Live Simulation"}
        </span>
      </div>
    </div>
  );
}
