const faqs = [
  {
    question: "Voor wie is CasusCoach bedoeld?",
    answer:
      "CasusCoach is bedoeld voor HBO- en WO-rechtenstudenten die willen oefenen met MC-vragen, casussen, rechtsgebieden en leerstukken. Het platform is vooral gericht op tentamenvoorbereiding en juridisch toepassen.",
  },
  {
    question: "Is CasusCoach gratis te gebruiken?",
    answer:
      "Ja. Je kunt CasusCoach gratis proberen met een beperkte demo. Op dit moment kun je gratis een beperkt aantal MC-vragen en casussen oefenen per selectie.",
  },
  {
    question: "Wat krijg ik met Premium?",
    answer:
      "Met Premium kun je onbeperkt oefenen met MC-vragen en casussen. Later kunnen daar extra functies bij komen, zoals voortgang per vak en AI-feedback op casusantwoorden.",
  },
  {
    question: "Is CasusCoach juridisch advies?",
    answer:
      "Nee. CasusCoach is studiehulp voor rechtenstudenten. De uitleg, vragen en voorbeeldantwoorden zijn bedoeld om te oefenen en vervangen geen juridisch advies, onderwijs, literatuur of docentfeedback.",
  },
  {
    question: "Welke rechtsgebieden staan erin?",
    answer:
      "De basisstructuur bevat onder meer strafrecht, bestuursrecht, Europees recht, internationaal recht, staatsrecht, goederenrecht, bedrijfsrecht en openbare-orderecht.",
  },
  {
    question: "Kan ik per leerstuk oefenen?",
    answer:
      "Ja. Je kiest eerst een rechtsgebied en daarna één of meerdere leerstukken. Zo kun je gericht oefenen of juist leerstukken combineren.",
  },
  {
    question: "Werkt CasusCoach ook op telefoon?",
    answer:
      "Ja. De website is zo opgezet dat je ook op je telefoon kunt oefenen. Dat is handig voor korte herhaling vlak voor colleges, werkgroepen of tentamens.",
  },
  {
    question: "Wanneer komt AI-feedback?",
    answer:
      "AI-feedback is bedoeld als latere functie. Eerst wordt de basis van het platform goed neergezet: oefenen, accounts, premiumstatus en daarna pas AI-feedback.",
  },
];

export default function VeelgesteldeVragenPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          ← Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Veelgestelde vragen
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Vragen over oefenen, gratis gebruik en Premium.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Hier vind je korte antwoorden op veelgestelde vragen over
            CasusCoach. Klik op een vraag om het antwoord te bekijken.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition open:border-blue-200 open:bg-blue-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <h2 className="text-xl font-bold text-slate-950">
                  {faq.question}
                </h2>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500 transition group-open:rotate-45 group-open:bg-blue-700 group-open:text-white">
                  +
                </span>
              </summary>

              <p className="mt-5 max-w-3xl leading-7 text-slate-700">
                {faq.answer}
              </p>
            </details>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-blue-200 bg-blue-50 p-8">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Staat je vraag er niet bij?
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Neem contact op of geef feedback.
              </h2>

              <p className="mt-5 leading-8 text-blue-950/80">
                CasusCoach is nog in ontwikkeling. Feedback over vragen,
                casussen, uitleg of ontbrekende leerstukken helpt om het
                platform beter te maken.
              </p>
            </div>

            <a
              href="/contact"
              className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Naar contact
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}