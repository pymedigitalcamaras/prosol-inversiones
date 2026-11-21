import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { DemoLoginForm } from "@/components/panel/DemoLoginForm";
import { demoUsers } from "@/lib/auth/demo-users";
import { getDemoSession } from "@/lib/auth/session";
import { panelHome } from "@/lib/auth/types";

export const metadata: Metadata = {
  title: "Acceso de equipo",
  description: "Acceso restringido a los paneles de Prosol Inversiones.",
  robots: { index: false, follow: false, noarchive: true },
};
export const dynamic = "force-dynamic";

const labels = { empresa: "EMPRESA", administrador: "Administrador", asesor: "Asesor" } as const;

export default async function AccessPage() {
  const session = await getDemoSession();
  if (session) redirect(panelHome(session.role));

  return (
    <div className="access-page">
      <section className="access-intro">
        <Link className="access-back" href="/"><ArrowLeft size={17} />Volver al sitio público</Link>
        <div className="access-brand"><Image src="/images/logo-prosol.png" alt="Prosol Inversiones" width={190} height={61} /></div>
        <div className="access-intro-copy">
          <span className="eyebrow"><LockKeyhole size={16} />Acceso restringido</span>
          <h1>Un espacio de trabajo para cada responsabilidad.</h1>
          <p>EMPRESA, administradores y asesores tienen accesos separados conectados a la base de datos en tiempo real.</p>
        </div>
        <div className="access-security"><ShieldCheck size={22} /><span>Conexión activa con Supabase. Datos protegidos bajo la Ley 21.719.</span></div>
      </section>
      <section className="access-panel" aria-labelledby="access-form-title">
        <div className="access-form-wrap">
          <span className="panel-demo-badge">Paneles operativos · Supabase</span>
          <h2 id="access-form-title">Ingrese a su panel</h2>
          <p>Seleccione su perfil e ingrese la clave de acceso. La sesión dura 30 minutos.</p>
          <DemoLoginForm accounts={demoUsers.map((user) => ({ email: user.email, label: labels[user.role] }))} />
        </div>
      </section>
    </div>
  );
}
