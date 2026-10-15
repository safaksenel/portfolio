"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ExternalLink, Copy, Check, X, MessageSquare, Send } from "lucide-react";
import { useEmailModal } from "@/context/EmailModalContext";
import { useLanguage } from "@/context/LanguageContext";

export default function EmailModal() {
  const { isOpen, closeEmailModal } = useEmailModal();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const emailAddress = "safaksenel61@gmail.com";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    emailAddress
  )}&su=${encodeURIComponent("Portfolyo İletişimi - Ahmet Şafak Şenel")}`;
  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    "Portfolyo İletişimi - Ahmet Şafak Şenel"
  )}`;

  useEffect(() => {
    if (isOpen) {
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 3000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeEmailModal();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, closeEmailModal]);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleGoToForm = () => {
    closeEmailModal();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const nameInput = document.getElementById("contact-name");
        nameInput?.focus();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeEmailModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0c0d16] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={closeEmailModal}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label={t.emailModal.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 pr-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t.emailModal.badge}
                </span>
                <h3 id="email-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.emailModal.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {t.emailModal.subtitle}
                </p>
              </div>
            </div>

            {/* Email Address & Quick Copy Card */}
            <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">
                  {emailAddress}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.emailModal.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.emailModal.copyAddress}</span>
                  </>
                )}
              </button>
            </div>

            {/* Notification Badge if auto-copied */}
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono text-center"
              >
                {t.emailModal.copiedToast}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* Option 1: Gmail Web Compose (Recommended) */}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeEmailModal}
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/20">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{t.emailModal.openGmail}</div>
                    <div className="text-[11px] text-white/80">{t.emailModal.openGmailDesc}</div>
                  </div>
                </div>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Option 2: Default Desktop App (mailto) */}
              <a
                href={mailtoUrl}
                onClick={closeEmailModal}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{t.emailModal.openMailto}</div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                      {t.emailModal.openMailtoDesc}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors" />
              </a>

              {/* Option 3: Use Site Contact Form */}
              <button
                type="button"
                onClick={handleGoToForm}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-200 dark:bg-white/10 text-cyan-600 dark:text-cyan-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{t.emailModal.useContactForm}</div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                      {t.emailModal.useContactFormDesc}
                    </div>
                  </div>
                </div>
                <Send className="w-4 h-4 text-cyan-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
