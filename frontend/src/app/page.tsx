import React from "react";
import HeroSection from "@/components/hero/HeroSection";
import BentoGrid from "@/components/bento/BentoGrid";
import AboutSection from "@/components/about/AboutSection";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import ContactSection from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section & Interactive Terminal */}
      <HeroSection />

      {/* 2. Bento Grid Expertise & Tech Stack */}
      <BentoGrid />

      {/* 3. About Me & Engineering Journey */}
      <AboutSection />

      {/* 4. Filterable Project Showcase */}
      <ProjectShowcase />

      {/* 5. Direct Personal Contact Form */}
      <ContactSection />
    </div>
  );
}
