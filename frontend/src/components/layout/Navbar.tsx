"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Code2,
  FolderGit2,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  FileText,
  Download,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cvMenuOpen, setCvMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: t.nav.about, icon: User },
    { href: "#expertise", label: t.nav.skills, icon: Code2 },
    { href: "#certificates", label: t.nav.certificates, icon: ShieldCheck },
    { href: "#projects", label: t.nav.projects, icon: FolderGit2 },
    { href: "#contact", label: t.nav.contact, icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "expertise", "certificates", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl transition-all duration-300",
            scrolled
              ? "glass-panel border-cyan-500/20 shadow-lg"
              : "bg-white/80 dark:bg-[#0b0c14]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm"
          )}
        >
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Şafak Şenel Portfolio"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 group-hover:border-cyan-400 transition-all shadow-sm group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] flex-shrink-0 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-indigo-500/20">
              <Image
                src="/safak-profile.jpg"
                alt="Şafak Şenel"
                fill
                sizes="36px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                Şafak Şenel
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 tracking-wider font-mono">
                {lang === "tr" ? "VERİ BİLİMCİSİ" : "DATA SCIENTIST"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-[#121320]/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-white/5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    isActive
                      ? "text-cyan-600 dark:text-cyan-300 bg-white dark:bg-cyan-500/15 border border-cyan-500/30 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-white/5"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Tools: Lang Switcher, Theme Switcher, Resume */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Switcher Button (TR / EN) */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              title="Dili Değiştir / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span className={cn(lang === "tr" ? "text-cyan-500 dark:text-cyan-400 font-bold" : "text-slate-400 dark:text-zinc-500")}>
                TR
              </span>
              <span className="text-slate-300 dark:text-zinc-600">/</span>
              <span className={cn(lang === "en" ? "text-cyan-500 dark:text-cyan-400 font-bold" : "text-slate-400 dark:text-zinc-500")}>
                EN
              </span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 transition-all cursor-pointer focus:outline-none"
              title={theme === "dark" ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-indigo-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Resume / CV Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCvMenuOpen(!cvMenuOpen)}
                aria-expanded={cvMenuOpen}
                aria-haspopup="true"
                aria-label={t.nav.cv}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-indigo-500/10 hover:from-emerald-500/20 hover:to-indigo-500/20 text-slate-800 dark:text-zinc-200 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t.nav.cv}</span>
              </button>

              <AnimatePresence>
                {cvMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute right-0 mt-2 w-40 p-1.5 rounded-xl bg-white dark:bg-[#121320] border border-slate-200 dark:border-white/10 shadow-xl z-50 flex flex-col gap-1"
                  >
                    <a
                      href="/cv/Ahmet_Safak_Senel_CV_TR_Web.pdf?v=20261016"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setCvMenuOpen(false)}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="group-hover:text-cyan-500 transition-colors">{t.nav.cvTr}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="/cv/Ahmet_Safak_Senel_CV_EN_Web.pdf?v=20261016"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setCvMenuOpen(false)}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="group-hover:text-cyan-500 transition-colors">{t.nav.cvEn}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle & Direct CV Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Direct Mobile 1-Tap CV Access (HR-001 / UX-001) */}
            <a
              href={lang === "tr" ? "/cv/Ahmet_Safak_Senel_CV_TR_Web.pdf" : "/cv/Ahmet_Safak_Senel_CV_EN_Web.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30"
              aria-label={t.nav.cv}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={toggleLang}
              className="px-2 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10"
              aria-label="Toggle language"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-4 rounded-2xl glass-panel border-cyan-500/20 shadow-2xl flex flex-col gap-2 md:hidden pointer-events-auto"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-500" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />
            <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 dark:text-zinc-400">
              <a
                href="/cv/Ahmet_Safak_Senel_CV_TR_Web.pdf?v=20261016"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                <span>{t.nav.cvTr}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="/cv/Ahmet_Safak_Senel_CV_EN_Web.pdf?v=20261016"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                <span>{t.nav.cvEn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
