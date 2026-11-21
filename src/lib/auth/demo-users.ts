import { createHash, timingSafeEqual } from "node:crypto";
import type { PanelRole } from "./types";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: PanelRole;
  passwordSha256: string;
};

// Clave de acceso compartida para el equipo de Prosol
const DEMO_PASSWORD_SHA256 = "015a9b88d27d472d4b533b28635ac95f529809078745c1a9e9f8849e631778e9";

export const demoUsers: DemoUser[] = [
  { id: "00000000-0000-4000-8000-000000000001", name: "Marcelo Olate", email: "empresa@f3.example", role: "empresa", passwordSha256: DEMO_PASSWORD_SHA256 },
  { id: "00000000-0000-4000-8000-000000000002", name: "Julio San Martín", email: "administrador@f3.example", role: "administrador", passwordSha256: DEMO_PASSWORD_SHA256 },
  { id: "00000000-0000-4000-8000-000000000003", name: "Asesor Demo", email: "asesor@f3.example", role: "asesor", passwordSha256: DEMO_PASSWORD_SHA256 },
];

export const findDemoUser = (email: string) =>
  demoUsers.find((user) => user.email === email.trim().toLowerCase());

export const verifyDemoPassword = (user: DemoUser, password: string) => {
  const received = Buffer.from(createHash("sha256").update(password).digest("hex"));
  const expected = Buffer.from(user.passwordSha256);
  return received.length === expected.length && timingSafeEqual(received, expected);
};
