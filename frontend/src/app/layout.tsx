import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import BackgroundGrid from "@/components/ui/BackgroundGrid";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060609",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-q663.vercel.app"),
  title: "Ahmet Şafak Şenel | Veri Bilimcisi & Bilgisayar Mühendisi",
  description:
    "Ahmet Şafak Şenel — Veri Bilimcisi & Bilgisayar Mühendisi Portfolyosu. NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, Scikit-learn, YZTA Datathon Top %10 Stacking Ensemble, DuckDB OLAP ve Çok Ajanlı AI Çözümleri.",
  keywords: [
    "Ahmet Şafak Şenel",
    "Veri Bilimcisi",
    "Data Scientist",
    "Bilgisayar Mühendisi",
    "Makine Öğrenmesi",
    "Machine Learning Engineer",
    "NLP",
    "BERT",
    "Intel OpenVINO",
    "PyTorch",
    "Scikit-learn",
    "LightGBM",
    "CatBoost",
    "Optuna",
    "DuckDB OLAP",
    "FastAPI",
    "Python 3.14",
  ],
  authors: [{ name: "Ahmet Şafak Şenel", url: "https://github.com/safaksenel" }],
  creator: "Ahmet Şafak Şenel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ahmet Şafak Şenel | Software Engineer & Automation Specialist",
    description:
      "Personal portfolio showcasing high-throughput web scrapers, Django 6.1 APIs, machine learning pipelines, and modern web architectures.",
    url: "https://safak.dev",
    siteName: "Ahmet Şafak Şenel Portfolio",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/safak.jpeg",
        width: 1200,
        height: 630,
        alt: "Ahmet Şafak Şenel - Software Engineer & Automation Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmet Şafak Şenel | Software Engineer & Automation Specialist",
    description:
      "Python 3.14, Web Scraping, Django 6.1, and Machine Learning Portfolio.",
    images: ["/safak.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://safak.dev/#person",
      name: "Ahmet Şafak Şenel",
      alternateName: "Şafak Şenel",
      jobTitle: "Software Engineer & Automation Specialist",
      description:
        "Software engineer specializing in Python 3.14, web scraping, anti-bot bypass mechanisms, Django 6.1 APIs, and full-stack web applications.",
      url: "https://github.com/safaksenel",
      image: "https://safak.dev/safak.jpeg",
      sameAs: [
        "https://github.com/safaksenel",
        "https://linkedin.com/in/safaksenel",
      ],
      knowsAbout: [
        "Python 3.14",
        "Web Scraping",
        "Crawl4AI",
        "Playwright",
        "Anti-Bot Bypass",
        "Django 6.1",
        "Django Ninja",
        "PostgreSQL 17",
        "Supabase",
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "BERT NLP",
        "Machine Learning",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://safak.dev/#website",
      url: "https://safak.dev",
      name: "Ahmet Şafak Şenel Developer Portfolio",
      publisher: {
        "@id": "https://safak.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen relative transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <ScrollProgressBar />
              <BackgroundGrid />
              <Navbar />
              <main className="relative z-10 flex flex-col">{children}</main>
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
