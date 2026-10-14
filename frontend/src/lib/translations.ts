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
      projects: "Projeler",
      contact: "İletişim",
      cv: "CV İndir",
      cvEn: "English CV",
      cvTr: "Türkçe CV",
      status: "Yeni Fırsatlara Açık",
    },
    hero: {
      badge: "Yazılım Mühendisi & Otomasyon Geliştirici",
      greeting: "Merhaba, ben",
      name: "Ahmet Şafak Şenel",
      role: "Python, Web Scraping ve Full-Stack Mimarisi",
      description:
        "Büyük ölçekli veri toplama (Crawl4AI, Playwright), yüksek verimli asenkron backend sistemleri (Python 3.14, Django 6.1, FastAPI) ve modern web deneyimleri (Next.js 16, React 19) inşa eden bir yazılım mühendisiyim.",
      exploreProjects: "Projelerimi İncele",
      contactMe: "İletişime Geç",
      stats: {
        records: "10K+ Veri / Ay",
        recordsLabel: "İşleme & Analiz Kapasitesi",
        reduction: "%85 Zaman Tasarrufu",
        reductionLabel: "FLO Group NLP Optimizasyonu",
        bypass: "%99.4 Başarı Oranı",
        bypassLabel: "WAF / Anti-Bot Bypass Mimarisi",
      },
    },
    terminal: {
      title: "Python 3.14 & Otomasyon Simülasyonu",
      subtitle: "Canlı terminal akışını ve çıktıları test edin",
      tabs: {
        scraper: "Crawl4AI & WAF Bypass",
        asyncBot: "AsyncIO Yüksek Hızlı Bot",
        health: "Django 6.1 & Supabase Sağlık",
      },
      statusRunning: "Çalışıyor...",
      statusCompleted: "Tamamlandı (200 OK)",
      clickToRun: "Farklı bir senaryoyu çalıştırmak için sekmelere tıklayın",
    },
    bento: {
      title: "Uzmanlık Alanlarım",
      subtitle: "Uçtan uca veri çıkarma, dayanıklı mimari ve modern web teknolojileri",
      card1: {
        badge: "Çekirdek Uzmanlık",
        title: "Web Scraping & Dağıtık Veri Hatları",
        desc: "Cloudflare Turnstile, Akamai ve Datadome korumalarını aşabilen; Crawl4AI, Playwright ve dinamik TLS parmak izi rotasyonuyla kesintisiz çalışan büyük ölçekli veri madenciliği botları.",
      },
      card2: {
        badge: "Backend & API",
        title: "Yüksek Performanslı Python 3.14 & Django",
        desc: "Django 6.1, Django Ninja ve FastAPI ile mikrosaniye düzeyinde yanıt veren, Pydantic v2 tip güvenliğinde ve Supabase PostgreSQL 17 transaction pooler uyumlu RESTful API'ler.",
      },
      card3: {
        badge: "Makine Öğrenimi & Analitik",
        title: "Uygulamalı Yapay Zeka & NLP Sistemleri",
        desc: "22 Türkçe BERT modeliyle kurumsal metin sınıflandırma, OpenVINO ile %80+ çıkarım hızlandırma ve YZTA Datathon ilk %10 dereceli Stacking Ensemble modelleri.",
      },
      card4: {
        badge: "Modern Web",
        title: "Next.js 16.4 & React 19 Arayüzleri",
        desc: "Tailwind CSS v4, Motion mikro-animasyonları, pürüzsüz Lenis kaydırması ve Vercel Edge Serverless altyapısıyla ipeksi kullanıcı deneyimleri.",
      },
    },
    about: {
      title: "Hakkımda & Mühendislik Yolculuğum",
      subtitle: "Karmaşık sistemleri basitleştiren, otomasyona ve veri odaklı çözümlere tutkulu bir yazılım mühendisi.",
      storyTitle: "Ben Kimim?",
      storyP1:
        "Yazılım geliştirme tutkum; tekrarlayan manuel işleri sıfıra indiren otomasyon botları yazmak ve internetteki devasa verileri yapılandırılmış, anlamlı bilgiye dönüştürmekle başladı.",
      storyP2:
        "FLO Group bünyesinde ayda 10.000+ müşteri geri bildirimini OpenVINO ile 4 kat hızlandırılmış 22 Türkçe BERT modeliyle sınıflandıran NLP sistemini kurarak operasyonel süreci %85 kısalttım. Aynı zamanda agresif anti-bot duvarlarını aşan dağıtık scraping mimarileri geliştirdim.",
      storyP3:
        "Modern Python (3.14), asenkron programlama, Django 6.1, Supabase ve Next.js ekosistemiyle hem güçlü backend servisleri hem de estetik, pürüzsüz web arayüzleri inşa ediyorum.",
      highlightsTitle: "Önemli Kilometre Taşları",
      milestones: [
        {
          year: "2026",
          title: "FLO Group: Kurumsal BERT NLP Otomasyonu",
          desc: "22 adet Türkçe BERT modeli, OpenVINO CPU optimizasyonu ve F1 0.89 başarımıyla operasyonel süreci %85 hızlandıran masaüstü NLP çözümü.",
        },
        {
          year: "2026",
          title: "Otonom Dağıtık Web Scraping Mimarisi",
          desc: "Crawl4AI, Playwright ve dinamik TLS JA4 rotasyonuyla Cloudflare Turnstile korumalarını %99.4 başarıyla aşan veri hattı.",
        },
        {
          year: "2026",
          title: "YZTA 5.0 Datathon — Türkiye İlk %10 Derecesi",
          desc: "56.000 satırlık veri kümesinde Optuna Bayesian optimizasyonlu Stacking Ensemble regresyon modeli ile üstün başarı.",
        },
        {
          year: "2025 - Günümüz",
          title: "Modern Full-Stack & Python 3.14 Ekosistemi",
          desc: "Django 6.1, Django Ninja, Supabase PostgreSQL 17, Next.js 16.4 ve Tailwind CSS v4 ile uçtan uca modern web platformları.",
        },
      ],
      skillsSummary: [
        "Python 3.14",
        "Django 6.1 / Ninja",
        "Next.js 16 / React 19",
        "Crawl4AI / Playwright",
        "Supabase PostgreSQL 17",
        "Tailwind CSS v4",
        "BERT / NLP / OpenVINO",
        "FastAPI & Docker",
      ],
    },
    projects: {
      title: "Öne Çıkan Projelerim",
      subtitle: "Gerçek dünyadaki problemleri çözen açık kaynaklı ve kurumsal mühendislik çalışmaları",
      filterAll: "Tümü",
      filterScraping: "Web Scraping & Otomasyon",
      filterBackend: "Backend & API",
      filterData: "Veri Bilimi & NLP",
      filterFullstack: "Full-Stack Web",
      viewCode: "Kodu İncele",
      viewDemo: "Canlı Demo",
      problem: "Karşılaşılan Problem",
      solution: "Mühendislik Çözümü",
      keyMetrics: "Öne Çıkan Metrikler",
      architectureSummary: "Mimari Özet",
    },
    contact: {
      title: "İletişime Geçin",
      subtitle: "Bir fikir paylaşmak, teknik bir konuda sohbet etmek ya da sadece merhaba demek isterseniz bana her zaman yazabilirsiniz.",
      nameLabel: "Adınız Soyadınız",
      namePlaceholder: "Örn: Can Yılmaz",
      emailLabel: "E-Posta Adresiniz",
      emailPlaceholder: "ornek@email.com",
      subjectLabel: "Konu",
      subjectPlaceholder: "Örn: Proje iş birliği / Tanışma",
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
      tagline: "Python 3.14, Web Scraping, Otomasyon & Modern Full-Stack Mimarisi",
      rights: "Tüm hakları saklıdır.",
      builtWith: "Next.js 16.4, React 19, Django 6.1, Supabase ve Tailwind CSS v4 ile geliştirildi.",
      backToTop: "Yukarı Çık",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      cv: "Download CV",
      cvEn: "English CV",
      cvTr: "Turkish CV",
      status: "Available for Opportunities",
    },
    hero: {
      badge: "Software Engineer & Automation Specialist",
      greeting: "Hello, I am",
      name: "Ahmet Şafak Şenel",
      role: "Python, Web Scraping & Full-Stack Architecture",
      description:
        "Software engineer specializing in resilient web scraping (Crawl4AI, Playwright), high-throughput asynchronous backend systems (Python 3.14, Django 6.1, FastAPI), and modern web applications (Next.js 16, React 19).",
      exploreProjects: "Explore Projects",
      contactMe: "Get in Touch",
      stats: {
        records: "10K+ Data / Month",
        recordsLabel: "Processing & NLP Throughput",
        reduction: "85% Time Reduction",
        reductionLabel: "FLO Group NLP Optimization",
        bypass: "99.4% Success Rate",
        bypassLabel: "WAF & Anti-Bot Bypass Pipeline",
      },
    },
    terminal: {
      title: "Python 3.14 & Automation Simulation",
      subtitle: "Test real-time terminal output and structured responses",
      tabs: {
        scraper: "Crawl4AI & WAF Bypass",
        asyncBot: "AsyncIO High-Speed Bot",
        health: "Django 6.1 & Supabase Health",
      },
      statusRunning: "Running...",
      statusCompleted: "Completed (200 OK)",
      clickToRun: "Click tabs above to simulate different technical scenarios",
    },
    bento: {
      title: "Core Expertise",
      subtitle: "End-to-end data extraction, reliable systems, and modern web engineering",
      card1: {
        badge: "Core Focus",
        title: "Web Scraping & Distributed Data Pipelines",
        desc: "Autonomous bots engineered to bypass Cloudflare Turnstile, Akamai, and Datadome with Crawl4AI, Playwright, and dynamic TLS fingerprint rotation for uninterrupted extraction.",
      },
      card2: {
        badge: "Backend & API",
        title: "High-Performance Python 3.14 & Django",
        desc: "Sub-millisecond latency RESTful APIs built with Django 6.1, Django Ninja, and FastAPI, featuring Pydantic v2 type safety and Supabase PostgreSQL 17 pooler optimization.",
      },
      card3: {
        badge: "Machine Learning & Analytics",
        title: "Applied AI & NLP Classifiers",
        desc: "Enterprise feedback classification using 22 Turkish BERT models, 4x inference acceleration with OpenVINO, and Top 10% Stacking Ensemble models from YZTA Datathon.",
      },
      card4: {
        badge: "Modern Frontend",
        title: "Next.js 16.4 & React 19 Interfaces",
        desc: "Tailwind CSS v4, Motion micro-interactions, silky Lenis inertial scrolling, and serverless Vercel Edge deployment for high-aesthetic user experiences.",
      },
    },
    about: {
      title: "About Me & Engineering Journey",
      subtitle: "A software engineer passionate about simplifying complex workflows, automation, and data-driven solutions.",
      storyTitle: "Who Am I?",
      storyP1:
        "My passion for software engineering started with building automation bots that eliminated repetitive manual tasks and converting unstructured web data into actionable knowledge.",
      storyP2:
        "At FLO Group, I designed an NLP feedback classification system powered by 22 Turkish BERT models optimized with OpenVINO, accelerating processing time by 4x and reducing operational overhead by 85%. I also developed distributed scraping pipelines capable of bypassing modern bot shields.",
      storyP3:
        "Working across Python 3.14, async concurrency, Django 6.1, Supabase, and Next.js, I bridge resilient backend engineering with elegant, responsive frontend design.",
      highlightsTitle: "Key Milestones",
      milestones: [
        {
          year: "2026",
          title: "FLO Group: Enterprise BERT NLP Automation",
          desc: "Deployed 22 BERT models with OpenVINO CPU acceleration and F1 0.89 score, cutting monthly evaluation time by 85%.",
        },
        {
          year: "2026",
          title: "Autonomous Distributed Web Scraping Architecture",
          desc: "Built a distributed scraping cluster with Crawl4AI, Playwright, and TLS JA4 rotation, maintaining a 99.4% bypass success rate.",
        },
        {
          year: "2026",
          title: "YZTA 5.0 Datathon — Top 10% Nationwide Ranking",
          desc: "Achieved top 10% ranking across Turkey with an Optuna-tuned Stacking Ensemble regression model on 56,000 data points.",
        },
        {
          year: "2025 - Present",
          title: "Modern Full-Stack & Python 3.14 Ecosystem",
          desc: "Developing end-to-end platforms combining Django 6.1, Django Ninja, Supabase PostgreSQL 17, Next.js 16.4, and Tailwind CSS v4.",
        },
      ],
      skillsSummary: [
        "Python 3.14",
        "Django 6.1 / Ninja",
        "Next.js 16 / React 19",
        "Crawl4AI / Playwright",
        "Supabase PostgreSQL 17",
        "Tailwind CSS v4",
        "BERT / NLP / OpenVINO",
        "FastAPI & Docker",
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Open-source and enterprise engineering projects solving real-world challenges",
      filterAll: "All",
      filterScraping: "Web Scraping & Automation",
      filterBackend: "Backend & API",
      filterData: "Data Science & NLP",
      filterFullstack: "Full-Stack Web",
      viewCode: "View Code",
      viewDemo: "Live Demo",
      problem: "The Challenge",
      solution: "Engineering Solution",
      keyMetrics: "Key Metrics",
      architectureSummary: "Architectural Overview",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Have a technical question, project idea, or just want to connect? Send a message and I'll get back to you promptly.",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. Alex Johnson",
      emailLabel: "Email Address",
      emailPlaceholder: "alex@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "e.g. Project Discussion / Hello",
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
      tagline: "Python 3.14, Web Scraping, Automation & Modern Full-Stack Architecture",
      rights: "All rights reserved.",
      builtWith: "Engineered with Next.js 16.4, React 19, Django 6.1, Supabase, and Tailwind CSS v4.",
      backToTop: "Back to Top",
    },
  },
};
