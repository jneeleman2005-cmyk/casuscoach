"use client";

import { useMemo, useRef, useState } from "react";

const FREE_QUESTION_LIMIT = 3;

const subjects = [
  {
    name: "Strafrecht",
    slug: "strafrecht",
    available: true,
    topics: ["Poging", "Medeplegen", "Noodweer", "Opzet", "Diefstal"],
  },
  {
    name: "Bestuursrecht",
    slug: "bestuursrecht",
    available: true,
    topics: ["Besluit", "Belanghebbende", "Bezwaar", "Evenredigheid", "Handhaving"],
  },
  {
    name: "Europees recht",
    slug: "europees-recht",
    available: true,
    topics: ["Voorrang", "Rechtstreekse werking", "Vrij verkeer", "EU-instellingen"],
  },
  {
    name: "Internationaal recht",
    slug: "internationaal-recht",
    available: true,
    topics: ["Verdragen", "Staatsaansprakelijkheid", "Immuniteit", "Mensenrechten"],
  },
  {
    name: "Staatsrecht",
    slug: "staatsrecht",
    available: true,
    topics: ["Grondrechten", "Trias politica", "Wetgeving", "Ministeriële verantwoordelijkheid"],
  },
  {
    name: "Goederenrecht",
    slug: "goederenrecht",
    available: true,
    topics: ["Eigendom", "Bezit", "Houderschap", "Overdracht"],
  },
  {
    name: "Bedrijfsrecht",
    slug: "bedrijfsrecht",
    available: true,
    topics: ["BV", "NV", "Bestuurdersaansprakelijkheid", "Vertegenwoordiging"],
  },
  {
    name: "Openbare orde recht",
    slug: "openbare-orde-recht",
    available: true,
    topics: ["APV", "Noodbevel", "Noodverordening", "Wet Damocles", "Demonstratierecht"],
  },
];

