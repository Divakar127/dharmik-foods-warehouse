"use client";
import { useState } from "react";
export function ImageUpload({ onUploaded, disabled = false, onBusyChange, recommendedSize }: { onUploaded: (url: string) => void; disabled?: boolean; onBusyChange?: (busy: boolean) => void; recommendedSize?: {width:number;height:number} }) {
 const [busy, setBusy] = useState(false), [message, setMessage] = useState("");
 async function upload(file?: File) {
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) { setMessage("Choose an image no larger than 8 MB."); return; }
  setBusy(true); onBusyChange?.(true); setMessage("");
  try { const form = new FormData(); form.append("file", file); const response = await fetch("/api/warehouse/media", { method: "POST", body: form }); const result = await response.json(); if (!response.ok) throw new Error(typeof result.detail === "string" ? result.detail : result.error || "Upload failed"); onUploaded(result.url); setMessage(`Image uploaded to ${result.storage === "azure" ? "Azure Blob Storage" : "local media storage"}.${result.width ? ` Image size: ${result.width} × ${result.height} px.` : ""}${recommendedSize && result.width && (result.width !== recommendedSize.width || result.height !== recommendedSize.height) ? " Different size from your banner settings; the full image will be shown with padding." : ""}`); }
  catch(e) { setMessage((e as Error).message); } finally { setBusy(false); onBusyChange?.(false); }
 }
 return <div className="image-upload"><label>Upload an image<input type="file" accept="image/jpeg,image/png,image/webp" disabled={disabled || busy} onChange={e => { void upload(e.target.files?.[0]); e.currentTarget.value=""; }}/></label>{recommendedSize&&<p className="banner-size-hint">Banner: <strong>{recommendedSize.width} × {recommendedSize.height} px</strong>. Use this exact size for a full-frame fit. Different sizes stay fully visible with padding.</p>}<small>JPEG, PNG or WebP · up to 8 MB. Stored as WebP; camera metadata is removed. Azure is used when configured.</small>{message && <p role="status">{message}</p>}{busy && <p role="status">Uploading image…</p>}</div>;
}
