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

export default function AdminVragenPage() {
  const supabase = createClient();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");
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

    if (!question || !optionA || !optionB || !optionC || !optionD) {
      setError("Vul de vraag en alle antwoordopties in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("mc_questions").insert({
      subject_id: subjectId,
      topic_id: topicId || null,
      question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answer: correctAnswer,
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

    setMessage("MC-vraag opgeslagen.");

    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("A");
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
          ← Terug naar account
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Admin
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            MC-vraag toevoegen.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Voeg hier nieuwe meerkeuzevragen toe voor staatsrecht en
            internationaal recht. De vraag wordt opgeslagen in Supabase.
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
                  htmlFor="question"
                  className="text-sm font-semibold text-slate-700"
                >
                  Vraag
                </label>

                <textarea
                  id="question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows={4}
                  placeholder="Typ hier de MC-vraag..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Antwoord A
                  </label>
                  <input
                    value={optionA}
                    onChange={(event) => setOptionA(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Antwoord B
                  </label>
                  <input
                    value={optionB}
                    onChange={(event) => setOptionB(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Antwoord C
                  </label>
                  <input
                    value={optionC}
                    onChange={(event) => setOptionC(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Antwoord D
                  </label>
                  <input
                    value={optionD}
                    onChange={(event) => setOptionD(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="correctAnswer"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Juiste antwoord
                  </label>

                  <select
                    id="correctAnswer"
                    value={correctAnswer}
                    onChange={(event) => setCorrectAnswer(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

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
                    Premium-vraag
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
                  placeholder="Leg hier uit waarom het juiste antwoord klopt en waarom de andere antwoorden minder juist zijn..."
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
                {loading ? "Opslaan..." : "MC-vraag opslaan"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}