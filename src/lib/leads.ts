import { toast } from "sonner";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  productName?: string;
  grade?: string;
  quantity?: string;
  message?: string;
  source: string;
  createdAt: string;
};

const STORAGE_KEY = "kp_leads";

export function saveLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const full: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Lead[];
    existing.unshift(full);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 200)));
  } catch {
    // ignore
  }
  toast.success("Inquiry received", {
    description: "Our application engineering team will reply within one business day.",
  });
  return full;
}

export type LeadDialogPrefill = {
  productName?: string;
  grade?: string;
  source?: string;
  quantity?: string;
};

export const OPEN_LEAD_DIALOG_EVENT = "kp:open-lead-dialog";

export function openLeadDialog(prefill: LeadDialogPrefill = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_LEAD_DIALOG_EVENT, { detail: prefill }));
}