export type ProjectCategory = "scraping" | "backend" | "data" | "fullstack";

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ProjectCategory;
  short_description: string;
  problem_statement: string;
  solution_architecture: string;
  tech_stack: string[];
  metrics: Record<string, string | number>;
  github_url?: string | null;
  live_url?: string | null;
  thumbnail_url?: string | null;
  is_featured: boolean;
  order: number;
  created_at: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  deliverables: string[];
  order: number;
}

export interface ContactInquiryPayload {
  full_name: string;
  email: string;
  service_type: string;
  budget_range: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface TerminalTabConfig {
  id: string;
  title: string;
  badge: string;
  codeSnippet: string;
  executionLogs: string[];
  outputData: Record<string, any>;
  durationMs: number;
}

export interface Certificate {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  issuer: "DataCamp" | "Google" | "Coursera" | "Udemy" | "BTK Akademi";
  issuerBadge: string;
  credentialUrl?: string;
  credentialId?: string;
  issueDate: string;
  image?: string;
  description: {
    tr: string;
    en: string;
  };
  skills: string[];
  isFeatured?: boolean;
}
