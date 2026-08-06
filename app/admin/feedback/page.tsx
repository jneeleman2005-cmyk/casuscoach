"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type FeedbackReport = {
  id: string;
  user_id: string | null;
  email: string | null;
  category: string;
  page: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const statusOptions = ["open", "bekeken", "opgelost"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function labelCategory(value: string) {
  if (value === "fout-melden") return "Fout melden";
  if (value === "vraag-inhoud") return "Inhoudelijke fout";
  if (value === "technisch") return "Technisch probleem";
  return "Algemeen";
}

export default function AdminFeedbackPage() {
  const [reports, setReports] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("alle");
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      setMessage("");
      setError("");

      const supabase = createClient();

      const { data, error } = await supabase
        .from("feedback_reports")
        .select(
          "id, user_id, email, category, page, message, status, created_at, updated_at",
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError("Feedbackmeldingen laden mislukt.");
        setLoading(false);
        return;
      }

      setReports(data ?? []);
      setLoading(false);
    }

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "alle" || report.status === statusFilter;

      const haystack = [
        report.email ?? "",
        report.category,
        report.page ?? "",
        report.message,
        report.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query.length === 0 || haystack.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [reports, search, statusFilter]);

  async function updateStatus(id: string, status: string) {
    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("feedback_reports")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setError("Status aanpassen mislukt.");
      return;
    }

    setReports((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              updated_at: new Date().toISOString(),
            }
          : item,
      ),
    );

    setMessage("Status aangepast.");
  }

  async function deleteReport(id: string) {
    const confirmed = window.confirm(
      "Weet je zeker dat je deze feedbackmelding wilt verwijderen?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("feedback_reports")
      .delete()
      .eq("id", id);

    if (error) {
      setError("Feedbackmelding verwijderen mislukt.");
      return;
    }

    setReports((items) => items.filter((item) => item.id !== id));
    setMessage("Feedbackmelding verwijderd.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-600">Feedbackmeldingen laden...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <a
          href="/admin"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Terug naar admin
        </a>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Admin
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Feedbackmeldingen
              </h1>

              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                Bekijk meldingen van studenten, werk de status bij en verwijder
                meldingen die zijn afgehandeld.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">
                Totaal meldingen
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {reports.length}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Zoeken op bericht, pagina, e-mail of status..."
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="alle">Alle statussen</option>
              <option value="open">Open</option>
              <option value="bekeken">Bekeken</option>
              <option value="opgelost">Opgelost</option>
            </select>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
              {message}
            </div>
          ) : null}

          <div className="mt-8 space-y-5">
            {filteredReports.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
                Geen feedbackmeldingen gevonden.
              </div>
            ) : (
              filteredReports.map((report) => (
                <article
                  key={report.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {labelCategory(report.category)}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {report.status}
                        </span>

                        {report.page ? (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {report.page}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-800">
                        {report.message}
                      </p>

                      <div className="mt-4 text-sm leading-6 text-slate-500">
                        <p>
                          Ingestuurd op {formatDate(report.created_at)}
                        </p>

                        {report.email ? <p>E-mail: {report.email}</p> : null}
                      </div>
                    </div>

                    <div className="flex min-w-[220px] flex-col gap-3">
                      <select
                        value={report.status}
                        onChange={(event) =>
                          updateStatus(report.id, event.target.value)
                        }
                        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteReport(report.id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
                      >
                        Verwijderen
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}