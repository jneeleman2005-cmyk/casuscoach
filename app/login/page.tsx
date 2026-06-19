"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/account";
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
            Inloggen
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Log in om je accountomgeving te bekijken.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Gebruik je e-mailadres en wachtwoord om toegang te krijgen tot je
            persoonlijke omgeving binnen CasusCoach.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-semibold">Accountomgeving</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bekijk je accountstatus en later je voortgang.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-semibold">Premium-status</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Later wordt hier gecontroleerd of je Premium actief is.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Inloggen</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Vul je gegevens in om in te loggen.
          </p>

          <form className="mt-8 space-y-5">
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
                placeholder="••••••••"
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

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Bezig met inloggen..." : "Inloggen"}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <p>
              Nog geen account?{" "}
              <a href="/registreren" className="font-semibold text-blue-700">
                Maak een account aan
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}