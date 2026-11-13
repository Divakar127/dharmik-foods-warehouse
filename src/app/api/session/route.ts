import { NextResponse } from "next/server";
import { authorized, cookieName, equal, sameOrigin, secret, token } from "../../../lib/auth";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; until: number }>();
export async function GET() { return NextResponse.json({ authenticated: await authorized() }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  if (secret().length < 24) return NextResponse.json({ error: "Set a WAREHOUSE_API_KEY of at least 24 characters on the warehouse and backend." }, { status: 503 });
  // A process-wide limit suits this local single-operator foundation. Use a shared rate limiter when scaling.
  const key = "login";
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.until > now && entry.count >= 10) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid login request" }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid login request" }, { status: 400 });
  if (typeof body.password !== "string" || body.password.length > 1000 || !equal(body.password, secret())) {
    attempts.set(key, { count: entry && entry.until > now ? entry.count + 1 : 1, until: entry && entry.until > now ? entry.until : now + 900000 });
    return NextResponse.json({ error: "Incorrect warehouse access key" }, { status: 401 });
  }
  attempts.delete(key);
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(cookieName, token(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 8 * 60 * 60 });
  return response;
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(cookieName, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