const questions = [
  {
    subject: "strafrecht",
    topic: "Poging",
    title: "De jas op de achterbank",
    text: "Daan slaat de ruit van een auto in en reikt naar een jas op de achterbank. Voordat hij de jas kan pakken, wordt hij aangehouden. Wat ligt juridisch het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Voltooide diefstal",
        correct: false,
        explanation:
          "Onjuist. Er is nog geen goed weggenomen. Voor voltooide diefstal moet sprake zijn van wegnemen.",
      },
      {
        id: "B",
        text: "Strafbare poging",
        correct: true,
        explanation:
          "Juist. De gedraging is naar uiterlijke verschijningsvorm gericht op voltooiing van de diefstal.",
      },
      {
        id: "C",
        text: "Geen strafbaar feit",
        correct: false,
        explanation:
          "Onjuist. Het inslaan van de ruit en reiken naar de jas kan juist een begin van uitvoering opleveren.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Medeplegen",
    title: "De uitkijk bij de scooter",
    text: "Noah forceert een scooterslot. Sam staat op de uitkijk en waarschuwt als er iemand aankomt. Zij hadden dit vooraf samen afgesproken. Wat is het meest waarschijnlijk?",
    answers: [
      {
        id: "A",
        text: "Sam kan medepleger zijn",
        correct: true,
        explanation:
          "Juist. Door de afspraak vooraf en zijn actieve bijdrage kan sprake zijn van nauwe en bewuste samenwerking.",
      },
      {
        id: "B",
        text: "Sam is nooit strafbaar omdat hij het slot niet forceert",
        correct: false,
        explanation:
          "Onjuist. Voor medeplegen hoef je niet zelf alle uitvoeringshandelingen te verrichten.",
      },
      {
        id: "C",
        text: "Alleen Noah is strafbaar",
        correct: false,
        explanation:
          "Onjuist. Sam levert mogelijk een voldoende significante bijdrage.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Noodweer",
    title: "De klap op straat",
    text: "Mila wordt plotseling aangevallen met vuistslagen. Zij duwt de aanvaller hard weg, waardoor die valt. Welke voorwaarde is vooral relevant?",
    answers: [
      {
        id: "A",
        text: "Er moet sprake zijn van een ogenblikkelijke wederrechtelijke aanranding",
        correct: true,
        explanation:
          "Juist. Noodweer vereist onder meer een onmiddellijke wederrechtelijke aanval en noodzakelijke verdediging.",
      },
      {
        id: "B",
        text: "Noodweer kan alleen bij dodelijk geweld",
        correct: false,
        explanation:
          "Onjuist. Noodweer kan ook spelen bij andere fysieke aanvallen.",
      },
      {
        id: "C",
        text: "Boosheid is voldoende voor noodweer",
        correct: false,
        explanation:
          "Onjuist. Er moet sprake zijn van een concrete wederrechtelijke aanranding.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Opzet",
    title: "De lekgestoken banden",
    text: "Rachid steekt bewust de banden van de auto van zijn buurman lek omdat hij boos is. Welk schuldverband ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Opzet",
        correct: true,
        explanation:
          "Juist. Hij handelt bewust en doelgericht. Boosheid sluit opzet niet uit.",
      },
      {
        id: "B",
        text: "Alleen culpa",
        correct: false,
        explanation:
          "Onjuist. Culpa ziet op verwijtbare onvoorzichtigheid; hier lijkt juist sprake van bewust handelen.",
      },
      {
        id: "C",
        text: "Geen opzet, want hij was boos",
        correct: false,
        explanation:
          "Onjuist. Emotie sluit opzet niet automatisch uit.",
      },
    ],
  },
  {
    subject: "strafrecht",
    topic: "Diefstal",
    title: "De koptelefoon in de tas",
    text: "Jesse stopt in een winkel een koptelefoon in zijn tas en loopt zonder te betalen naar buiten. Welk bestanddeel staat centraal?",
    answers: [
      {
        id: "A",
        text: "Wegnemen met het oogmerk van wederrechtelijke toe-eigening",
        correct: true,
        explanation: "Juist. Dat is de kern van diefstal.",
      },
      {
        id: "B",
        text: "Een ogenblikkelijke wederrechtelijke aanranding",
        correct: false,
        explanation: "Onjuist. Dat hoort bij noodweer.",
      },
      {
        id: "C",
        text: "Een hevige gemoedsbeweging",
        correct: false,
        explanation: "Onjuist. Dat hoort eerder bij noodweerexces.",
      },
    ],
  },
  {
    subject: "bestuursrecht",
    topic: "Belanghebbende",
    title: "Festival in het park",
    text: "Een gemeente verleent een vergunning voor een festival in een park. Een bewoner op 50 meter afstand maakt bezwaar wegens geluidsoverlast. Wat ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "De bewoner kan belanghebbende zijn",
        correct: true,
        explanation:
          "Juist. Door de korte afstand kan hij feitelijke gevolgen van enige betekenis ondervinden.",
      },
      {
        id: "B",
        text: "Alleen de organisator is belanghebbende",
        correct: false,
        explanation:
          "Onjuist. Ook derden kunnen belanghebbende zijn als zij rechtstreeks geraakt worden.",
      },
      {
        id: "C",
        text: "Een bewoner kan nooit bezwaar maken tegen een festivalvergunning",
        correct: false,
        explanation:
          "Onjuist. Dat kan wel als hij belanghebbende is.",
      },
    ],
  },
];

