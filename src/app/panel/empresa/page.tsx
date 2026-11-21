import type { Metadata } from "next";
import { ClipboardList, FilePenLine, ShieldCheck, UserRoundCheck, Users, Building2, MessageSquare, TrendingUp } from "lucide-react";
import { requirePanelRole } from "@/lib/auth/access";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = { title: "Panel EMPRESA", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function getStats() {
  const [contactsRes, buildingsRes, testimonialsRes, usersRes] = await Promise.all([
    supabaseAdmin.from("contacts").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("buildings").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("testimonials").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("panel_users").select("*", { count: "exact", head: true }),
  ]);
  return {
    contacts: contactsRes.count || 0,
    buildings: buildingsRes.count || 0,
    testimonials: testimonialsRes.count || 0,
    users: usersRes.count || 0,
  };
}

async function getRecentContacts() {
  const { data } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  return data || [];
}

export default async function CompanyPanel() {
  const session = await requirePanelRole("empresa");
  const stats = await getStats();
  const recentContacts = await getRecentContacts();

  return (
    <>
      <header className="panel-page-header">
        <span className="eyebrow">Panel EMPRESA</span>
        <h1>Base de operación y control.</h1>
        <p>Sesión de {session.name}. Conectado a Supabase. Datos en tiempo real.</p>
      </header>

      {/* Stats */}
      <section className="panel-stats-grid" aria-label="Estadísticas">
        <div className="panel-stat-card">
          <Users size={24} />
          <strong>{stats.contacts}</strong>
          <span>Contactos CRM</span>
        </div>
        <div className="panel-stat-card">
          <Building2 size={24} />
          <strong>{stats.buildings}</strong>
          <span>Edificios</span>
        </div>
        <div className="panel-stat-card">
          <MessageSquare size={24} />
          <strong>{stats.testimonials}</strong>
          <span>Testimonios</span>
        </div>
        <div className="panel-stat-card">
          <TrendingUp size={24} />
          <strong>{stats.users}</strong>
          <span>Usuarios</span>
        </div>
      </section>

      {/* Recent Contacts */}
      <section className="panel-data-section">
        <h2><ClipboardList size={20} /> Últimos contactos</h2>
        {recentContacts.length === 0 ? (
          <p className="panel-empty">No hay contactos registrados.</p>
        ) : (
          <table className="panel-table">
            <thead>
              <tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Perfil</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {recentContacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.full_name}</td>
                  <td>{c.email || "—"}</td>
                  <td>{c.phone || "—"}</td>
                  <td>{c.profile || "—"}</td>
                  <td><span className={`panel-badge panel-badge--${c.status}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modules */}
      <section className="panel-module-grid" aria-label="Módulos">
        <article className="panel-module">
          <ClipboardList size={23} />
          <h3>Bandeja CRM</h3>
          <p>Gestión de contactos, asignación y seguimiento de cotizaciones.</p>
          <span>Activo · Supabase</span>
        </article>
        <article className="panel-module">
          <FilePenLine size={23} />
          <h3>Contenidos</h3>
          <p>Edificios, testimonios, slides e imágenes con control de publicación.</p>
          <span>Activo · Supabase</span>
        </article>
        <article className="panel-module">
          <UserRoundCheck size={23} />
          <h3>Usuarios y permisos</h3>
          <p>Gestión de accesos para empresa, administradores y asesores.</p>
          <span>Activo · Supabase</span>
        </article>
        <article className="panel-module">
          <ShieldCheck size={23} />
          <h3>ARSOP y auditoría</h3>
          <p>Registro de acciones y cumplimiento de la Ley 21.719.</p>
          <span>En desarrollo</span>
        </article>
      </section>
    </>
  );
}
