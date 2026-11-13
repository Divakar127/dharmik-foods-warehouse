export type { Product, ProductPage } from "../shared/catalog";
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  if (!response.ok) {
    let message = "The request failed. Please try again.";
    try { const body = await response.json(); message = typeof body.detail === "string" ? body.detail : Array.isArray(body.detail) ? body.detail.map((e: { loc?: string[]; msg: string }) => `${e.loc?.slice(1).join(".") || "Product"}: ${e.msg}`).join("; ") : body.error || message; } catch {}
    if (response.status === 401) window.dispatchEvent(new Event("dm-session-expired"));
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}
