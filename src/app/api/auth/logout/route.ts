import { NextRequest, NextResponse } from "next/server";
import { hasSameOrigin } from "@/lib/auth/request";
import { DEMO_SESSION_COOKIE, demoCookieOptions } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ code: "ORIGIN_REJECTED" }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.redirect(new URL("/acceso", request.url), 303);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(DEMO_SESSION_COOKIE, "", { ...demoCookieOptions, maxAge: 0 });
  return response;
}
