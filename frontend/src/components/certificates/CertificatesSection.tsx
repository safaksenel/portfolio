"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Maximize2,
  X,
  FileCheck2,
} from "lucide-react";
import { certificatesData } from "@/lib/certificatesData";
import { Certificate } from "@/types/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function CertificatesSection() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filterTabs = [
    { id: "all", label: lang === "tr" ? "Tümü (9)" : "All (9)" },
    { id: "DataCamp", label: "DataCamp" },
    { id: "Google", label: "Google" },
    { id: "other", label: lang === "tr" ? "Udemy & BTK" : "Udemy & BTK" },
  ];

  const filteredCertificates = certificatesData.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "other") return c.issuer === "Udemy" || c.issuer === "BTK Akademi";
    return c.issuer === activeFilter;
  });

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === "tr" ? "Resmi Akreditasyonlar & Sertifikalar" : "Official Accreditations & Badges"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lang === "tr" ? "Sertifikalar & Uzmanlıklar" : "Certifications & Credentials"}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {lang === "tr"
            ? "Veri mühendisliği, ileri düzey veri analitiği, makine öğrenmesi ve yapay zeka alanında uluslararası geçerliliğe sahip doğrulanmış sertifikalarım."
            : "Internationally accredited and verified credentials across Data Engineering, Advanced Data Analytics, Machine Learning, and Generative AI."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer",
                isActive
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-sm"
                  : "bg-white dark:bg-[#0b0c15] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 border-slate-200 dark:border-white/5"
              )}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert) => {
            const isDataCampAssociate = cert.id === "datacamp-associate-data-engineer";

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border shadow-sm",
                  isDataCampAssociate
                    ? "bg-gradient-to-br from-emerald-500/5 via-white dark:via-[#0c0e18] to-cyan-500/5 border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
                    : "bg-white dark:bg-[#0b0c15]/90 border-slate-200 dark:border-white/10 hover:border-cyan-500/40"
                )}
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border",
                        cert.issuer === "DataCamp"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : cert.issuer === "Google"
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
                          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                      )}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{cert.issuer}</span>
                    </span>

                    {cert.credentialId && (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500 truncate max-w-[130px]">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                    {cert.title[lang]}
                  </h3>

                  {/* Badge Text */}
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{cert.issuerBadge}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {cert.description[lang]}
                  </p>

                  {/* Skills Acquired */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-3 text-xs">
                  {cert.image && (
                    <button
                      onClick={() => setSelectedImage(cert.image!)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all font-mono font-medium cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{lang === "tr" ? "Görüntüle" : "Preview"}</span>
                    </button>
                  )}

                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all font-mono font-semibold cursor-pointer"
                    >
                      <span>{lang === "tr" ? "Doğrula" : "Verify"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="ml-auto text-[11px] font-mono text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "tr" ? "Doğrulanmış" : "Verified"}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Image Modal for Certificate Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Certificate Official View"
                className="w-full h-auto object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
