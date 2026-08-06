"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Subject = {
  id: string;
  name: string;
};

type Topic = {
  id: string;
  subject_id: string;
  name: string;
};

type McQuestion = {
  id: string;
  subject_id: string;
  topic_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: string;
  is_premium: boolean;
  created_at: string;
};

type OpenCase = {
  id: string;
  subject_id: string;
  topic_id: string;
  title: string;
  case_text: string;
  model_answer: string;
  assessment_points: string;
  explanation: string;
  difficulty: string;
  is_premium: boolean;
  created_at: string;
};

type Mode = "mc" | "cases";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function AdminBeheerPage() {
  const [mode, setMode] = useState<Mode>("mc");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [mcQuestions, setMcQuestions] = useState<McQuestion[]>([]);
  const [openCases, setOpenCases] = useState<OpenCase[]>([]);

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingMc, setEditingMc] = useState<McQuestion | null>(null);
  const [editingCase, setEditingCase] = useState<OpenCase | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!adminUser) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      setAllowed(true);

      const [
        subjectsResult,
        topicsResult,
        mcResult,
        casesResult,
      ] = await Promise.all([
        supabase.from("subjects").select("id, name").order("sort_order"),
        supabase.from("topics").select("id, subject_id, name").order("sort_order"),
        supabase
          .from("mc_questions")
          .select(
            "id, subject_id, topic_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, is_premium, created_at",
          )
          .order("created_at", { ascending: false }),
        supabase
          .from("open_cases")
          .select(
            "id, subject_id, topic_id, title, case_text, model_answer, assessment_points, explanation, difficulty, is_premium, created_at",
          )
          .order("created_at", { ascending: false }),
      ]);

      if (subjectsResult.error || topicsResult.error || mcResult.error || casesResult.error) {
        setError("Content kon niet worden geladen.");
        setLoading(false);
        return;
      }

      setSubjects((subjectsResult.data ?? []) as Subject[]);
      setTopics((topicsResult.data ?? []) as Topic[]);
      setMcQuestions((mcResult.data ?? []) as McQuestion[]);
      setOpenCases((casesResult.data ?? []) as OpenCase[]);

      setLoading(false);
    }

    loadData();
  }, []);

  const subjectNameById = useMemo(() => {
    return new Map(subjects.map((subject) => [subject.id, subject.name]));
  }, [subjects]);

  const topicNameById = useMemo(() => {
    return new Map(topics.map((topic) => [topic.id, topic.name]));
  }, [topics]);

  const filteredMcQuestions = mcQuestions.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.question.toLowerCase().includes(value) ||
      subjectNameById.get(item.subject_id)?.toLowerCase().includes(value) ||
      topicNameById.get(item.topic_id)?.toLowerCase().includes(value)
    );
  });

  const filteredCases = openCases.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(value) ||
      item.case_text.toLowerCase().includes(value) ||
      subjectNameById.get(item.subject_id)?.toLowerCase().includes(value) ||
      topicNameById.get(item.topic_id)?.toLowerCase().includes(value)
    );
  });

  const topicsForEditingMc = topics.filter(
    (topic) => topic.subject_id === editingMc?.subject_id,
  );

  const topicsForEditingCase = topics.filter(
    (topic) => topic.subject_id === editingCase?.subject_id,
  );

  async function updateMcQuestion() {
    if (!editingMc) {
      return;
    }

    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("mc_questions")
      .update({
        subject_id: editingMc.subject_id,
        topic_id: editingMc.topic_id,
        question: editingMc.question,
        option_a: editingMc.option_a,
        option_b: editingMc.option_b,
        option_c: editingMc.option_c,
        option_d: editingMc.option_d,
        correct_answer: editingMc.correct_answer,
        explanation: editingMc.explanation,
        difficulty: editingMc.difficulty,
        is_premium: editingMc.is_premium,
      })
      .eq("id", editingMc.id);

    if (error) {
      setError("MC-vraag aanpassen mislukt.");
      return;
    }

    setMcQuestions((items) =>
      items.map((item) => (item.id === editingMc.id ? editingMc : item)),
    );
    setEditingMc(null);
    setMessage("MC-vraag aangepast.");
  }

  async function updateOpenCase() {
    if (!editingCase) {
      return;
    }

    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase
      .from("open_cases")
      .update({
        subject_id: editingCase.subject_id,
        topic_id: editingCase.topic_id,
        title: editingCase.title,
        case_text: editingCase.case_text,
        model_answer: editingCase.model_answer,
        assessment_points: editingCase.assessment_points,
        explanation: editingCase.explanation,
        difficulty: editingCase.difficulty,
        is_premium: editingCase.is_premium,
      })
      .eq("id", editingCase.id);

    if (error) {
      setError("Casus aanpassen mislukt.");
      return;
    }

    setOpenCases((items) =>
      items.map((item) => (item.id === editingCase.id ? editingCase : item)),
    );
    setEditingCase(null);
    setMessage("Casus aangepast.");
  }

  async function deleteMcQuestion(id: string) {
    const firstConfirmed = window.confirm(
      "Let op: je gaat deze MC-vraag definitief verwijderen. Dit kan niet ongedaan worden gemaakt.\n\nWil je doorgaan?",
    );

    if (!firstConfirmed) {
      return;
    }

    const typedConfirmation = window.prompt(
      'Extra controle: typ exact "VERWIJDEREN" om deze MC-vraag definitief te verwijderen.',
    );

    if (typedConfirmation !== "VERWIJDEREN") {
      setMessage("");
      setError("Verwijderen geannuleerd. Je moet exact VERWIJDEREN typen.");
      return;
    }

    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.from("mc_questions").delete().eq("id", id);

    if (error) {
      setError("MC-vraag verwijderen mislukt.");
      return;
    }

    setMcQuestions((items) => items.filter((item) => item.id !== id));
    setMessage("MC-vraag definitief verwijderd.");
  }

  async function deleteOpenCase(id: string) {
    const firstConfirmed = window.confirm(
      "Let op: je gaat deze casus definitief verwijderen. Dit kan niet ongedaan worden gemaakt.\n\nWil je doorgaan?",
    );

    if (!firstConfirmed) {
      return;
    }

    const typedConfirmation = window.prompt(
      'Extra controle: typ exact "VERWIJDEREN" om deze casus definitief te verwijderen.',
    );

    if (typedConfirmation !== "VERWIJDEREN") {
      setMessage("");
      setError("Verwijderen geannuleerd. Je moet exact VERWIJDEREN typen.");
      return;
    }

    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.from("open_cases").delete().eq("id", id);

    if (error) {
      setError("Casus verwijderen mislukt.");
      return;
    }

    setOpenCases((items) => items.filter((item) => item.id !== id));
    setMessage("Casus definitief verwijderd.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <p className="text-slate-600">Content laden...</p>
        </div>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <a
            href="/account"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            Terug naar account
          </a>

          <section className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
              Geen toegang
            </p>

            <h1 className="mt-4 text-4xl font-bold text-red-950">
              Je hebt geen adminrechten.
            </h1>

            <p className="mt-6 leading-8 text-red-950/80">
              Alleen adminaccounts kunnen content beheren.
            </p>
          </section>
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

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Content beheren
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Bewerk of verwijder bestaande oefenstof.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Gebruik deze pagina om bestaande MC-vragen en open casussen snel
              te controleren, aan te passen of te verwijderen.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Overzicht
            </p>

            <p className="mt-3 text-2xl font-bold text-blue-950">
              {mcQuestions.length} MC-vragen Â· {openCases.length} casussen
            </p>

            <p className="mt-3 leading-7 text-blue-950/80">
              Alle content komt rechtstreeks uit Supabase.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode("mc")}
                className={
                  mode === "mc"
                    ? "rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm"
                    : "rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
                }
              >
                MC-vragen
              </button>

              <button
                type="button"
                onClick={() => setMode("cases")}
                className={
                  mode === "cases"
                    ? "rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm"
                    : "rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:border-green-200 hover:text-green-700"
                }
              >
                Casussen
              </button>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Zoeken op vraag, titel, vak of leerstuk..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:max-w-md"
            />
          </div>

          {message ? (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}
        </section>

        {mode === "mc" ? (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">Vraag</th>
                  <th className="px-4 py-4 font-semibold">Vak</th>
                  <th className="px-4 py-4 font-semibold">Leerstuk</th>
                  <th className="px-4 py-4 font-semibold">Niveau</th>
                  <th className="px-4 py-4 font-semibold">Datum</th>
                  <th className="px-4 py-4 font-semibold">Acties</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredMcQuestions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="line-clamp-2 font-semibold">
                        {item.question}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {subjectNameById.get(item.subject_id) ?? "Onbekend"}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {topicNameById.get(item.topic_id) ?? "Onbekend"}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {item.difficulty}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingMc(item)}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          Bewerken
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteMcQuestion(item.id)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Verwijderen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMcQuestions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Geen MC-vragen gevonden.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>
        ) : (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">Casus</th>
                  <th className="px-4 py-4 font-semibold">Vak</th>
                  <th className="px-4 py-4 font-semibold">Leerstuk</th>
                  <th className="px-4 py-4 font-semibold">Niveau</th>
                  <th className="px-4 py-4 font-semibold">Datum</th>
                  <th className="px-4 py-4 font-semibold">Acties</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="line-clamp-2 font-semibold">
                        {item.title}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {subjectNameById.get(item.subject_id) ?? "Onbekend"}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {topicNameById.get(item.topic_id) ?? "Onbekend"}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {item.difficulty}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingCase(item)}
                          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                        >
                          Bewerken
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteOpenCase(item.id)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          Verwijderen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCases.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Geen casussen gevonden.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>
        )}

        {editingMc ? (
          <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <h2 className="text-2xl font-bold text-blue-950">
              MC-vraag bewerken
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="text-sm font-semibold text-blue-950">
                Rechtsgebied
                <select
                  value={editingMc.subject_id}
                  onChange={(event) =>
                    setEditingMc({
                      ...editingMc,
                      subject_id: event.target.value,
                      topic_id:
                        topics.find((topic) => topic.subject_id === event.target.value)
                          ?.id ?? "",
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-blue-950">
                Leerstuk
                <select
                  value={editingMc.topic_id}
                  onChange={(event) =>
                    setEditingMc({ ...editingMc, topic_id: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
                >
                  {topicsForEditingMc.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-blue-950">
              Vraag
              <textarea
                value={editingMc.question}
                onChange={(event) =>
                  setEditingMc({ ...editingMc, question: event.target.value })
                }
                rows={4}
                className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
              />
            </label>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {(["A", "B", "C", "D"] as const).map((letter) => {
                const key = `option_${letter.toLowerCase()}` as
                  | "option_a"
                  | "option_b"
                  | "option_c"
                  | "option_d";

                return (
                  <label
                    key={letter}
                    className="text-sm font-semibold text-blue-950"
                  >
                    Antwoord {letter}
                    <input
                      value={editingMc[key]}
                      onChange={(event) =>
                        setEditingMc({
                          ...editingMc,
                          [key]: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
                    />
                  </label>
                );
              })}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="text-sm font-semibold text-blue-950">
                Juiste antwoord
                <select
                  value={editingMc.correct_answer}
                  onChange={(event) =>
                    setEditingMc({
                      ...editingMc,
                      correct_answer: event.target.value as "A" | "B" | "C" | "D",
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-blue-950">
                Niveau
                <select
                  value={editingMc.difficulty}
                  onChange={(event) =>
                    setEditingMc({ ...editingMc, difficulty: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
                >
                  <option value="makkelijk">Makkelijk</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="moeilijk">Moeilijk</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-blue-950">
              Toelichting
              <textarea
                value={editingMc.explanation}
                onChange={(event) =>
                  setEditingMc({ ...editingMc, explanation: event.target.value })
                }
                rows={5}
                className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={updateMcQuestion}
                className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-800"
              >
                Wijzigingen opslaan
              </button>

              <button
                type="button"
                onClick={() => setEditingMc(null)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
              >
                Annuleren
              </button>
            </div>
          </section>
        ) : null}

        {editingCase ? (
          <section className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-8">
            <h2 className="text-2xl font-bold text-green-950">
              Casus bewerken
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="text-sm font-semibold text-green-950">
                Rechtsgebied
                <select
                  value={editingCase.subject_id}
                  onChange={(event) =>
                    setEditingCase({
                      ...editingCase,
                      subject_id: event.target.value,
                      topic_id:
                        topics.find((topic) => topic.subject_id === event.target.value)
                          ?.id ?? "",
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-green-950">
                Leerstuk
                <select
                  value={editingCase.topic_id}
                  onChange={(event) =>
                    setEditingCase({ ...editingCase, topic_id: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
                >
                  {topicsForEditingCase.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Titel
              <input
                value={editingCase.title}
                onChange={(event) =>
                  setEditingCase({ ...editingCase, title: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Casustekst
              <textarea
                value={editingCase.case_text}
                onChange={(event) =>
                  setEditingCase({ ...editingCase, case_text: event.target.value })
                }
                rows={6}
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Modelantwoord
              <textarea
                value={editingCase.model_answer}
                onChange={(event) =>
                  setEditingCase({
                    ...editingCase,
                    model_answer: event.target.value,
                  })
                }
                rows={6}
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Beoordelingspunten
              <textarea
                value={editingCase.assessment_points}
                onChange={(event) =>
                  setEditingCase({
                    ...editingCase,
                    assessment_points: event.target.value,
                  })
                }
                rows={5}
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Toelichting
              <textarea
                value={editingCase.explanation}
                onChange={(event) =>
                  setEditingCase({
                    ...editingCase,
                    explanation: event.target.value,
                  })
                }
                rows={5}
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              />
            </label>

            <label className="mt-5 block text-sm font-semibold text-green-950">
              Niveau
              <select
                value={editingCase.difficulty}
                onChange={(event) =>
                  setEditingCase({ ...editingCase, difficulty: event.target.value })
                }
                className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3"
              >
                <option value="makkelijk">Makkelijk</option>
                <option value="gemiddeld">Gemiddeld</option>
                <option value="moeilijk">Moeilijk</option>
              </select>
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={updateOpenCase}
                className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-green-800"
              >
                Wijzigingen opslaan
              </button>

              <button
                type="button"
                onClick={() => setEditingCase(null)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm hover:border-green-200 hover:text-green-700"
              >
                Annuleren
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}