const plans = [
  {
    name: "Gratis",
    price: "€0",
    period: "voor altijd",
    label: "Proberen",
    description:
      "Voor studenten die CasusCoach eerst willen testen zonder betaalgegevens.",
    features: [
      "Beperkte toegang tot MC-vragen",
      "Beperkte toegang tot casussen",
      "Directe uitleg bij enkele antwoorden",
    ],
    buttonText: "Start gratis",
    highlighted: false,
  },
  {
    name: "Wekelijks",
    price: "€2,99",
    period: "per week",
    label: "Tentamenweek",
    description:
      "Voor studenten die kort voor een tentamen gericht willen oefenen.",
    features: [
      "Alles uit Gratis",
      "Meer MC-vragen beschikbaar",
      "Meer casussen beschikbaar",
      "Oefenen per rechtsgebied en leerstuk",
      "Geschikt voor last-minute herhaling",
    ],
    buttonText: "Kies weekabonnement",
    highlighted: false,
  },
  {
    name: "Maandelijks",
    price: "€8,99",
    period: "per maand",
    label: "Populair",
    description:
      "Voor studenten die gedurende een blok structureel willen oefenen.",
    features: [
      "Alles uit Wekelijks",
      "Onbeperkt MC-vragen oefenen",
      "Onbeperkt casussen oefenen",
      "Mix van meerdere leerstukken",
      "Toegang tot nieuwe vragen en casussen",
      "Voortgang per vak later beschikbaar",
    ],
    buttonText: "Kies maandabonnement",
    highlighted: true,
  },
  {
    name: "Jaarlijks",
    price: "€49,99",
    period: "per jaar",
    label: "Beste waarde",
    description:
      "Voor studenten die CasusCoach het hele studiejaar willen gebruiken.",
    features: [
      "Alles uit Maandelijks",
      "Toegang voor het hele studiejaar",
      "Alle toekomstige rechtsgebieden",
      "Alle toekomstige leerstukken",
      "AI-feedback op casusantwoorden zodra beschikbaar",
      "Ideaal voor meerdere tentamenperiodes",
      "Laagste prijs per maand",
    ],
    buttonText: "Kies jaarabonnement",
    highlighted: false,
  },
];

export default function AbonnementenPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar home
        </a>

        <section className="mt-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Studentenprijzen
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Kies je CasusCoach-abonnement
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Oefen rechten op jouw manier: gratis starten, kort intensief
            oefenen rond tentamens of langer toegang krijgen tot casussen en
            MC-vragen per rechtsgebied en leerstuk.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 ${
                plan.highlighted
                  ? "border-white bg-slate-800"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">{plan.name}</h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    plan.highlighted
                      ? "bg-white text-slate-950"
                      : "bg-slate-950 text-slate-300"
                  }`}
                >
                  {plan.label}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-4xl font-bold">{plan.price}</p>
                <p className="mt-1 text-sm text-slate-400">{plan.period}</p>
              </div>

              <p className="mt-5 min-h-20 leading-7 text-slate-300">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-green-300">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition ${
                  plan.highlighted
                    ? "bg-white text-slate-950 hover:bg-slate-200"
                    : "border border-slate-700 text-white hover:bg-slate-800"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Wat krijg je met betaald?</h2>

          <p className="mt-4 leading-8 text-slate-300">
            De gratis versie is bedoeld om CasusCoach te proberen. De betaalde
            studentenabonnementen zijn bedoeld voor intensief oefenen met meer
            MC-vragen, meer casussen, meer rechtsgebieden en later ook
            AI-feedback op casusantwoorden.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Betalingen zijn nog niet gekoppeld. Deze pagina is nu alleen de
            pricing-structuur. Later koppelen we Stripe of Mollie.
          </p>
        </section>
      </div>
    </main>
  );
}
