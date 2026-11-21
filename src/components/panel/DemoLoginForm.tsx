"use client";

import { FormEvent, useState } from "react";

type Account = { email: string; label: string };

export function DemoLoginForm({ accounts }: { accounts: Account[] }) {
  const [email, setEmail] = useState(accounts[0]?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json() as { redirectTo?: string; message?: string };
      if (!response.ok || !data.redirectTo) {
        setError(data.message ?? "No fue posible iniciar la sesión.");
        return;
      }
      window.location.assign(data.redirectTo);
    } catch {
      setError("No fue posible contactar el servicio. Inténtelo nuevamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="access-form" onSubmit={submit}>
      <div className="demo-account-picker" aria-label="Perfiles disponibles">
        {accounts.map((account) => (
          <button type="button" key={account.email} className={email === account.email ? "selected" : ""} onClick={() => setEmail(account.email)}>
            {account.label}
          </button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="demo-email">Correo</label>
        <input id="demo-email" name="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
      </div>
      <div className="field">
        <label htmlFor="demo-password">Clave de acceso</label>
        <input id="demo-password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required maxLength={200} />
      </div>
      {error && <p className="access-error" role="alert">{error}</p>}
      <button className="button access-submit" type="submit" disabled={pending}>{pending ? "Verificando…" : "Entrar al panel"}</button>
      <p className="access-help">La clave de acceso la tiene el equipo de Prosol. Si no la recuerda, contacte a Alejandro Olate.</p>
    </form>
  );
}
