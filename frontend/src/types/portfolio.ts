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
  id: "crawl4ai" | "asyncio" | "django";
  title: string;
  badge: string;
  codeSnippet: string;
  executionLogs: string[];
  outputData: Record<string, any>;
  durationMs: number;
}
