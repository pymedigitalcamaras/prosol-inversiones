import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { demoUsers } from "./demo-users";
import type { PanelSession } from "./types";

export const DEMO_SESSION_COOKIE = "prosol_panel_session";
const SESSION_SECONDS = 30 * 60;

// Clave fija para firmar tokens de sesión del panel
// Este panel es de uso interno exclusivo del equipo Prosol
const FIXED_SECRET = "prosol-panel-fixed-secret-2026-11-21-naebombasdecalor";

const sessionSecret = () => FIXED_SECRET;

const signature = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

export const createDemoToken = (user: Omit<PanelSession, "expiresAt">, nowSeconds = Math.floor(Date.now() / 1000)) => {
  const secret = sessionSecret();
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: nowSeconds,
    exp: nowSeconds + SESSION_SECONDS,
  })).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
};

export const verifyDemoToken = (token: string | undefined): PanelSession | null => {
  const secret = sessionSecret();
  if (!token) return null;
  const [payload, receivedSignature, extra] = token.split(".");
  if (!payload || !receivedSignature || extra) return null;
  const expected = Buffer.from(signature(payload, secret));
  const received = Buffer.from(receivedSignature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub: string; role: string; iat: number; exp: number;
    };
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isInteger(data.exp) || !Number.isInteger(data.iat) || data.exp <= now || data.iat > now + 30) return null;
    const user = demoUsers.find((candidate) => candidate.id === data.sub && candidate.role === data.role);
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email, role: user.role, expiresAt: data.exp };
  } catch {
    return null;
  }
};

export const getDemoSession = async () => {
  const store = await cookies();
  return verifyDemoToken(store.get(DEMO_SESSION_COOKIE)?.value);
};

export const demoCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: true,
  path: "/",
  maxAge: SESSION_SECONDS,
};
