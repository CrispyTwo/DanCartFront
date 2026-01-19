import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthState } from "@/src/types/auth.types";

type RegisterResponse = {
  token: string;
  refreshToken: string;
}

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API URL not configured" }, { status: 500 });
  }

  const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(await request.json()),
  });

  const data = await response.json() as RegisterResponse;

  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 2,
  });

  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ isAuthenticated: true } as Partial<AuthState>);
}
