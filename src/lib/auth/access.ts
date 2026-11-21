import { notFound, redirect } from "next/navigation";
import { getDemoSession } from "./session";
import type { PanelRole } from "./types";

export async function requirePanelRole(role: PanelRole) {
  const session = await getDemoSession();
  if (!session) redirect("/acceso");
  // Oculta la existencia de otros módulos; no basta con ocultar enlaces.
  if (session.role !== role) notFound();
  return session;
}
