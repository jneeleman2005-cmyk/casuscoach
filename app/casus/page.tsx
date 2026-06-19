"use client";

import { useMemo, useRef, useState } from "react";

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
    available: true,
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
    available: true,
    topics: [
      "Verdragen",
      "Staatsaansprakelijkheid",
      "Immuniteit",
      "Mensenrechten",
    ],
  },
  {
    name: "Staatsrecht",
    slug: "staatsrecht",
    available: true,
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
    available: true,
    topics: ["Eigendom", "Bezit", "Houderschap", "Overdracht"],
  },
  {
    name: "Bedrijfsrecht",
    slug: "bedrijfsrecht",
    available: true,
    topics: [
      "BV",
      "NV",
      "Bestuurdersaansprakelijkheid",
      "Vertegenwoordiging",
    ],
  },
  {
    name: "Openbare orde recht",
    slug: "openbare-orde-recht",
    available: true,
    topics: [
      "APV",
      "Noodbevel",
      "Noodverordening",
      "Wet Damocles",
      "Demonstratierecht",
    ],
  },
];

const cases = [
  {
    subject: "strafrecht",
    topic: "Poging",
    title: "De jas op de achterbank",
    text: "Daan loopt naar een geparkeerde auto, slaat de ruit in en reikt naar een jas op de achterbank. Voordat hij de jas kan pakken, wordt hij aangehouden. Beoordeel of sprake is van strafbare poging.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Daan strafbaar is wegens poging. Voor poging is vereist dat sprake is van een voornemen tot het plegen van een misdrijf en een begin van uitvoering. Daan wilde de jas uit de auto wegnemen en heeft de autoruit al ingeslagen om die jas te pakken. Die gedraging is naar uiterlijke verschijningsvorm gericht op voltooiing van de diefstal. Daarom ligt strafbare poging tot diefstal voor de hand.",
  },
  {
    subject: "strafrecht",
    topic: "Medeplegen",
    title: "De uitkijk bij de scooter",
    text: "Noah forceert het slot van een scooter. Sam staat op de hoek van de straat op de uitkijk en waarschuwt Noah als er iemand aankomt. Zij hadden vooraf afgesproken de scooter samen te stelen. Beoordeel of Sam als medepleger kan worden aangemerkt.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Sam medepleger is. Voor medeplegen is vereist dat sprake is van nauwe en bewuste samenwerking en een voldoende significante bijdrage. Sam heeft vooraf afspraken gemaakt en levert tijdens de uitvoering een actieve bijdrage door op de uitkijk te staan. Daardoor kan zijn bijdrage voldoende gewicht hebben. Medeplegen ligt daarom voor de hand.",
  },
  {
    subject: "strafrecht",
    topic: "Noodweer",
    title: "De klap op straat",
    text: "Mila wordt op straat plotseling aangevallen door iemand die haar meerdere vuistslagen geeft. Zij duwt de aanvaller hard weg, waardoor die valt en letsel oploopt. Beoordeel of Mila een beroep op noodweer kan doen.",
    modelAnswer:
      "PROC/IRAC: De vraag is of Mila een beroep op noodweer kan doen. Noodweer vereist een ogenblikkelijke wederrechtelijke aanranding en een noodzakelijke en proportionele verdediging. Mila werd plotseling fysiek aangevallen en verdedigde zich door de aanvaller weg te duwen. Als die reactie noodzakelijk en niet disproportioneel was, kan noodweer slagen.",
  },
  {
    subject: "bestuursrecht",
    topic: "Belanghebbende",
    title: "Festival in het park",
    text: "Een gemeente verleent een vergunning voor een groot festival in een park. Een bewoner die 50 meter van het park woont maakt bezwaar wegens geluidsoverlast. Beoordeel of hij belanghebbende kan zijn.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de bewoner belanghebbende is. Daarvoor moet sprake zijn van een eigen, persoonlijk, objectief bepaalbaar, actueel en rechtstreeks belang. Omdat de bewoner op 50 meter afstand woont, kan hij feitelijke gevolgen van enige betekenis ondervinden, zoals geluidsoverlast. Daarom kan hij waarschijnlijk als belanghebbende worden aangemerkt.",
  },
  {
    subject: "bestuursrecht",
    topic: "Besluit",
    title: "De afgewezen vergunning",
    text: "Een student vraagt een evenementenvergunning aan bij de gemeente. De burgemeester wijst de aanvraag schriftelijk af. Beoordeel of deze afwijzing een besluit is in de zin van de Awb.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de afwijzing een besluit is. Een besluit is een schriftelijke beslissing van een bestuursorgaan inhoudende een publiekrechtelijke rechtshandeling. De burgemeester is een bestuursorgaan, de afwijzing is schriftelijk en gericht op rechtsgevolg, namelijk het niet verkrijgen van de vergunning. De afwijzing is daarom waarschijnlijk een besluit.",
  },
  {
    subject: "goederenrecht",
    topic: "Eigendom",
    title: "De verkochte laptop",
    text: "Lars verkoopt zijn laptop aan Emma. Zij spreken af dat Emma direct eigenaar wordt, maar de laptop blijft nog een week bij Lars liggen. Beoordeel welke vereisten relevant zijn voor overdracht van eigendom.",
    modelAnswer:
      "PROC/IRAC: De vraag is of de eigendom rechtsgeldig is overgedragen. Voor overdracht is vereist: een geldige titel, beschikkingsbevoegdheid en levering. De koopovereenkomst kan de titel vormen en Lars lijkt beschikkingsbevoegd als eigenaar. Daarnaast moet levering plaatsvinden op de wettelijk voorgeschreven wijze. Zonder levering is Emma nog niet automatisch eigenaar.",
  },
];

