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
  // 1. Try sending to Backend API (Django Ninja)
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
  } catch (error) {
    console.warn("Backend API not reachable, falling back to direct Supabase insertion:", error);
  }

  // 2. Direct Supabase REST API Fallback (if environment variables configured)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const sbResp = await fetch(`${supabaseUrl}/rest/v1/inquiries_contactinquiry`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: payload.full_name.trim(),
          email: payload.email.trim().toLowerCase(),
          service_type: payload.service_type || "Genel İletişim",
          budget_range: payload.budget_range || "N/A",
          message: payload.message.trim(),
        }),
      });

      if (sbResp.ok || sbResp.status === 201) {
        return {
          success: true,
          message: "Mesajınız başarıyla iletildi. En kısa sürede geri dönüş yapacağım!",
        };
      }
    } catch (sbError) {
      console.warn("Direct Supabase fallback failed:", sbError);
    }
  }

  // 3. Failed delivery - report real failure so user can use direct email
  return {
    success: false,
    message: "Mesaj iletim servisine ulaşılamadı. Lütfen doğrudan safaksenel61@gmail.com adresine yazın.",
  };
}
