"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";

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

export default function AdminCasussenPage() {
  const supabase = createClient();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [title, setTitle] = useState("");
  const [caseText, setCaseText] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
  const [assessmentPoints, setAssessmentPoints] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("basis");
  const [isPremium, setIsPremium] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => topic.subject_id === subjectId);
  }, [topics, subjectId]);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      setError("");

      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select("id, name, slug")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (subjectsError) {
        setError(subjectsError.message);
        setLoadingData(false);
        return;
      }

      const { data: topicsData, error: topicsError } = await supabase
        .from("topics")
        .select("id, subject_id, name, slug")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (topicsError) {
        setError(topicsError.message);
        setLoadingData(false);
        return;
      }

      setSubjects(subjectsData ?? []);
      setTopics(topicsData ?? []);

      if (subjectsData && subjectsData.length > 0) {
        setSubjectId(subjectsData[0].id);
      }

      setLoadingData(false);
    }

    loadData();
  }, [supabase]);

  useEffect(() => {
    const firstTopic = topics.find((topic) => topic.subject_id === subjectId);
    setTopicId(firstTopic?.id ?? "");
  }, [subjectId, topics]);

  async function handleSubmit() {
    setLoading(true);
    setMessage("");
    setError("");

    if (!subjectId) {
      setError("Kies eerst een rechtsgebied.");
      setLoading(false);
      return;
    }

    if (!title || !caseText || !modelAnswer) {
      setError("Vul minimaal de titel, casustekst en het modelantwoord in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("open_cases").insert({
      subject_id: subjectId,
      topic_id: topicId || null,
      title,
      case_text: caseText,
      model_answer: modelAnswer,
      assessment_points: assessmentPoints,
      explanation,
      difficulty,
      is_premium: isPremium,
      is_published: true,
    });

    if (error) {
      setError(
        "Opslaan mislukt. Controleer of je bent ingelogd en adminrechten hebt.",
      );
      setLoading(false);
      return;
    }

    setMessage("Casus opgeslagen.");

    setTitle("");
    setCaseText("");
    setModelAnswer("");
    setAssessmentPoints("");
    setExplanation("");
    setDifficulty("basis");
    setIsPremium(false);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a
          href="/account"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
        Terug naar account
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Admin
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Open casus toevoegen.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Voeg hier open casussen toe voor staatsrecht en internationaal
            recht. De casus wordt opgeslagen in Supabase.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {loadingData ? (
            <p className="text-slate-600">Gegevens laden...</p>
          ) : (
            <form className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
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
                    {filteredTopics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-700"
                >
                  Titel
                </label>

                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Bijvoorbeeld: Casus over ministerile verantwoordelijkheid"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="caseText"
                  className="text-sm font-semibold text-slate-700"
                >
                  Casustekst
                </label>

                <textarea
                  id="caseText"
                  value={caseText}
                  onChange={(event) => setCaseText(event.target.value)}
                  rows={8}
                  placeholder="Typ hier de volledige casus..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="modelAnswer"
                  className="text-sm font-semibold text-slate-700"
                >
                  Modelantwoord
                </label>

                <textarea
                  id="modelAnswer"
                  value={modelAnswer}
                  onChange={(event) => setModelAnswer(event.target.value)}
                  rows={8}
                  placeholder="Typ hier het voorbeeldantwoord/modelantwoord..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="assessmentPoints"
                  className="text-sm font-semibold text-slate-700"
                >
                  Beoordelingspunten
                </label>

                <textarea
                  id="assessmentPoints"
                  value={assessmentPoints}
                  onChange={(event) => setAssessmentPoints(event.target.value)}
                  rows={5}
                  placeholder="Bijvoorbeeld: benoemt juiste rechtsvraag, past norm toe, trekt conclusie..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="difficulty"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Moeilijkheid
                  </label>

                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(event) => setDifficulty(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="basis">Basis</option>
                    <option value="gemiddeld">Gemiddeld</option>
                    <option value="moeilijk">Moeilijk</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex min-h-[50px] w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={isPremium}
                      onChange={(event) => setIsPremium(event.target.checked)}
                    />
                    Premium-casus
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="explanation"
                  className="text-sm font-semibold text-slate-700"
                >
                  Toelichting
                </label>

                <textarea
                  id="explanation"
                  value={explanation}
                  onChange={(event) => setExplanation(event.target.value)}
                  rows={5}
                  placeholder="Extra toelichting, aandachtspunten of uitleg voor de student..."
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
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Opslaan..." : "Casus opslaan"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}