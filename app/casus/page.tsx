"use client";

import { useMemo, useState } from "react";

const subjects = [
  {
    name: "Strafrecht",
    slug: "strafrecht",
    topics: ["Poging", "Medeplegen", "Noodweer", "Opzet", "Diefstal"],
  },
  {
    name: "Bestuursrecht",
    slug: "bestuursrecht",
    topics: [
      "Besluit",
      "Belanghebbende",
      "Bezwaar",
      "Evenredigheid",
      "Handhaving",
    ],
  },
  {
    name: "Europees recht",
    slug: "europees-recht",
    topics: [
      "Voorrang",
      "Rechtstreekse werking",
      "Vrij verkeer",
      "EU-instellingen",
    ],
  },
  {
    name: "Internationaal recht",
    slug: "internationaal-recht",
    topics: ["Verdragen", "Staatsaansprakelijkheid", "Immuniteit", "Mensenrechten"],
  },
  {
    name: "Staatsrecht",
    slug: "staatsrecht",
    topics: [
      "Grondrechten",
      "Trias politica",
      "Wetgeving",
      "Ministeriële verantwoordelijkheid",
    ],
  },
  {
    name: "Goederenrecht",
    slug: "goederenrecht",
    topics: ["Eigendom", "Bezit", "Houderschap", "Overdracht"],
  },
  {
    name: "Bedrijfsrecht",
    slug: "bedrijfsrecht",
    topics: ["BV", "NV", "Bestuurdersaansprakelijkheid", "Vertegenwoordiging"],
  },
  {
    name: "Openbare orde recht",
    slug: "openbare-orde-recht",
    topics: [
      "APV",
      "Noodbevel",
      "Noodverordening",
      "Wet Damocles",
      "Demonstratierecht",
    ],
  },
];

const exampleCases = [
  {
    subject: "strafrecht",
    topic: "Poging",
    title: "De jas op de achterbank",
    text: "Daan loopt naar een geparkeerde auto, slaat de ruit in en reikt naar een jas op de achterbank. Voordat hij de jas kan pakken, wordt hij aangehouden. Beoordeel of sprake is van strafbare poging.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Daan strafbaar is wegens poging. Voor poging is vereist dat sprake is van een voornemen tot het plegen van een misdrijf en een begin van uitvoering. Daan wilde de jas uit de auto wegnemen en heeft de autoruit al ingeslagen om die jas te pakken. Die gedraging is naar uiterlijke verschijningsvorm gericht op voltooiing van de diefstal. Daarom ligt strafbare poging tot diefstal voor de hand.",
  },
  {
    subject: "bestuursrecht",
    topic: "Belanghebbende",
    title: "Festival in het park",
    text: "Een gemeente verleent een vergunning voor een groot festival in een park. Een bewoner die 50 meter van het park woont maakt bezwaar wegens geluidsoverlast. Beoordeel of hij belanghebbende kan zijn.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de bewoner belanghebbende is. Daarvoor moet sprake zijn van een eigen, persoonlijk, objectief bepaalbaar, actueel en rechtstreeks belang. Omdat de bewoner op 50 meter afstand woont, kan hij feitelijke gevolgen van enige betekenis ondervinden, zoals geluidsoverlast. Daarom kan hij waarschijnlijk als belanghebbende worden aangemerkt.",
  },
];

export default function CasusPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subject = subjects.find((item) => item.slug === selectedSubject);

  const selectedCase = useMemo(() => {
    return (
      exampleCases.find(
        (item) => item.subject === selectedSubject && item.topic === selectedTopic
      ) ?? {
        title: "Voorbeeldcasus",
        text: `Dit is een voorbeeldcasus voor ${
          subject?.name ?? "het gekozen rechtsgebied"
        } - ${
          selectedTopic || "het gekozen leerstuk"
        }. Later vullen we hier per leerstuk echte casussen in.`,
        modelAnswer:
          "Dit is een voorlopig voorbeeldantwoord. Later wordt dit vervangen door een inhoudelijk uitgewerkt antwoord volgens PROC/IRAC.",
      }
    );
  }, [selectedSubject, selectedTopic, subject?.name]);

  function handleSubmit() {
    if (answer.trim().length < 20) {
      alert("Schrijf eerst een iets uitgebreider antwoord.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/oefenen" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar oefenvormen
        </a>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Casus oplossen
          </p>

          <h1 className="mt-3 text-4xl font-bold">Kies je casus</h1>

          <p className="mt-5 leading-8 text-slate-300">
            Kies eerst een rechtsgebied en daarna een leerstuk. Je krijgt dan
            een passende casus. Na het inleveren zie je feedback en een
            voorbeeldantwoord.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-300">
                Rechtsgebied
              </label>

              <select
                value={selectedSubject}
                onChange={(event) => {
                  setSelectedSubject(event.target.value);
                  setSelectedTopic("");
                  setSubmitted(false);
                  setAnswer("");
                }}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
              >
                <option value="">Kies een rechtsgebied</option>
                {subjects.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300">
                Leerstuk
              </label>

              <select
                value={selectedTopic}
                onChange={(event) => {
                  setSelectedTopic(event.target.value);
                  setSubmitted(false);
                  setAnswer("");
                }}
                disabled={!subject}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white disabled:opacity-50"
              >
                <option value="">Kies een leerstuk</option>
                {subject?.topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedSubject && selectedTopic && (
            <div className="mt-8">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {subject?.name} · {selectedTopic}
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {selectedCase.title}
                </h2>

                <p className="mt-4 leading-8 text-slate-300">
                  {selectedCase.text}
                </p>
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-300">
                  Jouw antwoord
                </label>

                <textarea
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Werk je antwoord uit volgens PROC/IRAC: probleem/rechtsvraag, regel, toepassing en conclusie..."
                  className="mt-2 min-h-56 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 leading-7 text-white"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-5 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Lever antwoord in
              </button>
            </div>
          )}

          {submitted && (
            <section className="mt-8 space-y-6">
              <div className="rounded-2xl border border-blue-700 bg-blue-950/30 p-6">
                <h2 className="text-2xl font-bold">
                  Feedback op jouw antwoord
                </h2>

                <p className="mt-4 leading-8 text-slate-200">
                  Dit is nu nog vaste demo-feedback. Straks koppelen we hier AI
                  aan. Dan beoordeelt het systeem of je rechtsvraag,
                  rechtsregel, toepassing en conclusie juridisch sterk genoeg
                  zijn.
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                  <li>Controleer of je begint met een duidelijke rechtsvraag.</li>
                  <li>Noem de juiste rechtsregel of toetsingsmaatstaf.</li>
                  <li>Pas de regel concreet toe op de feiten uit de casus.</li>
                  <li>Eindig met een duidelijke conclusie.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-green-700 bg-green-950/30 p-6">
                <h2 className="text-2xl font-bold">Voorbeeldantwoord</h2>

                <p className="mt-4 leading-8 text-slate-200">
                  {selectedCase.modelAnswer}
                </p>
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}