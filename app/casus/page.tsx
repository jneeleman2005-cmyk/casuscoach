"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase/client";

type Subject = {
  id: string;
  name: string;
  slug: string;
};

type Topic = {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
};

type OpenCase = {
  id: string;
  subject_id: string;
  topic_id: string | null;
  title: string;
  case_text: string;
  model_answer: string;
  assessment_points: string;
  explanation: string;
  difficulty: string;
  is_premium: boolean;
};

export default function CasusPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [cases, setCases] = useState<OpenCase[]>([]);

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const [savingAnswer, setSavingAnswer] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => topic.subject_id === subjectId);
  }, [topics, subjectId]);

  const currentCase = cases[currentIndex];

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("id, name, slug")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (subjectsError) {
        setError("Rechtsgebieden konden niet worden geladen.");
        setLoading(false);
        return;
      }

      const { data: topicsData, error: topicsError } = await supabase
        .from("topics")
        .select("id, subject_id, name, slug")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (topicsError) {
        setError("Leerstukken konden niet worden geladen.");
        setLoading(false);
        return;
      }

      setSubjects(subjectsData ?? []);
      setTopics(topicsData ?? []);

      if (subjectsData && subjectsData.length > 0) {
        setSubjectId(subjectsData[0].id);
      }

      setLoading(false);
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    const firstTopic = topics.find((topic) => topic.subject_id === subjectId);
    setTopicId(firstTopic?.id ?? "");
  }, [subjectId, topics]);

  useEffect(() => {
    async function loadCases() {
      if (!subjectId) {
        return;
      }

      setLoading(true);
      setError("");
      setCases([]);
      setCurrentIndex(0);
      setUserAnswer("");
      setShowAnswer(false);
      setSaveMessage("");
      setSaveError("");

      const supabase = createClient();

      let query = supabase
        .from("open_cases")
        .select(
          "id, subject_id, topic_id, title, case_text, model_answer, assessment_points, explanation, difficulty, is_premium",
        )
        .eq("subject_id", subjectId)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (topicId) {
        query = query.eq("topic_id", topicId);
      }

      const { data, error } = await query;

      if (error) {
        setError("Casussen konden niet worden geladen.");
        setLoading(false);
        return;
      }

      setCases(data ?? []);
      setLoading(false);
    }

    loadCases();
  }, [subjectId, topicId]);

  async function handleSaveAnswer() {
    setSavingAnswer(true);
    setSaveMessage("");
    setSaveError("");

    if (!currentCase) {
      setSaveError("Er is geen casus geselecteerd.");
      setSavingAnswer(false);
      return;
    }

    if (!userAnswer.trim()) {
      setSaveError("Schrijf eerst een antwoord voordat je opslaat.");
      setSavingAnswer(false);
      return;
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaveError("Je moet ingelogd zijn om je antwoord op te slaan.");
      setSavingAnswer(false);
      return;
    }

    const { error } = await supabase.from("user_case_attempts").insert({
      case_id: currentCase.id,
      answer: userAnswer,
    });

    if (error) {
      setSaveError("Opslaan mislukt. Probeer het opnieuw.");
      setSavingAnswer(false);
      return;
    }

    setSaveMessage("Je antwoord is opgeslagen.");
    setSavingAnswer(false);
  }

  function handleNextCase() {
    setShowAnswer(false);
    setUserAnswer("");
    setSaveMessage("");
    setSaveError("");

    if (currentIndex + 1 < cases.length) {
      setCurrentIndex((value) => value + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <a
          href="/oefenen"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          â† Terug naar oefenen
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Open casussen
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Oefen juridische casussen met modelantwoord.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Kies een rechtsgebied en leerstuk. Lees de casus, schrijf eerst je
            eigen antwoord en vergelijk dit daarna met het modelantwoord.
          </p>
        </section>

        <section className="mt-10 grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div>
            <label
              htmlFor="subject"
              className="text-sm font-semibold text-slate-700"
            >
              Rechtsgebied
            </label>

            <select
              id="subject"
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="topic"
              className="text-sm font-semibold text-slate-700"
            >
              Leerstuk
            </label>

            <select
              id="topic"
              value={topicId}
              onChange={(event) => setTopicId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Alle leerstukken</option>

              {filteredTopics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {error ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </section>
        ) : null}

        {loading ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-600">Casussen laden...</p>
          </section>
        ) : null}

        {!loading && !currentCase ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
              Nog geen casussen beschikbaar.
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              Voor dit rechtsgebied of leerstuk zijn nog geen open casussen
              toegevoegd. Voeg eerst een casus toe via de adminpagina.
            </p>

            <a
              href="/admin/casussen"
              className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Casus toevoegen
            </a>
          </section>
        ) : null}

        {currentCase ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Casus {currentIndex + 1} van {cases.length}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {currentCase.title}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {currentCase.difficulty}
                  </span>

                  {currentCase.is_premium ? (
                    <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Gratis toegang
                    </span>
                  ) : (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Gratis
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="whitespace-pre-line leading-8 text-slate-700">
                {currentCase.case_text}
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <label
                htmlFor="userAnswer"
                className="text-sm font-semibold uppercase tracking-wide text-blue-700"
              >
                Jouw antwoord
              </label>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Schrijf eerst zelf je juridische uitwerking. Daarna kun je jouw
                antwoord vergelijken met het modelantwoord.
              </p>

              <textarea
                id="userAnswer"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                rows={10}
                placeholder="Typ hier je eigen antwoord op de casus..."
                className="mt-5 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

         <div className="mt-5 flex flex-col gap-3 sm:flex-row">
  <button
    type="button"
    onClick={handleSaveAnswer}
    disabled={savingAnswer}
    className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
  >
    {savingAnswer ? "Opslaan..." : "Mijn antwoord opslaan"}
  </button>
</div>

              {saveError ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {saveError}
                </div>
              ) : null}

              {saveMessage ? (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
                  {saveMessage}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowAnswer((value) => !value)}
                className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                {showAnswer ? "Modelantwoord verbergen" : "Modelantwoord tonen"}
              </button>

              <button
                type="button"
                onClick={handleNextCase}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Volgende casus
              </button>
            </div>

            {showAnswer ? (
              <div className="mt-8 space-y-6">
                <article className="rounded-3xl border border-green-200 bg-green-50 p-6">
                  <h3 className="text-xl font-bold text-green-950">
                    Modelantwoord
                  </h3>

                  <p className="mt-4 whitespace-pre-line leading-8 text-green-950/80">
                    {currentCase.model_answer}
                  </p>
                </article>

                {currentCase.assessment_points ? (
                  <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                    <h3 className="text-xl font-bold text-blue-950">
                      Beoordelingspunten
                    </h3>

                    <p className="mt-4 whitespace-pre-line leading-8 text-blue-950/80">
                      {currentCase.assessment_points}
                    </p>
                  </article>
                ) : null}

                {currentCase.explanation ? (
                  <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-xl font-bold text-slate-950">
                      Toelichting
                    </h3>

                    <p className="mt-4 whitespace-pre-line leading-8 text-slate-700">
                      {currentCase.explanation}
                    </p>
                  </article>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}