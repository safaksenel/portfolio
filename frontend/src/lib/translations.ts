export type Language = "tr" | "en";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: "scraping" | "backend" | "data" | "fullstack";
  shortDescription: string;
  problemStatement: string;
  solutionArchitecture: string;
  techStack: string[];
  metrics: Record<string, string>;
  githubUrl: string;
  liveUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  order: number;
}

export const translations = {
  tr: {
    nav: {
      about: "Hakkımda",
      skills: "Yetenekler",
      certificates: "Sertifikalar",
      projects: "Projeler",
      contact: "İletişim",
      cv: "CV İndir",
      cvEn: "English CV",
      cvTr: "Türkçe CV",
      status: "Yeni Fırsatlara Açık",
    },
    hero: {
      badge: "Veri Bilimcisi | Bilgisayar Mühendisi",
      greeting: "Merhaba, ben",
      name: "Şafak Şenel",
      role: "Veri Bilimi, Makine Öğrenimi & NLP Sistemleri",
      description:
        "NLP, makine öğrenmesi ve model dağıtımı alanlarında deneyimli Bilgisayar Mühendisiyim. Python, PyTorch ve Scikit-learn ekosistemiyle uçtan uca ML pipeline'ları tasarlıyor, eğitiyor ve Intel OpenVINO & FastAPI ile ölçeklenebilir ürünlere dönüştürüyorum.",
      exploreProjects: "Projelerimi İncele",
      contactMe: "İletişime Geç",
      stats: {
        records: "Top %10",
        recordsLabel: "YZTA 5.0 Datathon Derecesi",
        reduction: "0.892 F1",
        reductionLabel: "22 Türkçe BERT NLP Modeli",
        bypass: "4x Hızlanma",
        bypassLabel: "Intel OpenVINO Optimizasyonu",
      },
    },
    terminal: {
      title: "Veri Bilimi & Yapay Zeka Hattı",
      subtitle: "Model çıkarımlarını, OLAP sorgularını ve ensemble tahminlerini canlı test edin",
      tabs: {
        scraper: "FLO BERT NLP (22 Modeller)",
        asyncBot: "Datathon Stacking ML (Top %10)",
        health: "Agentic Copilot & DuckDB",
      },
      statusRunning: "Yürütülüyor...",
      statusCompleted: "Tamamlandı (200 OK)",
      clickToRun: "Farklı bir model senaryosunu çalıştırmak için sekmelere tıklayın",
    },
    bento: {
      title: "Uzmanlık Alanlarım",
      subtitle: "Uçtan uca makine öğrenmesi, büyük veri analitiği ve yapay zeka sistemleri",
      card1: {
        badge: "Çekirdek Uzmanlık",
        title: "Uygulamalı Yapay Zeka, NLP & Derin Öğrenme",
        desc: "22 Türkçe BERT modeliyle kurumsal metin sınıflandırma, Intel OpenVINO ile %80+ CPU çıkarım hızlandırması, SHAP açıklanabilirliği ve YZTA Datathon üst %10 dereceli Stacking Ensemble mimarileri.",
      },
      card2: {
        badge: "Ajanik Yapay Zeka",
        title: "Çok Ajanlı AI & Bellek-İçi DuckDB OLAP",
        desc: "LangGraph durum grafikleri, DuckDB ile 500K+ satırda milisaniyelik analitik SQL sorgulama, AST-doğrulamalı güvenli kod yürütme ve kendi kendini onaran yansıma döngüleri.",
      },
      card3: {
        badge: "Veri Madenciliği",
        title: "Büyük Ölçekli Veri Toplama & Otomasyon",
        desc: "Veri bilimi modellerini beslemek için Cloudflare ve Turnstile korumalarını aşabilen; Crawl4AI, Playwright ve dinamik TLS parmak izi rotasyonuyla kesintisiz veri çıkarma hatları.",
      },
      card4: {
        badge: "MLOps & Dağıtım",
        title: "FastAPI, Docker & Model Ürünleştirme",
        desc: "Eğitilen modelleri mikrosaniye gecikmeli REST API uçlarına dönüştürme, Docker konteynerizasyon, Supabase PostgreSQL 17 ve Next.js interaktif karar destek panelleri.",
      },
    },
    about: {
      title: "Hakkımda & Mühendislik Yolculuğum",
      subtitle: "Veri odaklı karar alma süreçlerini hızlandıran ve ölçeklenebilir yapay zeka çözümleri üreten Bilgisayar Mühendisi.",
      storyTitle: "Ben Kimim?",
      storyP1:
        "Nişantaşı Üniversitesi Bilgisayar Mühendisliği mezunuyum. Veri bilimi ve makine öğrenmesi tutkum; ham veriyi anlamlı içgörülere dönüştürmek, 3 Ağustos 2024'te başladığım Ecole 42 İstanbul Ana Eğitim programında C ve Python ile ileri seviye algoritmik derinlik kazanmak ve üretim seviyesinde yapay zeka çözümleri geliştirmekle şekillendi.",
      storyP2:
        "FLO Group bünyesinde ayda 10.000+ müşteri geri bildirimini OpenVINO ile 4 kat hızlandırılmış 22 Türkçe BERT modeliyle sınıflandıran NLP sistemini kurarak operasyonel süreci %85 kısalttım (F1: 0.89). YZTA 5.0 Datathon'unda 56.000 satırlık veride Stacking Ensemble ile Türkiye genelinde üst %10'a girdim.",
      storyP3:
        "Google YZTA bursiyeri olarak Scrum Master liderliğinde projeler teslim ettim. PyTorch, Scikit-learn, DuckDB, FastAPI, Docker ve Next.js ekosistemiyle modelleri yalnızca eğitmekle kalmıyor, uçtan uca ürünleştiriyorum.",
      highlightsTitle: "Önemli Kilometre Taşları & Deneyimler",
      milestones: [
        {
          year: "3 Ağustos 2024 – Günümüz",
          title: "Ecole 42 İstanbul: Yazılım Mühendisi (Ana Eğitim / Core Curriculum)",
          desc: "Piscine başarıyla tamamlandıktan sonra 3 Ağustos 2024'te Ana Eğitime başlandı. Eşler arası (peer-to-peer) sistemde C ve Python dilleriyle ileri seviye algoritmalar, dinamik bellek yönetimi, veri yapıları ve sistem programlama uzmanlığı.",
        },
        {
          year: "Mart 2024 – Temmuz 2024",
          title: "FLO Grubu: İş Zekası ve Büyük Veri Stajyeri",
          desc: "11 ana neden için 22 adet iki katmanlı Türkçe BERT modeli eğitildi. OpenVINO ile CPU çıkarımı 4 kat hızlandırıldı, F1 skoru 0.89'a yükseltildi ve süreç %85 otomatikleştirildi.",
        },
        {
          year: "2024",
          title: "YZTA 5.0 Datathon — Türkiye İlk %10 Derecesi",
          desc: "56.000 satırlık regresyon veri setinde domain-driven feature engineering, Optuna Bayesian optimizasyonlu LightGBM, CatBoost ve RidgeCV Stacking Ensemble ile üstün başarı.",
        },
        {
          year: "Aralık 2023 – Günümüz",
          title: "Google YZTA: Yapay Zeka ve Veri Bilimi Bursiyeri",
          desc: "Scrum Master olarak 72 saatlik sprint'lerde 4 kişilik ekiple 2 ürün teslimi, Google Veri Analizi sertifikaları ve günlük 50+ otomatik yanıtlı Slack Chatbot'u (Cemil) geliştirmesi.",
        },
        {
          year: "2023 – 2025",
          title: "Nişantaşı Üniversitesi: Bilgisayar Mühendisliği (Lisans)",
          desc: "Bilgisayar Mühendisliği lisans programı ve Bilgisayar Programcılığı önlisans programından başarıyla mezuniyet.",
        },
      ],
      skillsSummary: [
        "Python & C",
        "SQL & Veri Mimarisi",
        "PyTorch & Scikit-learn",
        "BERT & HuggingFace NLP",
        "LightGBM & CatBoost",
        "Intel OpenVINO",
        "DuckDB OLAP & Pandas",
        "Optuna Bayesian",
        "FastAPI & Docker",
        "Tableau & Power BI",
        "LangGraph Agentic AI",
        "Next.js 16 & TypeScript",
      ],
    },
    projects: {
      title: "Öne Çıkan Projelerim",
      subtitle: "Büyük veri analitiği, NLP, makine öğrenmesi ve yapay zeka alanında geliştirdiğim mühendislik çalışmaları",
      filterAll: "Tümü",
      filterScraping: "Veri Toplama & Scraping",
      filterBackend: "MLOps & API Servisleri",
      filterData: "Veri Bilimi & Yapay Zeka",
      filterFullstack: "Full-Stack & Analitik",
      viewCode: "Kodu İncele",
      viewDemo: "Canlı Demo",
      problem: "Karşılaşılan Problem",
      solution: "Veri Bilimi & Mimari Çözüm",
      keyMetrics: "Model Başarımı & Metrikler",
      architectureSummary: "Mimari Özet",
    },
    contact: {
      title: "İletişime Geçin",
      subtitle: "Veri bilimi rolleri, yapay zeka projeleri veya teknik iş birlikleri için bana her zaman ulaşabilirsiniz.",
      nameLabel: "Adınız Soyadınız",
      namePlaceholder: "Örn: Can Yılmaz",
      emailLabel: "E-Posta Adresiniz",
      emailPlaceholder: "ornek@email.com",
      subjectLabel: "Konu",
      subjectPlaceholder: "Örn: Veri Bilimi İş Fırsatı / Proje İş Birliği",
      messageLabel: "Mesajınız",
      messagePlaceholder: "Mesajınızı buraya yazabilirsiniz...",
      submitButton: "Mesajı Gönder",
      sendingButton: "Gönderiliyor...",
      successTitle: "Mesajınız Alındı!",
      successDesc: "Geri bildiriminiz için teşekkürler. En kısa sürede e-posta adresinize dönüş yapacağım.",
      closeButton: "Kapat",
      directEmail: "Doğrudan E-Posta Gönderin",
      githubProfile: "GitHub Profilimi İnceleyin",
      linkedinProfile: "LinkedIn'de Bağlantı Kurun",
    },
    footer: {
      tagline: "Veri Bilimi, Makine Öğrenimi, NLP & Uçtan Uca Yapay Zeka Mimarisi",
      rights: "Tüm hakları saklıdır.",
      builtWith: "Şafak Şenel tarafından Next.js 16.4, React 19, Django 6.1 ve Supabase ile geliştirildi.",
      backToTop: "Yukarı Çık",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      certificates: "Certificates",
      projects: "Projects",
      contact: "Contact",
      cv: "Download CV",
      cvEn: "English CV",
      cvTr: "Turkish CV",
      status: "Available for Opportunities",
    },
    hero: {
      badge: "Data Scientist | Computer Engineer",
      greeting: "Hello, I am",
      name: "Şafak Şenel",
      role: "Data Science, Machine Learning & NLP Systems",
      description:
        "Computer Engineer experienced in NLP, machine learning, and model deployment. I design, train, and productionize end-to-end ML pipelines with Python, PyTorch, and Scikit-learn, turning complex data into high-performance AI solutions.",
      exploreProjects: "Explore Projects",
      contactMe: "Get in Touch",
      stats: {
        records: "Top 10%",
        recordsLabel: "YZTA 5.0 Datathon Ranking",
        reduction: "0.892 F1",
        reductionLabel: "22 Turkish BERT Models",
        bypass: "4x Speedup",
        bypassLabel: "Intel OpenVINO Optimization",
      },
    },
    terminal: {
      title: "Data Science & AI Pipeline",
      subtitle: "Test real-time model inference, OLAP execution, and ensemble predictions",
      tabs: {
        scraper: "FLO BERT NLP (22 Models)",
        asyncBot: "Datathon Stacking ML (Top 10%)",
        health: "Agentic Copilot & DuckDB",
      },
      statusRunning: "Executing...",
      statusCompleted: "Completed (200 OK)",
      clickToRun: "Click tabs above to simulate different AI & data scenarios",
    },
    bento: {
      title: "Core Expertise",
      subtitle: "End-to-end machine learning, high-velocity analytics, and agentic AI systems",
      card1: {
        badge: "Core Specialization",
        title: "Applied AI, NLP & Deep Learning",
        desc: "Enterprise feedback classification with 22 Turkish BERT models, 4x CPU inference acceleration with Intel OpenVINO, SHAP interpretability, and Top 10% Stacking Ensemble architectures.",
      },
      card2: {
        badge: "Agentic AI",
        title: "Multi-Agent AI & In-Memory DuckDB OLAP",
        desc: "Stateful LangGraph agentic workflows, sub-4ms analytical SQL querying over 500K+ rows with DuckDB, AST-verified Python sandbox execution, and self-healing reflection loops.",
      },
      card3: {
        badge: "Data Mining",
        title: "Large-Scale Data Ingestion & Crawling",
        desc: "Resilient data collection pipelines bypassing Cloudflare Turnstile with Crawl4AI, Playwright, and dynamic TLS fingerprint rotation to fuel machine learning models.",
      },
      card4: {
        badge: "MLOps & Deployment",
        title: "FastAPI, Docker & Model Productionization",
        desc: "Transforming trained models into micro-second latency REST API endpoints with FastAPI, Docker containerization, Supabase PostgreSQL 17, and interactive Next.js dashboards.",
      },
    },
    about: {
      title: "About Me & Engineering Journey",
      subtitle: "Computer Engineer accelerating data-driven decisions through scalable machine learning and automation.",
      storyTitle: "Who Am I?",
      storyP1:
        "Computer Engineering graduate from Nişantaşı University. My passion for data science and AI was forged through transforming real-world datasets into actionable models, deep algorithmic problem-solving in C & Python at Ecole 42 Istanbul (Core Curriculum starting Aug 3, 2024), and engineering production-grade ML pipelines.",
      storyP2:
        "At FLO Group, I developed a feedback triage system powered by 22 Turkish BERT models optimized with Intel OpenVINO, cutting evaluation time by 85% with an F1 score of 0.89. In the nationwide YZTA 5.0 Datathon, my Stacking Ensemble achieved a Top 10% rank on a 56,000-row dataset.",
      storyP3:
        "As a Google YZTA fellow and Scrum Master, I led cross-functional teams delivering data products. Working across PyTorch, Scikit-learn, DuckDB, FastAPI, Docker, and Next.js, I don't just train models—I productionize them.",
      highlightsTitle: "Key Milestones & Experiences",
      milestones: [
        {
          year: "Aug 3, 2024 – Present",
          title: "Ecole 42 Istanbul: Software Engineering (Core Curriculum)",
          desc: "Admitted to the prestigious Common Core curriculum starting August 3, 2024 following Piscine success. Deep dive into algorithms, dynamic memory management, low-level architecture, and data structures in C and Python.",
        },
        {
          year: "Mar 2024 – Jul 2024",
          title: "FLO Group: Business Intelligence & Big Data Intern",
          desc: "Trained 22 dual-tier Turkish BERT models for 11 root causes. Accelerated CPU inference 4x via OpenVINO, boosted F1 score to 0.89, and automated 85% of customer complaint analysis.",
        },
        {
          year: "2024",
          title: "YZTA 5.0 Datathon — Top 10% Nationwide Ranking",
          desc: "Engineered domain-driven features on a 56,000-row regression dataset, tuning LightGBM, CatBoost, and RidgeCV Stacking Ensemble with Optuna Bayesian optimization.",
        },
        {
          year: "Dec 2023 – Present",
          title: "Google YZTA: AI & Data Science Fellow",
          desc: "Coordinated 4-person teams as Scrum Master during 72-hour sprints, completed Google Advanced Data Analytics certifications, and developed an automated Slack chatbot.",
        },
        {
          year: "2023 – 2025",
          title: "Nişantaşı University: Computer Engineering (B.S.)",
          desc: "Graduated with B.S. in Computer Engineering and Associate Degree in Computer Programming.",
        },
      ],
      skillsSummary: [
        "Python & C",
        "SQL & Data Architecture",
        "PyTorch & Scikit-learn",
        "BERT & HuggingFace NLP",
        "LightGBM & CatBoost",
        "Intel OpenVINO",
        "DuckDB OLAP & Pandas",
        "Optuna Bayesian",
        "FastAPI & Docker",
        "Tableau & Power BI",
        "LangGraph Agentic AI",
        "Next.js 16 & TypeScript",
      ],
    },
    projects: {
      title: "Featured Engineering Projects",
      subtitle: "Production ML pipelines, NLP classifiers, and analytical systems solving real-world data challenges",
      filterAll: "All",
      filterScraping: "Data Collection & Scraping",
      filterBackend: "MLOps & API Services",
      filterData: "Data Science & AI",
      filterFullstack: "Full-Stack & Analytics",
      viewCode: "View Code",
      viewDemo: "Live Demo",
      problem: "The Challenge",
      solution: "Data Science & Architectural Solution",
      keyMetrics: "Model Performance & Metrics",
      architectureSummary: "Architectural Overview",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Reach out for Data Science roles, machine learning projects, or technical collaborations.",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. Alex Johnson",
      emailLabel: "Email Address",
      emailPlaceholder: "alex@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "e.g. Data Scientist Opportunity / Collaboration",
      messageLabel: "Your Message",
      messagePlaceholder: "Write your message here...",
      submitButton: "Send Message",
      sendingButton: "Sending...",
      successTitle: "Message Received!",
      successDesc: "Thank you for reaching out. I will get back to your email as soon as possible.",
      closeButton: "Close",
      directEmail: "Direct Email",
      githubProfile: "Explore GitHub Profile",
      linkedinProfile: "Connect on LinkedIn",
    },
    footer: {
      tagline: "Data Science, Machine Learning, NLP & End-to-End AI Architecture",
      rights: "All rights reserved.",
      builtWith: "Engineered by Şafak Şenel with Next.js 16.4, React 19, Django 6.1, and Supabase.",
      backToTop: "Back to Top",
    },
  },
};
