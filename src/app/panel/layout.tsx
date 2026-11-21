import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PanelShell } from "@/components/panel/PanelShell";
import { getDemoSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Panel restringido",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getDemoSession();
  if (!session) redirect("/acceso");
  return <PanelShell session={session}>{children}</PanelShell>;
}
