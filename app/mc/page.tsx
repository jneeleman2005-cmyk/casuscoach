"use client";

import { useMemo, useRef, useState } from "react";
import { subjects } from "../data/subjects";
import { mcQuestions } from "../data/mcQuestions";

const FREE_QUESTION_LIMIT = 3;

export default function McPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const topicsSectionRef = useRef<HTMLElement | null>(null);

  const subject = subjects.find((item) => item.slug === selectedSubject);

  const allFilteredQuestions = useMemo(() => {
    return mcQuestions.filter((question) => {
      return (
        question.subject === selectedSubject &&
        selectedTopics.includes(question.topic)
      );
    });
  }, [selectedSubject, selectedTopics]);

  const filteredQuestions = allFilteredQuestions.slice(0, FREE_QUESTION_LIMIT);
  const question = filteredQuestions[currentQuestionIndex];

  const selected = question?.answers.find(
    (answer) => answer.id === selectedAnswer
  );

  function selectSubject(slug: string) {
    setSelectedSubject(slug);
    setSelectedTopics([]);

    setTimeout(() => {
      topicsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((previous) => {
      if (previous.includes(topic)) {
        return previous.filter((item) => item !== topic);
      }

      return [...previous, topic];
    });
  }

  function selectAllTopics() {
    if (!subject) return;
    setSelectedTopics(subject.topics);
  }

  function clearTopics() {
    setSelectedTopics([]);
  }

  function startPractice() {
    if (!selectedSubject) {
      alert("Kies eerst een rechtsgebied.");
      return;
    }

    if (selectedTopics.length === 0) {
      alert("Kies minimaal één leerstuk.");
      return;
    }

    if (allFilteredQuestions.length === 0) {
      alert("Voor deze selectie staan nog geen MC-vragen klaar.");
      return;
    }

    setHasStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  }

  function handleAnswer(answerId: string) {
    if (!question) return;
    if (selectedAnswer !== null) return;

    const answer = question.answers.find((item) => item.id === answerId);

    setSelectedAnswer(answerId);

    if (answer?.correct) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNextQuestion() {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= filteredQuestions.length) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
  }

  function restartSameSelection() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  }

  function backToSelection() {
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  }

  if (hasStarted && isFinished) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={backToSelection}
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar selectie
          </button>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              MC-vragen · Gratis demo
            </p>

            <h1 className="mt-4 text-4xl font-bold">Je score</h1>

            <p className="mt-6 text-6xl font-bold text-blue-700">
              {score}/{filteredQuestions.length}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {score === filteredQuestions.length
                ? "Perfect. Je beheerst deze selectie goed."
                : score >= Math.ceil(filteredQuestions.length / 2)
                ? "Netjes. Je zit op de goede weg, maar er zijn nog leerstukken die scherper kunnen."
                : "Nog even dooroefenen. Lees vooral goed waarom de foute antwoorden niet kloppen."}
            </p>

            {allFilteredQuestions.length > FREE_QUESTION_LIMIT && (
              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left">
                <p className="font-semibold text-blue-800">
                  Je hebt de gratis demo afgerond
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-900/80">
                  Deze selectie bevat {allFilteredQuestions.length} vragen. In
                  de gratis demo kreeg je er {FREE_QUESTION_LIMIT}. Upgrade naar
                  een studentenabonnement voor onbeperkt oefenen.
                </p>

                <a
                  href="/abonnementen"
                  className="mt-4 inline-block rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  Bekijk studentenprijzen
                </a>
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={restartSameSelection}
                className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Opnieuw oefenen
              </button>

              <button
                onClick={backToSelection}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Nieuwe selectie
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (hasStarted && question) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={backToSelection}
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar selectie
          </button>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {subject?.name} · {question.topic}
              </p>

              <p className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Vraag {currentQuestionIndex + 1} van {filteredQuestions.length}
              </p>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-blue-700 transition-all"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / filteredQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold">{question.title}</h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {question.text}
            </p>

            <div className="mt-8 space-y-4">
              {question.answers.map((answer) => {
                const isSelected = selectedAnswer === answer.id;
                const showCorrect = selectedAnswer !== null && answer.correct;
                const showWrong = isSelected && !answer.correct;

                return (
                  <button
                    key={answer.id}
                    onClick={() => handleAnswer(answer.id)}
                    disabled={selectedAnswer !== null}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      showCorrect
                        ? "border-green-300 bg-green-50 text-green-950"
                        : showWrong
                        ? "border-red-300 bg-red-50 text-red-950"
                        : isSelected
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span className="font-bold">{answer.id}.</span>{" "}
                    {answer.text}
                  </button>
                );
              })}
            </div>

            {selected && (
              <div
                className={`mt-8 rounded-2xl border p-6 ${
                  selected.correct
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <h2
                  className={`text-xl font-bold ${
                    selected.correct ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {selected.correct ? "Goed antwoord" : "Niet helemaal"}
                </h2>

                <p className="mt-3 leading-7 text-slate-700">
                  {selected.explanation}
                </p>

                <button
                  onClick={handleNextQuestion}
                  className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
                >
                  {currentQuestionIndex + 1 === filteredQuestions.length
                    ? "Bekijk resultaat"
                    : "Volgende vraag"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a
          href="/oefenen"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          ← Terug naar oefenvormen
        </a>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="font-semibold text-blue-800">Gratis proberen</p>

          <p className="mt-2 text-sm leading-6 text-blue-900/80">
            Je kunt nu maximaal {FREE_QUESTION_LIMIT} MC-vragen per selectie
            oefenen. Upgrade naar een studentenabonnement voor onbeperkt oefenen.
          </p>

          <a
            href="/abonnementen"
            className="mt-4 inline-block rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
          >
            Bekijk studentenprijzen
          </a>
        </div>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            MC-vragen oefenen
          </p>

          <h1 className="mt-4 text-4xl font-bold">Kies je rechtsgebied</h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            Kies eerst een rechtsgebied. Daarna selecteer je één of meerdere
            leerstukken. Je krijgt in de gratis demo een beperkte selectie van
            vragen.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {subjects.map((item) => {
            const isSelected = selectedSubject === item.slug;

            return (
              <button
                key={item.slug}
                onClick={() => selectSubject(item.slug)}
                className={`rounded-3xl border p-6 text-left shadow-sm transition ${
                  isSelected
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>

                    <p className="mt-3 text-slate-600">{item.description}</p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                    Beschikbaar
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </section>

        {subject && (
          <section
            ref={topicsSectionRef}
            className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Leerstukken
                </p>

                <h2 className="mt-2 text-3xl font-bold">{subject.name}</h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={selectAllTopics}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
                >
                  Selecteer alles
                </button>

                <button
                  onClick={clearTopics}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
                >
                  Wis selectie
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {subject.topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);

                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">{topic}</span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isSelected
                            ? "bg-blue-700 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isSelected ? "Geselecteerd" : "Kies"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Geselecteerd: {selectedTopics.length} leerstuk
                  {selectedTopics.length === 1 ? "" : "ken"}
                </p>

                {selectedTopics.length > 0 && (
                  <p className="mt-2 text-sm text-slate-500">
                    Gratis beschikbaar: {filteredQuestions.length} van{" "}
                    {allFilteredQuestions.length} vragen
                  </p>
                )}
              </div>

              <button
                onClick={startPractice}
                className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Start MC oefenen
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}