export default function McPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const topicsSectionRef = useRef<HTMLElement | null>(null);

  const subject = subjects.find((item) => item.slug === selectedSubject);

  const allFilteredQuestions = useMemo(() => {
    return questions.filter((question) => {
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
    setAnsweredQuestions(0);
    setIsFinished(false);
  }

  function handleAnswer(answerId: string) {
    if (!question) return;
    if (selectedAnswer !== null) return;

    const answer = question.answers.find((item) => item.id === answerId);

    setSelectedAnswer(answerId);
    setAnsweredQuestions((previous) => previous + 1);

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
    setAnsweredQuestions(0);
    setIsFinished(false);
  }

  function backToSelection() {
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(0);
    setIsFinished(false);
  }

  if (hasStarted && isFinished) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={backToSelection}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Terug naar selectie
          </button>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              MC-vragen · Gratis demo
            </p>

            <h1 className="mt-4 text-4xl font-bold">Je score</h1>

            <p className="mt-6 text-6xl font-bold">
              {score}/{filteredQuestions.length}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              {score === filteredQuestions.length
                ? "Perfect. Je beheerst deze selectie goed."
                : score >= Math.ceil(filteredQuestions.length / 2)
                ? "Netjes. Je zit op de goede weg, maar er zijn nog leerstukken die scherper kunnen."
                : "Nog even dooroefenen. Lees vooral goed waarom de foute antwoorden niet kloppen."}
            </p>

            {allFilteredQuestions.length > FREE_QUESTION_LIMIT && (
              <div className="mt-8 rounded-2xl border border-yellow-700 bg-yellow-950/30 p-5 text-left">
                <p className="font-semibold text-yellow-200">
                  Je hebt de gratis demo afgerond
                </p>
                <p className="mt-2 text-sm leading-6 text-yellow-100/80">
                  Deze selectie bevat {allFilteredQuestions.length} vragen. In
                  de gratis demo kreeg je er {FREE_QUESTION_LIMIT}. Upgrade naar
                  een studentenabonnement voor onbeperkt oefenen.
                </p>

                <a
                  href="/abonnementen"
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Bekijk studentenprijzen
                </a>
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={restartSameSelection}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Opnieuw oefenen
              </button>

              <button
                onClick={backToSelection}
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
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
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={backToSelection}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Terug naar selectie
          </button>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {subject?.name} · {question.topic}
              </p>

              <p className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                Vraag {currentQuestionIndex + 1} van {filteredQuestions.length}
              </p>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-white transition-all"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / filteredQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <h1 className="mt-8 text-3xl font-bold">{question.title}</h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
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
                        ? "border-green-700 bg-green-950/40"
                        : showWrong
                        ? "border-red-700 bg-red-950/40"
                        : isSelected
                        ? "border-white bg-slate-800"
                        : "border-slate-700 bg-slate-950 hover:bg-slate-800"
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
                    ? "border-green-700 bg-green-950/40"
                    : "border-red-700 bg-red-950/40"
                }`}
              >
                <h2 className="text-xl font-bold">
                  {selected.correct ? "Goed antwoord" : "Niet helemaal"}
                </h2>

                <p className="mt-3 leading-7 text-slate-200">
                  {selected.explanation}
                </p>

                <button
                  onClick={handleNextQuestion}
                  className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
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
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/oefenen" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar oefenvormen
        </a>

        <div className="mt-8 rounded-2xl border border-yellow-700 bg-yellow-950/30 p-5">
          <p className="font-semibold text-yellow-200">Gratis demo actief</p>
          <p className="mt-2 text-sm leading-6 text-yellow-100/80">
            Je kunt nu maximaal {FREE_QUESTION_LIMIT} MC-vragen per selectie
            oefenen. Upgrade naar een studentenabonnement voor onbeperkt oefenen.
          </p>

          <a
            href="/abonnementen"
            className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Bekijk studentenprijzen
          </a>
        </div>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            MC-vragen oefenen
          </p>

          <h1 className="mt-4 text-4xl font-bold">Kies je rechtsgebied</h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
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
                className={`rounded-3xl border p-6 text-left transition ${
                  isSelected
                    ? "border-white bg-slate-800"
                    : "border-slate-800 bg-slate-900 hover:border-white hover:bg-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>

                    <p className="mt-3 text-slate-300">
                      Oefen per leerstuk of met een combinatie van meerdere
                      leerstukken.
                    </p>
                  </div>

                  <span className="rounded-full bg-green-950 px-3 py-1 text-xs font-semibold text-green-300">
                    Beschikbaar
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
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
            className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Leerstukken
                </p>

                <h2 className="mt-2 text-3xl font-bold">{subject.name}</h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={selectAllTopics}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Selecteer alles
                </button>

                <button
                  onClick={clearTopics}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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
                        ? "border-white bg-slate-800"
                        : "border-slate-700 bg-slate-950 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold">{topic}</span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isSelected
                            ? "bg-white text-slate-950"
                            : "bg-slate-900 text-slate-400"
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
                <p className="text-sm text-slate-400">
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
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
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