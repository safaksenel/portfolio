import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { EmailModalProvider } from "@/context/EmailModalContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import BackgroundGrid from "@/components/ui/BackgroundGrid";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmailModal from "@/components/common/EmailModal";

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
  title: "Şafak Şenel | Veri Bilimcisi & Bilgisayar Mühendisi",
  description:
    "Şafak Şenel — Veri Bilimcisi & Bilgisayar Mühendisi Portfolyosu. NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, Scikit-learn, YZTA Datathon Stacking Ensemble, DuckDB OLAP ve Çok Ajanlı AI Çözümleri.",
  keywords: [
    "Şafak Şenel",
    "Safak Senel",
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
  authors: [{ name: "Şafak Şenel", url: "https://github.com/safaksenel" }],
  creator: "Şafak Şenel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Şafak Şenel | Veri Bilimcisi & Bilgisayar Mühendisi",
    description:
      "Şafak Şenel — Veri Bilimcisi & Bilgisayar Mühendisi. NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, Scikit-learn, YZTA Datathon Stacking Ensemble, DuckDB OLAP ve Çok Ajanlı AI Çözümleri.",
    url: "https://portfolio-q663.vercel.app",
    siteName: "Şafak Şenel Portfolio",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/safak.jpeg",
        width: 1200,
        height: 630,
        alt: "Şafak Şenel - Veri Bilimcisi & Bilgisayar Mühendisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şafak Şenel | Veri Bilimcisi & Bilgisayar Mühendisi",
    description:
      "NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, DuckDB OLAP, Stacking ML & Python 3.14 Portfolyosu.",
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
      "@id": "https://portfolio-q663.vercel.app/#person",
      name: "Şafak Şenel",
      alternateName: "Safak Senel",
      jobTitle: "Data Scientist & Computer Engineer",
      description:
        "Computer Engineer and Data Scientist specializing in NLP (Turkish BERT, OpenVINO), Machine Learning (Stacking Ensembles, LightGBM, CatBoost), Agentic AI (LangGraph, DuckDB OLAP), and scalable MLOps architectures.",
      url: "https://portfolio-q663.vercel.app",
      image: "https://portfolio-q663.vercel.app/safak.jpeg",
      sameAs: [
        "https://github.com/safaksenel",
        "https://linkedin.com/in/safaksenel",
        "https://www.kaggle.com/afakenel",
      ],
      knowsAbout: [
        "Data Science",
        "Machine Learning",
        "Natural Language Processing (NLP)",
        "BERT Models",
        "Intel OpenVINO",
        "PyTorch",
        "Scikit-learn",
        "LightGBM",
        "CatBoost",
        "Optuna",
        "DuckDB OLAP",
        "LangGraph",
        "FastAPI",
        "Python 3.14",
        "PostgreSQL 17",
        "Next.js 16",
        "Computer Vision",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://portfolio-q663.vercel.app/#website",
      url: "https://portfolio-q663.vercel.app",
      name: "Şafak Şenel Data Scientist & AI Portfolio",
      publisher: {
        "@id": "https://portfolio-q663.vercel.app/#person",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://portfolio-q663.vercel.app/#service",
      name: "Şafak Şenel - Data Science & AI Engineering",
      url: "https://portfolio-q663.vercel.app",
      telephone: "+905000000000",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      provider: {
        "@id": "https://portfolio-q663.vercel.app/#person",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI & Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Natural Language Processing (NLP) & BERT Models",
              description: "Custom Turkish BERT transformer architectures, intent classification, and OpenVINO quantization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Machine Learning & Stacking Ensembles",
              description: "Tabular ML pipelines, LightGBM, CatBoost, and Optuna Bayesian optimization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Multi-Agent AI & In-Memory DuckDB OLAP",
              description: "LangGraph stateful agent systems and sub-millisecond analytical query engines.",
            },
          },
        ],
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
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen relative transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <EmailModalProvider>
              <SmoothScroll>
                {/* WCAG 2.2 AA Skip-to-Content Link */}
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Ana İçeriğe Atla / Skip to Content
                </a>
                <ScrollProgressBar />
                <BackgroundGrid />
                <Navbar />
                <main id="main-content" tabIndex={-1} className="relative z-10 flex flex-col focus:outline-none">
                  {children}
                </main>
                <Footer />
                <EmailModal />
              </SmoothScroll>
            </EmailModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
