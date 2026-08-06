"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/wachtwoord-resetten`,
    });

    if (error) {
      setError("De resetmail kon niet worden verstuurd. Controleer je e-mailadres en probeer opnieuw.");
      setSending(false);
      return;
    }

    setMessage("Als dit e-mailadres bestaat, ontvang je een link om je wachtwoord opnieuw in te stellen.");
    setEmail("");
    setSending(false);
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
            Wachtwoord vergeten
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Stel je wachtwoord opnieuw in.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Vul het e-mailadres van je account in. Je ontvangt dan een link
            waarmee je een nieuw wachtwoord kunt kiezen.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              disabled={sending}
              className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {sending ? "Versturen..." : "Resetlink versturen"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}