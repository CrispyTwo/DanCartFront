import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthState } from "@/src/types/auth.types";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false } as Partial<AuthState>);
  }

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) {
      return NextResponse.json({ isAuthenticated: false } as Partial<AuthState>);
    }

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = Buffer.from(padded, "base64").toString("utf8");
    const payload = JSON.parse(json);

    if (payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            return NextResponse.json({ error: "API URL not configured" }, { status: 500 });
          }

          const response = await fetch(`${apiUrl}/api/v1/auth/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token }),
          });

          const data = await response.json();
          if (response.ok) {
            cookieStore.set("accessToken", data.accessToken);
            cookieStore.set("refreshToken", data.refreshToken);
            return await GET(request);
          }
        } catch (error) {
          console.error("Refresh Token Error:", error);
        }

        return NextResponse.json({ isAuthenticated: false } as Partial<AuthState>);
      }
    }

    const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const roleArray = Array.isArray(roles) ? roles : [roles];

    const response: AuthState = {
      isAuthenticated: true,
      user: {
        id: payload.sub,
        email: payload.email,
        roles: roleArray,
      },
      exp: payload.exp
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Session Check Error:", error);
    return NextResponse.json({ isAuthenticated: false } as Partial<AuthState>);
  }
}
