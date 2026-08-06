"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Inloggen mislukt. Controleer je e-mailadres en wachtwoord.");
      setLoading(false);
      return;
    }

    window.location.href = "/account";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Terug naar home
        </a>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Inloggen
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              Welkom terug.
            </h1>

            <p className="mt-4 leading-8 text-slate-600">
              Log in om je voortgang, scores en opgeslagen casusantwoorden te
              bekijken.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-slate-700">
                E-mailadres
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="naam@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Wachtwoord
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="********"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <div className="flex justify-end">
                <a
                  href="/wachtwoord-vergeten"
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Wachtwoord vergeten?
                </a>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Inloggen..." : "Inloggen"}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Nog geen account?{" "}
              <a
                href="/registreren"
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Account maken
              </a>
              .
            </p>
          </div>

          <aside className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Met account
            </p>

            <h2 className="mt-3 text-2xl font-bold text-blue-950">
              Bewaar je voortgang.
            </h2>

            <div className="mt-6 space-y-4 text-blue-950/80">
              <p>Je MC-pogingen worden opgeslagen.</p>
              <p>Je casusantwoorden blijven gekoppeld aan je account.</p>
              <p>Je ziet je voortgang terug in je dashboard.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}