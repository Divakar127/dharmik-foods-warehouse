export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!/^[a-f0-9]{32}\.webp$/.test(file)) return new Response(null, { status: 404 });
  try { const response = await fetch(`${process.env.API_URL || "http://localhost:8000"}/media/${file}`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return new Response(null, { status: response.status });
    return new Response(await response.arrayBuffer(), { headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 502 }); }
}
