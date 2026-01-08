import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, (await params).path, "GET");
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, (await params).path, "POST");
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, (await params).path, "PUT");
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, (await params).path, "DELETE");
}

async function handleRequest(request: NextRequest, path: string[], method: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API URL not configured" }, { status: 500 });
  }

  const endpoint = path.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${apiUrl}/${endpoint}${searchParams ? `?${searchParams}` : ""}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const body = method !== "GET" && method !== "DELETE" ? await request.text() : undefined;
    const response = await fetch(url, { method, headers, body });

    const data = await response.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = null;
    }

    return NextResponse.json(jsonData || data, { status: response.status });
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Proxy Request Failed", details: error.message }, { status: 500 });
  }
}
