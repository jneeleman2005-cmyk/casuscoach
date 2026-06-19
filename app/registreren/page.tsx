"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function RegistrerenPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister() {
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();

  const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    data: {
      name,
    },
  },
});

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Account aangemaakt. Controleer eventueel je e-mail om je account te bevestigen.",
    );

    setName("");
    setEmail("");
    setPassword("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <section>
          <a
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar home
          </a>

          <p className="mt-12 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Account maken
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Maak een account aan om straks slimmer te oefenen.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Met een account kan CasusCoach later je voortgang bewaren,
            Premium-toegang controleren en persoonlijke oefenresultaten tonen.
          </p>

          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-semibold text-blue-950">
              Supabase is gekoppeld
            </p>

            <p className="mt-3 leading-7 text-blue-950/80">
              Deze registratiepagina maakt nu echte gebruikers aan in Supabase
              Auth. Voortgang en Premium-status koppelen we later.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Account aanmaken</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Vul je gegevens in om een account aan te maken.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Naam
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Je naam"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                E-mailadres
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jij@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Wachtwoord
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimaal 8 tekens"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

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
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Account wordt aangemaakt..." : "Account maken"}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <p>
              Heb je al een account?{" "}
              <a href="/login" className="font-semibold text-blue-700">
                Log in
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}