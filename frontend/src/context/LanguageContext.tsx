"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.tr;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("safak_portfolio_lang") as Language | null;
      if (saved === "tr" || saved === "en") {
        setLangState(saved);
      } else {
        const browserLang = navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
        setLangState(browserLang);
      }
    } catch {
      // localStorage may fail in some environments
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("safak_portfolio_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === "tr" ? "en" : "tr");
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
