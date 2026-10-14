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
  title: "Şafak Şenel | Veri Bilimcisi & Bilgisayar Mühendisi",
  description:
    "Şafak Şenel — Veri Bilimcisi & Bilgisayar Mühendisi Portfolyosu. NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, Scikit-learn, YZTA Datathon Top %10 Stacking Ensemble, DuckDB OLAP ve Çok Ajanlı AI Çözümleri.",
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
      "Şafak Şenel — Veri Bilimcisi & Bilgisayar Mühendisi. NLP (22 Türkçe BERT Modeli), Intel OpenVINO, PyTorch, Scikit-learn, YZTA Datathon Top %10 Stacking Ensemble, DuckDB OLAP ve Çok Ajanlı AI Çözümleri.",
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
