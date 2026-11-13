import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
export const cookieName = "dm_warehouse_session";
export const secret = () => process.env.WAREHOUSE_API_KEY || "";
const sign = (value: string) => createHmac("sha256", secret()).update(`dm-session:${value}`).digest("hex");
export function equal(a: string, b: string) { const x = Buffer.from(a); const y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
export function token() { const expires = String(Date.now() + 8 * 60 * 60 * 1000); return `${expires}.${sign(expires)}`; }
export async function authorized() {
  if (!secret()) return false;
  const value = (await cookies()).get(cookieName)?.value || "";
  const [expires, signature, extra] = value.split(".");
  return !extra && /^\d+$/.test(expires || "") && Number(expires) > Date.now() && equal(signature || "", sign(expires));
}
export function sameOrigin(request: Request) { return request.headers.get("origin") === new URL(request.url).origin; }
