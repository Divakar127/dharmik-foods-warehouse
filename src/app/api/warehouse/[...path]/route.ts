import { authorized, sameOrigin, secret } from "../../../../lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!(await authorized())) return Response.json({ error: "Please sign in to the warehouse." }, { status: 401 });
  if (request.method !== "GET" && !sameOrigin(request)) return Response.json({ error: "Invalid request origin" }, { status: 403 });
  const { path } = await params;
  const route = path.join("/");
  if (!/^(products(\/\d+)?|audit|orders|homepage|delivery(\/preset)?|dashboard|customers|media(\/config)?)$/.test(route)) return Response.json({ error: "Not found" }, { status: 404 });
  try {
    const query = new URL(request.url).search;
    const isUpload = route === "media" && request.method === "POST";
    if (isUpload && Number(request.headers.get("content-length") || 0) > 9 * 1024 * 1024) return Response.json({ error: "Upload must be smaller than 8 MB" }, { status: 413 });
    const body = ["POST", "PUT"].includes(request.method) ? (isUpload ? await request.arrayBuffer() : await request.text()) : undefined;
    if (isUpload && body instanceof ArrayBuffer && body.byteLength > 9 * 1024 * 1024) return Response.json({ error: "Upload too large" }, { status: 413 });
    const upstream = await fetch(`${process.env.API_URL || "http://localhost:8000"}/api/v1/warehouse/${route}${query}`, {
      method: request.method,
      headers: { "Content-Type": isUpload ? request.headers.get("content-type") || "application/octet-stream" : "application/json", "X-Warehouse-Key": secret() },
      body,
      cache: "no-store", signal: AbortSignal.timeout(isUpload ? 45000 : 15000),
    });
    return new Response(upstream.status === 204 ? null : await upstream.text(), { status: upstream.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "The catalog service is unavailable. Check that the backend is running." }, { status: 502 }); }
}
export { proxy as GET, proxy as POST, proxy as PUT, proxy as DELETE };
