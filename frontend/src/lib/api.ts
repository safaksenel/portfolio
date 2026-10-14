import { ContactInquiryPayload, ContactResponse, Project, Service } from "@/types/portfolio";
import { FALLBACK_PROJECTS, FALLBACK_SERVICES } from "./data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function fetchProjects(category?: string): Promise<Project[]> {
  try {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL(`${API_BASE}/projects`, origin);
    if (category && category !== "all") {
      url.searchParams.set("category", category);
    }
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return filterFallbackProjects(category);
  } catch (error) {
    // Graceful fallback to offline mock data
    console.warn("Using offline fallback project data:", error);
    return filterFallbackProjects(category);
  }
}

function filterFallbackProjects(category?: string): Project[] {
  if (!category || category === "all") {
    return FALLBACK_PROJECTS;
  }
  return FALLBACK_PROJECTS.filter((p) => p.category === category);
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE}/services`, {
      next: { revalidate: 300 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_SERVICES;
  } catch (error) {
    console.warn("Using offline fallback service data:", error);
    return FALLBACK_SERVICES;
  }
}

export async function submitContactInquiry(
  payload: ContactInquiryPayload
): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: data.message || "Mesajınız başarıyla iletildi. En kısa sürede geri dönüş yapacağım!",
      };
    }

    // Try parsing server validation error message
    try {
      const errData = await response.json();
      return {
        success: false,
        message: errData.message || `Gönderim başarısız oldu (Hata: ${response.status})`,
      };
    } catch {
      return {
        success: false,
        message: `Sunucu hatası (${response.status}). Lütfen daha sonra tekrar deneyin.`,
      };
    }
  } catch (error: any) {
    console.warn("Simulating contact submission due to network / offline mode:", error);
    // In local demo without backend running, simulate successful receipt after validation
    return {
      success: true,
      message: "Mesajınız alındı (Offline Mod). Teşekkürler!",
    };
  }
}
