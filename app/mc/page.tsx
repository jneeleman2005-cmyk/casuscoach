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

type McQuestion = {
  id: string;
  subject_id: string;
  topic_id: string | null;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: string;
  is_uitgebreid: boolean;
};

export default function McPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<McQuestion[]>([]);

  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [savingAttempt, setSavingAttempt] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => topic.subject_id === subjectId);
  }, [topics, subjectId]);

  const currentQuestion = questions[currentIndex];

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
    async function loadQuestions() {
      if (!subjectId) {
        return;
      }

      setLoading(true);
      setError("");
      setQuestions([]);
      setCurrentIndex(0);
      setSelectedAnswer("");
      setShowResult(false);
      setSaveMessage("");
      setSaveError("");

      const supabase = createClient();

      let query = supabase
        .from("mc_questions")
        .select(
          "id, subject_id, topic_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, is_uitgebreid",
        )
        .eq("subject_id", subjectId)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (topicId) {
        query = query.eq("topic_id", topicId);
      }

      const { data, error } = await query;

      if (error) {
        setError("MC-vragen konden niet worden geladen.");
        setLoading(false);
        return;
      }

      setQuestions(data ?? []);
      setLoading(false);
    }

    loadQuestions();
  }, [subjectId, topicId]);

  async function handleCheckAnswer() {
    if (!selectedAnswer || !currentQuestion) {
      return;
    }

    setShowResult(true);
    setSavingAttempt(true);
    setSaveMessage("");
    setSaveError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaveMessage("Log in om je voortgang op te slaan.");
      setSavingAttempt(false);
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    const { error } = await supabase.from("user_mc_attempts").insert({
      question_id: currentQuestion.id,
      selected_answer: selectedAnswer,
      correct_answer: currentQuestion.correct_answer,
      is_correct: isCorrect,
    });

    if (error) {
      setSaveError("Je poging kon niet worden opgeslagen.");
      setSavingAttempt(false);
      return;
    }

    setSaveMessage("Je poging is opgeslagen.");
    setSavingAttempt(false);
  }

  function handleNextQuestion() {
    setSelectedAnswer("");
    setShowResult(false);
    setSaveMessage("");
    setSaveError("");

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((value) => value + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  const answerOptions = currentQuestion
    ? [
        { label: "A", value: currentQuestion.option_a },
        { label: "B", value: currentQuestion.option_b },
        { label: "C", value: currentQuestion.option_c },
        { label: "D", value: currentQuestion.option_d },
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <a
          href="/oefenen"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Ã¢â€ Â Terug naar oefenen
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            MC-vragen
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Oefen meerkeuzevragen per rechtsgebied en leerstuk.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Kies een rechtsgebied en leerstuk. De vragen worden geladen uit
            Supabase, inclusief het juiste antwoord en de toelichting.
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
            <p className="text-slate-600">Vragen laden...</p>
          </section>
        ) : null}

        {!loading && !currentQuestion ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Nog geen vragen beschikbaar.</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Voor dit rechtsgebied of leerstuk zijn nog geen MC-vragen
              toegevoegd. Voeg eerst vragen toe via de adminpagina.
            </p>

            <a
              href="/admin/vragen"
              className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Vraag toevoegen
            </a>
          </section>
        ) : null}

        {currentQuestion ? (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Vraag {currentIndex + 1} van {questions.length}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    {currentQuestion.difficulty}
                  </span>

                  {currentQuestion.is_uitgebreid ? (
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

            <h2 className="mt-6 text-2xl font-bold leading-9">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 grid gap-4">
              {answerOptions.map((option) => {
                const isSelected = selectedAnswer === option.label;
                const isCorrect =
                  showResult &&
                  option.label === currentQuestion.correct_answer;
                const isWrong =
                  showResult &&
                  isSelected &&
                  option.label !== currentQuestion.correct_answer;

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      if (!showResult) {
                        setSelectedAnswer(option.label);
                      }
                    }}
                    className={[
                      "rounded-2xl border p-5 text-left transition",
                      isCorrect
                        ? "border-green-300 bg-green-50"
                        : isWrong
                          ? "border-red-300 bg-red-50"
                          : isSelected
                            ? "border-blue-300 bg-blue-50"
                            : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50",
                    ].join(" ")}
                  >
                    <p className="font-semibold">
                      {option.label}. {option.value}
                    </p>
                  </button>
                );
              })}
            </div>

            {showResult ? (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p
                  className={
                    selectedAnswer === currentQuestion.correct_answer
                      ? "font-bold text-green-700"
                      : "font-bold text-red-700"
                  }
                >
                  {selectedAnswer === currentQuestion.correct_answer
                    ? "Goed antwoord."
                    : `Niet goed. Het juiste antwoord is ${currentQuestion.correct_answer}.`}
                </p>

                <p className="mt-4 leading-8 text-slate-700">
                  {currentQuestion.explanation ||
                    "Er is nog geen toelichting toegevoegd."}
                </p>
              </div>
            ) : null}

            {saveError ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                {saveError}
              </div>
            ) : null}

            {saveMessage ? (
              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
                {saveMessage}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer || showResult || savingAttempt}
                className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {savingAttempt ? "Opslaan..." : "Antwoord controleren"}
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Volgende vraag
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}