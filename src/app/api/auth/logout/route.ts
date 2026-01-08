import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthState } from "@/src/types/auth.types";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return NextResponse.json({ isAuthenticated: false } as Partial<AuthState>);
}
