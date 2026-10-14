"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bot, Cpu, BarChart3, Globe, Check, ArrowRight, Briefcase } from "lucide-react";
import { fetchServices } from "@/lib/api";
import { Service } from "@/types/portfolio";
import { FALLBACK_SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Cpu,
  BarChart3,
  Globe,
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchServices();
        if (isMounted) setServices(data);
      } catch {
        // Fallback already handled
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Dispatch a custom event so ContactSection pre-selects this service
      window.dispatchEvent(
        new CustomEvent("select-service-type", { detail: serviceTitle })
      );
    }
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Hizmetler & Mühendislik Çözümleri</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          İhtiyacınıza Özel,{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Anahtar Teslim Çözümler.
          </span>
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
          Karmaşık veri engellerini aşmak, API altyapınızı güçlendirmek veya verilerinizden anlamlı istatistiksel raporlar çıkarmak için hazır mısınız?
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => {
          const Icon = ICON_MAP[service.icon_name] || Bot;
          return (
            <motion.div
              key={service.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 group-hover:border-emerald-400/40 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      Profesyonel Hizmet #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                    Teslim Edilecek Çıktılar:
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="mt-0.5 p-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectService(service.title)}
                className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/30 text-xs font-mono font-medium text-zinc-300 hover:text-emerald-300 transition-all"
              >
                <span>Bu Hizmet İçin Teklif Al</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
