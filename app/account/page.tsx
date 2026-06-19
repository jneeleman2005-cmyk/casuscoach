const progressItems = [
  {
    subject: "Strafrecht",
    status: "Nog niet gestart",
    detail: "MC-vragen en casussen per leerstuk",
  },
  {
    subject: "Bestuursrecht",
    status: "Nog niet gestart",
    detail: "Besluiten, bezwaar, handhaving en evenredigheid",
  },
  {
    subject: "Europees recht",
    status: "Nog niet gestart",
    detail: "Voorrang, rechtstreekse werking en vrij verkeer",
  },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          ← Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Mijn account
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Je persoonlijke oefenomgeving.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Deze accountpagina is alvast voorbereid. Later worden hier echte
            gebruikersgegevens, voortgang en Premium-status geladen.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Overzicht</h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Je bent nog niet echt ingelogd. Deze pagina laat zien hoe het
                  accountdashboard er straks uit kan zien.
                </p>
              </div>

              <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                Demo-account
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Geoefende vragen</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Gemaakte casussen</p>
                <p className="mt-2 text-3xl font-bold">0</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Premium-status</p>
                <p className="mt-2 text-3xl font-bold">Nee</p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-green-200 bg-green-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Premium
            </p>

            <h2 className="mt-3 text-2xl font-bold text-green-950">
              Nog geen Premium actief
            </h2>

            <p className="mt-4 leading-7 text-green-950/80">
              Later wordt hier automatisch getoond of je een actief abonnement
              hebt. Met Premium kun je onbeperkt oefenen.
            </p>

            <a
              href="/abonnementen"
              className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              Bekijk abonnementen
            </a>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Voortgang per rechtsgebied</h2>

          <div className="mt-6 space-y-4">
            {progressItems.map((item) => (
              <div
                key={item.subject}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">
                      {item.subject}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Accountfunctie nog niet actief
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-blue-950/80">
            De pagina staat klaar, maar echte gebruikersdata wordt nog niet
            opgeslagen. De volgende technische stap is authenticatie koppelen en
            daarna Premium-status en voortgang opslaan.
          </p>
        </section>
      </div>
    </main>
  );
}