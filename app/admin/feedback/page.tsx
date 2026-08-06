"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type FeedbackStatus = "open" | "bekeken" | "opgelost";

type FeedbackReport = {
  id: string;
  email: string | null;
  category: string;
  page: string | null;
  message: string;
  status: FeedbackStatus;
  created_at: string;
};

const statusOptions: FeedbackStatus[] = ["open", "bekeken", "opgelost"];

function formatCategory(category: string) {
  if (category === "fout-melden") return "Fout melden";
  if (category === "vraag-inhoud") return "Vraaginhoud";
  if (category === "technisch") return "Technisch probleem";
  return "Algemeen";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminFeedbackPage() {
  const supabase = createClient();

  const [reports, setReports] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | FeedbackStatus>("all");

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("feedback_reports")
        .select("id, email, category, page, message, status, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Feedback kon niet worden geladen.");
        setLoading(false);
        return;
      }

      setReports((data ?? []) as FeedbackReport[]);
      setLoading(false);
    }

    loadReports();
  }, [supabase]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      const searchable = [
        report.message,
        report.email ?? "",
        report.page ?? "",
        report.category,
        report.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [reports, search, statusFilter]);

  async function updateStatus(id: string, status: FeedbackStatus) {
    const previousReports = reports;

    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report,
      ),
    );

    const { error } = await supabase
      .from("feedback_reports")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setReports(previousReports);
      setError("Status kon niet worden bijgewerkt.");
    }
  }

  async function deleteReport(id: string) {
    const confirmed = window.confirm(
      "Weet je zeker dat je deze feedbackmelding wilt verwijderen?",
    );

    if (!confirmed) return;

    const previousReports = reports;
    setReports((current) => current.filter((report) => report.id !== id));

    const { error } = await supabase
      .from("feedback_reports")
      .delete()
      .eq("id", id);

    if (error) {
      setReports(previousReports);
      setError("Feedbackmelding kon niet worden verwijderd.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-700">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Feedback
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Bekijk meldingen van studenten, werk de status bij en verwijder
            meldingen die zijn afgehandeld.
          </p>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Zoeken op bericht, pagina, e-mail of status..."
            className="min-w-0 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | FeedbackStatus)
            }
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">Alle statussen</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading ? (
            <p className="p-4 text-sm text-slate-600">Feedback laden...</p>
          ) : null}

          {!loading && filteredReports.length === 0 ? (
            <p className="p-4 text-sm text-slate-600">
              Geen feedbackmeldingen gevonden.
            </p>
          ) : null}

          <div className="space-y-4">
            {filteredReports.map((report) => (
              <article
                key={report.id}
                className="grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[minmax(0,1fr)_170px]"
              >
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {formatCategory(report.category)}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {report.status}
                    </span>
                    {report.page ? (
                      <span
                        className="max-w-full rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
                        style={{ overflowWrap: "anywhere" }}
                      >
                        {report.page}
                      </span>
                    ) : null}
                  </div>

                  <p
                    className="mt-4 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-950"
                    style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
                  >
                    {report.message}
                  </p>

                  <div className="mt-4 flex min-w-0 flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <span>Ingestuurd op {formatDate(report.created_at)}</span>
                    {report.email ? (
                      <span style={{ overflowWrap: "anywhere" }}>
                        Door {report.email}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-3 md:items-stretch">
                  <select
                    value={report.status}
                    onChange={(event) =>
                      updateStatus(
                        report.id,
                        event.target.value as FeedbackStatus,
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
                  >
                    Verwijderen
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
