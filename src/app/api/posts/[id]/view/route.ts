import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const backendRes = await fetch(`${BACKEND_URL}/posts/${id}/view`, {
    method: "POST",
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  if (backendRes.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const text = await backendRes.text();
  const data = text ? JSON.parse(text) : null;
  const res = NextResponse.json(data, { status: backendRes.status });

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("set-cookie", setCookie);
  }

  return res;
}
