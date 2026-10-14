"use client";

import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, KaggleIcon } from "@/components/ui/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#050508] pt-16 pb-12 px-4 sm:px-6 z-10 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Summary (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs">
                ŞŞ
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                Şafak Şenel
              </span>
            </div>

            <p className="text-slate-600 dark:text-zinc-400 text-sm max-w-md leading-relaxed font-normal">
              {t.footer.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>PyTorch • Scikit-learn • BERT NLP • DuckDB OLAP</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-slate-900 dark:text-zinc-200 uppercase tracking-wider font-semibold">
              {lang === "tr" ? "Hızlı Erişim" : "Navigation"}
            </span>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400">
              <li>
                <a href="#about" className="hover:text-cyan-500 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-cyan-500 transition-colors">
                  {t.nav.skills}
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-cyan-500 transition-colors">
                  {t.nav.certificates}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-500 transition-colors">
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-500 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Socials (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-slate-900 dark:text-zinc-200 uppercase tracking-wider font-semibold">
              {lang === "tr" ? "Sosyal Ağlar" : "Social Links"}
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/safaksenel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-500 border border-slate-200 dark:border-white/5 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/%C5%9Fafak-%C5%9Fenel-70a633319/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-500 border border-slate-200 dark:border-white/5 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.kaggle.com/afakenel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-cyan-500 border border-slate-200 dark:border-white/5 transition-colors"
                aria-label="Kaggle"
              >
                <KaggleIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:safaksenel@hotmail.com"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-emerald-500 border border-slate-200 dark:border-white/5 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} Şafak Şenel. {t.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              {t.footer.builtWith}
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-500" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
