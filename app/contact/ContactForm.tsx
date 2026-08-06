"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { createClient } from "../lib/supabase/client";

const categories = [
  { value: "algemeen", label: "Algemene vraag" },
  { value: "fout-melden", label: "Fout melden" },
  { value: "vraag-inhoud", label: "Inhoudelijke fout in vraag of casus" },
  { value: "technisch", label: "Technisch probleem" },
];

const maxMessageLength = 2000;

export default function ContactForm() {
  const searchParams = useSearchParams();

  const initialCategory = useMemo(() => {
    const onderwerp = searchParams.get("onderwerp");

    if (
      onderwerp === "fout-melden" ||
      onderwerp === "vraag-inhoud" ||
      onderwerp === "technisch"
    ) {
      return onderwerp;
    }

    return "algemeen";
  }, [searchParams]);

  const initialPage = useMemo(() => {
    return searchParams.get("pagina") ?? "";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setSuccess("");
    setError("");

    if (website.trim().length > 0) {
      setSuccess("Bedankt. Je melding is opgeslagen.");
      setSaving(false);
      return;
    }

    if (message.trim().length < 10) {
      setError("Omschrijf je melding iets uitgebreider.");
      setSaving(false);
      return;
    }

    if (message.trim().length > maxMessageLength) {
      setError("Je melding is te lang. Houd je bericht onder 2000 tekens.");
      setSaving(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.from("feedback_reports").insert({
      email: email.trim() || null,
      category,
      page: page.trim() || null,
      message: message.trim(),
    });

    if (error) {
      setError("Je melding kon niet worden opgeslagen. Probeer het opnieuw.");
      setSaving(false);
      return;
    }

    setSuccess("Bedankt. Je melding is opgeslagen.");
    setEmail("");
    setCategory("algemeen");
    setPage("");
    setMessage("");
    setWebsite("");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="hidden">
        Website
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Waar gaat het over?
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Pagina
        <input
          type="text"
          value={page}
          onChange={(event) => setPage(event.target.value)}
          placeholder="/mc"
          maxLength={200}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        E-mailadres optioneel
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="naam@example.com"
          maxLength={200}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-700">
        Melding
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={6}
          minLength={10}
          maxLength={maxMessageLength}
          placeholder="Beschrijf wat er niet klopt of wat er beter kan."
          className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <p className="text-sm text-slate-500">
        {message.length} / {maxMessageLength} tekens
      </p>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {saving ? "Versturen..." : "Melding versturen"}
      </button>
    </form>
  );
}