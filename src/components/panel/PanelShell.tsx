import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import type { PanelSession } from "@/lib/auth/types";
import { panelHome, roleLabel } from "@/lib/auth/types";

export function PanelShell({ session, children }: { session: PanelSession; children: React.ReactNode }) {
  return (
    <div className="panel-shell">
      <a className="skip-link" href="#panel-contenido">Saltar al contenido</a>
      <aside className="panel-sidebar">
        <Link className="panel-brand" href={panelHome(session.role)} aria-label="Ir a mi panel">
          <Image src="/images/logo-prosol.png" alt="Prosol Inversiones" width={164} height={53} />
        </Link>
        <span className="panel-demo-badge">F3-A · entorno demo</span>
        <nav className="panel-nav" aria-label="Navegación del panel">
          <Link href={panelHome(session.role)}><ShieldCheck size={18} />Mi panel</Link>
          <Link href="/"><ExternalLink size={17} />Volver al sitio público</Link>
        </nav>
        <div className="panel-user">
          <strong>{session.name}</strong>
          <span>{session.email}</span>
          <small>{roleLabel(session.role)}</small>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="panel-logout" type="submit"><LogOut size={17} />Cerrar sesión demo</button>
        </form>
      </aside>
      <div className="panel-workspace" id="panel-contenido" tabIndex={-1}>
        <div className="panel-topline">
          <span>Datos sintéticos · sin persistencia</span>
          <span>Sesión local de 30 minutos</span>
        </div>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  );
}
