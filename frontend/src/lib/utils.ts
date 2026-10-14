import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "short",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}
