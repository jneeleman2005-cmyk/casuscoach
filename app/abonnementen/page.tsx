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
    price: "€59,99",
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
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-medium text-slate-500 hover:text-blue-700">
          ← Terug naar home
        </a>

        <section className="mt-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Studentenprijzen
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Kies je CasusCoach-abonnement
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Probeer CasusCoach gratis of kies een studentenabonnement om
            onbeperkt te oefenen met MC-vragen en casussen rond je
            tentamenperiode.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-blue-800">
                Gratis proberen zonder betaalgegevens
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-900/80">
                Start met een gratis demo: 3 MC-vragen en 1 casus per selectie.
                Wil je daarna onbeperkt oefenen, dan kun je upgraden naar een
                studentenabonnement.
              </p>
            </div>

            <a
              href="/oefenen"
              className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Start gratis oefenen
            </a>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                plan.highlighted
                  ? "border-blue-400 ring-4 ring-blue-100"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">{plan.name}</h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    plan.highlighted
                      ? "bg-blue-700 text-white"
                      : plan.name === "Jaarlijks"
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {plan.label}
                </span>
              </div>

              <p className="mt-4 min-h-20 leading-7 text-slate-600">
                {plan.description}
              </p>

              <div className="mt-6">
                <p className="text-4xl font-bold">{plan.price}</p>
                <p className="mt-1 text-sm text-slate-500">{plan.period}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        plan.highlighted
                          ? "bg-blue-700 text-white"
                          : "bg-green-50 text-green-700 ring-1 ring-green-200"
                      }`}
                    >
                      ✓
                    </span>

                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.name === "Gratis" ? "/oefenen" : "#"}
                className={`mt-8 block rounded-xl px-5 py-3 text-center font-semibold transition ${
                  plan.highlighted
                    ? "bg-blue-700 text-white shadow-sm hover:bg-blue-800"
                    : plan.name === "Jaarlijks"
                    ? "bg-green-700 text-white shadow-sm hover:bg-green-800"
                    : "border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
                }`}
              >
                {plan.buttonText}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Voor tentamens
            </p>

            <h2 className="mt-3 text-2xl font-bold">Oefen gericht per leerstuk</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Kies bijvoorbeeld poging, medeplegen, belanghebbende, overdracht
              of openbare-ordebevoegdheden en oefen precies wat je nodig hebt.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Directe uitleg
            </p>

            <h2 className="mt-3 text-2xl font-bold">Leer waarom iets klopt</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Bij MC-vragen zie je direct waarom een antwoord goed of fout is.
              Bij casussen krijg je feedback en een voorbeeldantwoord.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Binnenkort
            </p>

            <h2 className="mt-3 text-2xl font-bold">AI-feedback op casussen</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Later voegen we AI-feedback toe die jouw antwoord beoordeelt op
              rechtsvraag, rechtsregel, toepassing en conclusie.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Let op
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Betalingen zijn nog niet gekoppeld
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Deze abonnementenpagina is nu bedoeld om het product en de
                prijsstructuur alvast duidelijk te maken. De betaalfunctie
                koppelen we later met Stripe of Mollie, zodra login en accounts
                zijn toegevoegd.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Logische bouwvolgorde
              </p>

              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Meer vragen en casussen toevoegen</li>
                <li>Login en gebruikersaccounts</li>
                <li>Premiumstatus per gebruiker</li>
                <li>Betaling koppelen</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}