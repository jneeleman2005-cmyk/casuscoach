"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function WachtwoordResettenPage() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setReady(true);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("Je wachtwoord moet minimaal 8 tekens lang zijn.");
      setSaving(false);
      return;
    }

    if (password !== passwordRepeat) {
      setError("De wachtwoorden komen niet overeen.");
      setSaving(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError("Je wachtwoord kon niet worden aangepast. Open de resetlink opnieuw of vraag een nieuwe resetlink aan.");
      setSaving(false);
      return;
    }

    setMessage("Je wachtwoord is aangepast. Je kunt nu inloggen met je nieuwe wachtwoord.");
    setPassword("");
    setPasswordRepeat("");
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <a
          href="/login"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Terug naar inloggen
        </a>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Nieuw wachtwoord
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Kies een nieuw wachtwoord.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Vul hieronder je nieuwe wachtwoord in. Gebruik minimaal 8 tekens.
          </p>

          {!ready ? (
            <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm leading-6 text-yellow-800">
              Deze pagina werkt alleen via de resetlink uit je e-mail. Als je
              geen geldige resetlink hebt, vraag dan opnieuw een resetlink aan.
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              Nieuw wachtwoord
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                placeholder="********"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Herhaal nieuw wachtwoord
              <input
                type="password"
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.target.value)}
                required
                minLength={8}
                placeholder="********"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={saving || !ready}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? "Opslaan..." : "Wachtwoord aanpassen"}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-600">
            Geen geldige link meer?{" "}
            <a
              href="/wachtwoord-vergeten"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              Vraag een nieuwe resetlink aan
            </a>
            .
          </div>
        </section>
      </div>
    </main>
  );
}