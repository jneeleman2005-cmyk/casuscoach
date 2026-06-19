"use client";

import { useState } from "react";

const questions = [
  {
    title: "Poging tot diefstal",
    text: "Daan slaat de ruit van een auto in om een jas uit de auto te pakken. Voordat hij de jas kan pakken, wordt hij aangehouden door de politie. Waarvan is juridisch het meest waarschijnlijk sprake?",
    answers: [
      {
        id: "A",
        text: "Voltooide diefstal",
        correct: false,
        explanation:
          "Onjuist. Er is nog geen goed weggenomen. Voor voltooide diefstal moet sprake zijn van wegnemen met het oogmerk van wederrechtelijke toe-eigening.",
      },
      {
        id: "B",
        text: "Poging tot diefstal",
        correct: true,
        explanation:
          "Juist. Daan heeft al een begin gemaakt met de uitvoering van de diefstal door de autoruit in te slaan met het doel de jas weg te nemen.",
      },
      {
        id: "C",
        text: "Alleen vernieling",
        correct: false,
        explanation:
          "Onjuist. Vernieling kan mogelijk ook aan de orde zijn, maar door het doel om de jas te pakken is vooral sprake van een poging tot diefstal.",
      },
    ],
  },
  {
    title: "Medeplegen",
    text: "Sam en Noah spreken af om samen een scooter te stelen. Sam houdt de omgeving in de gaten, terwijl Noah het slot forceert en de scooter meeneemt. Wat is juridisch het meest waarschijnlijk?",
    answers: [
      {
        id: "A",
        text: "Alleen Noah is strafbaar, want hij neemt de scooter feitelijk mee.",
        correct: false,
        explanation:
          "Onjuist. Sam kan ook strafbaar zijn als zijn bijdrage voldoende gewicht heeft en sprake is van nauwe en bewuste samenwerking.",
      },
      {
        id: "B",
        text: "Sam en Noah kunnen als medeplegers worden aangemerkt.",
        correct: true,
        explanation:
          "Juist. Er is vooraf overleg geweest en Sam levert een actieve bijdrage door op de uitkijk te staan. Dat kan medeplegen opleveren.",
      },
      {
        id: "C",
        text: "Sam is nooit strafbaar als hij het goed niet zelf wegneemt.",
        correct: false,
        explanation:
          "Onjuist. Voor strafbaarheid is niet vereist dat iemand alle uitvoeringshandelingen zelf verricht.",
      },
    ],
  },
  {
    title: "Voorwaardelijk opzet",
    text: "Lisa gooit vanaf een brug een zware steen op een drukke rijbaan. Zij zegt later dat zij niemand wilde raken. Een automobilist raakt gewond. Welke redenering past het best bij voorwaardelijk opzet?",
    answers: [
      {
        id: "A",
        text: "Voorwaardelijk opzet kan aanwezig zijn als Lisa bewust de aanmerkelijke kans heeft aanvaard dat iemand geraakt zou worden.",
        correct: true,
        explanation:
          "Juist. Bij voorwaardelijk opzet gaat het om het bewust aanvaarden van een aanmerkelijke kans op het gevolg.",
      },
      {
        id: "B",
        text: "Voorwaardelijk opzet is uitgesloten omdat Lisa zegt dat zij niemand wilde raken.",
        correct: false,
        explanation:
          "Onjuist. Het gaat niet alleen om wat Lisa achteraf zegt, maar om wat uit de omstandigheden kan worden afgeleid.",
      },
      {
        id: "C",
        text: "Voorwaardelijk opzet vereist altijd dat iemand het gevolg daadwerkelijk heeft gewild.",
        correct: false,
        explanation:
          "Onjuist. Dat is eerder bedoeling/opzet als oogmerk. Voorwaardelijk opzet ziet juist op het aanvaarden van een risico.",
      },
    ],
  },
  {
    title: "Noodweer",
    text: "Mike wordt op straat plotseling aangevallen met vuistslagen. Hij duwt de aanvaller direct weg, waardoor die valt. Welke voorwaarde is vooral relevant voor noodweer?",
    answers: [
      {
        id: "A",
        text: "Er moet sprake zijn van een ogenblikkelijke wederrechtelijke aanranding.",
        correct: true,
        explanation:
          "Juist. Noodweer vereist onder meer een onmiddellijke en wederrechtelijke aanval waartegen verdediging noodzakelijk is.",
      },
      {
        id: "B",
        text: "Noodweer kan alleen bij verdediging tegen dodelijk geweld.",
        correct: false,
        explanation:
          "Onjuist. Noodweer kan ook bij andere vormen van wederrechtelijke aanranding, zoals fysiek geweld.",
      },
      {
        id: "C",
        text: "Noodweer is altijd toegestaan zodra iemand boos wordt.",
        correct: false,
        explanation:
          "Onjuist. Boosheid is niet genoeg. Er moet sprake zijn van een concrete wederrechtelijke aanranding en noodzakelijke verdediging.",
      },
    ],
  },
  {
    title: "Medeplichtigheid",
    text: "Ruben weet dat zijn vriend een inbraak wil plegen. Hij geeft hem bewust een koevoet mee, maar gaat zelf niet mee naar de woning. Welke kwalificatie ligt het meest voor de hand?",
    answers: [
      {
        id: "A",
        text: "Medeplichtigheid, omdat Ruben behulpzaam is door een middel te verschaffen.",
        correct: true,
        explanation:
          "Juist. Het bewust verschaffen van een middel voor het misdrijf kan medeplichtigheid opleveren.",
      },
      {
        id: "B",
        text: "Medeplegen, omdat iedereen die helpt automatisch medepleger is.",
        correct: false,
        explanation:
          "Onjuist. Medeplegen vereist nauwe en bewuste samenwerking en een voldoende gewichtige bijdrage. Helpen is niet automatisch medeplegen.",
      },
      {
        id: "C",
        text: "Geen strafbaarheid, omdat Ruben niet bij de woning aanwezig was.",
        correct: false,
        explanation:
          "Onjuist. Fysieke aanwezigheid bij het delict is niet altijd vereist voor strafbare deelneming.",
      },
    ],
  },
];

export default function StrafrechtPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestionIndex];

  const selected = question.answers.find(
    (answer) => answer.id === selectedAnswer
  );

  function handleAnswer(answerId: string) {
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

    if (nextIndex >= questions.length) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions(0);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="text-sm text-slate-400 hover:text-white">
            ← Terug naar home
          </a>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Strafrecht · Resultaat
            </p>

            <h1 className="mt-4 text-4xl font-bold">Je score</h1>

            <p className="mt-6 text-6xl font-bold">
              {score}/{questions.length}
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              {score === questions.length
                ? "Perfect. Je beheerst deze basisvragen goed."
                : score >= 3
                ? "Netjes. Je zit op de goede weg, maar sommige leerstukken kun je nog scherper oefenen."
                : "Nog even dooroefenen. Lees vooral goed waarom de foute antwoorden niet kloppen."}
            </p>

            <button
              onClick={restartQuiz}
              className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Opnieuw oefenen
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar home
        </a>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Strafrecht · MC-vraag {currentQuestionIndex + 1} van{" "}
              {questions.length}
            </p>

            <p className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Score: {score}/{answeredQuestions}
            </p>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-white transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
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
                  <span className="font-bold">{answer.id}.</span> {answer.text}
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
                {currentQuestionIndex + 1 === questions.length
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