export default function CasusPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const topicsSectionRef = useRef<HTMLElement | null>(null);

  const subject = subjects.find((item) => item.slug === selectedSubject);

  const filteredCases = useMemo(() => {
    const matchingCases = cases.filter((item) => {
      return item.subject === selectedSubject && selectedTopics.includes(item.topic);
    });

    if (matchingCases.length > 0) {
      return matchingCases;
    }

    if (selectedSubject && selectedTopics.length > 0) {
      return selectedTopics.map((topic) => ({
        subject: selectedSubject,
        topic,
        title: `${subject?.name ?? "Rechtsgebied"} · ${topic}`,
        text: `Dit is een tijdelijke voorbeeldcasus voor ${
          subject?.name ?? "het gekozen rechtsgebied"
        } over het leerstuk ${topic}. Later kun je hier een echte casus voor invullen.`,
        modelAnswer:
          "Dit is een tijdelijk voorbeeldantwoord. Later vervangen we dit door een volledig uitgewerkt voorbeeldantwoord volgens PROC/IRAC.",
      }));
    }

    return [];
  }, [selectedSubject, selectedTopics, subject?.name]);

  const currentCase = filteredCases[currentCaseIndex];

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

    setHasStarted(true);
    setCurrentCaseIndex(0);
    setAnswer("");
    setSubmitted(false);
  }

  function submitAnswer() {
    if (answer.trim().length < 20) {
      alert("Schrijf eerst een iets uitgebreider antwoord.");
      return;
    }

    setSubmitted(true);
  }

  function nextCase() {
    const nextIndex = currentCaseIndex + 1;

    if (nextIndex >= filteredCases.length) {
      setHasStarted(false);
      setCurrentCaseIndex(0);
      setAnswer("");
      setSubmitted(false);
      return;
    }

    setCurrentCaseIndex(nextIndex);
    setAnswer("");
    setSubmitted(false);
  }

  function backToSelection() {
    setHasStarted(false);
    setCurrentCaseIndex(0);
    setAnswer("");
    setSubmitted(false);
  }

  if (hasStarted && currentCase) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={backToSelection}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Terug naar selectie
          </button>

          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {subject?.name} · {currentCase.topic}
              </p>

              <p className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                Casus {currentCaseIndex + 1} van {filteredCases.length}
              </p>
            </div>

            <h1 className="mt-6 text-3xl font-bold">{currentCase.title}</h1>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-6">
              <p className="leading-8 text-slate-300">{currentCase.text}</p>
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

            {!submitted && (
              <button
                onClick={submitAnswer}
                className="mt-5 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Lever antwoord in
              </button>
            )}

            {submitted && (
              <section className="mt-8 space-y-6">
                <div className="rounded-2xl border border-blue-700 bg-blue-950/30 p-6">
                  <h2 className="text-2xl font-bold">
                    Feedback op jouw antwoord
                  </h2>

                  <p className="mt-4 leading-8 text-slate-200">
                    Dit is nu nog vaste demo-feedback. Straks koppelen we hier AI
                    aan. Dan beoordeelt het systeem je antwoord op rechtsvraag,
                    regel, toepassing en conclusie.
                  </p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                    <li>Begin met een duidelijke rechtsvraag.</li>
                    <li>Noem de juiste rechtsregel of toetsingsmaatstaf.</li>
                    <li>Pas de regel concreet toe op de feiten.</li>
                    <li>Eindig met een duidelijke conclusie.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-green-700 bg-green-950/30 p-6">
                  <h2 className="text-2xl font-bold">Voorbeeldantwoord</h2>

                  <p className="mt-4 leading-8 text-slate-200">
                    {currentCase.modelAnswer}
                  </p>
                </div>

                <button
                  onClick={nextCase}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  {currentCaseIndex + 1 >= filteredCases.length
                    ? "Terug naar selectie"
                    : "Volgende casus"}
                </button>
              </section>
            )}
          </section>
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

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Casus oplossen
          </p>

          <h1 className="mt-4 text-4xl font-bold">Kies je rechtsgebied</h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Kies eerst een rechtsgebied. Daarna selecteer je één of meerdere
            leerstukken die je wilt oefenen. Je krijgt vervolgens casussen die
            passen bij jouw selectie.
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
                      Oefen casussen per leerstuk of met een combinatie van
                      meerdere leerstukken.
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
              <p className="text-sm text-slate-400">
                Geselecteerd: {selectedTopics.length} leerstuk
                {selectedTopics.length === 1 ? "" : "ken"}
              </p>

              <button
                onClick={startPractice}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Start casus oefenen
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
