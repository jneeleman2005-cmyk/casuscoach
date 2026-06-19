export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
          Voor rechtenstudenten · Gratis demo actief
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Oefen rechten zoals je het op je tentamen moet toepassen.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          CasusCoach helpt rechtenstudenten oefenen met MC-vragen, casussen,
          rechtsgebieden en leerstukken. Niet alleen stampen, maar juridisch
          redeneren volgens de manier waarop je wordt getoetst.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/oefenen"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Start gratis met oefenen
          </a>

          <a
            href="/abonnementen"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Bekijk studentenprijzen
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-3xl font-bold">3</p>
            <p className="mt-2 text-sm text-slate-400">
              gratis MC-vragen per selectie
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-3xl font-bold">1</p>
            <p className="mt-2 text-sm text-slate-400">
              gratis casus per selectie
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-3xl font-bold">8</p>
            <p className="mt-2 text-sm text-slate-400">
              rechtsgebieden in de basisstructuur
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/mc"
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-white hover:bg-slate-800"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Oefenvorm 1
            </p>

            <h2 className="mt-3 text-3xl font-bold">MC-vragen oefenen</h2>

            <p className="mt-5 leading-7 text-slate-300">
              Kies een rechtsgebied en selecteer één of meerdere leerstukken.
              Je krijgt direct te zien of je antwoord klopt en waarom de andere
              antwoorden onjuist zijn.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="font-semibold text-white">Gratis demo</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Maximaal 3 MC-vragen per selectie.
              </p>
            </div>
          </a>

          <a
            href="/casus"
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-white hover:bg-slate-800"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Oefenvorm 2
            </p>

            <h2 className="mt-3 text-3xl font-bold">Casus oplossen</h2>

            <p className="mt-5 leading-7 text-slate-300">
              Kies een rechtsgebied en leerstuk. Werk je antwoord uit volgens
              PROC/IRAC en vergelijk daarna je antwoord met feedback en een
              voorbeeldantwoord.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="font-semibold text-white">Gratis demo</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Maximaal 1 casus per selectie.
              </p>
            </div>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-green-900 bg-green-950/20 p-8">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-green-300">
                Premium voor studenten
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Onbeperkt oefenen rond je tentamenperiode.
              </h2>

              <p className="mt-5 leading-8 text-green-100/80">
                Met een studentenabonnement kun je onbeperkt oefenen met
                MC-vragen en casussen. Later voegen we AI-feedback toe, zodat je
                casusantwoorden inhoudelijk worden beoordeeld op rechtsvraag,
                rechtsregel, toepassing en conclusie.
              </p>
            </div>

            <div className="rounded-2xl border border-green-900 bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Vanaf</p>
              <p className="mt-2 text-4xl font-bold">€2,99</p>
              <p className="mt-1 text-sm text-slate-400">per week</p>

              <a
                href="/abonnementen"
                className="mt-6 block rounded-xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Bekijk abonnementen
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">1. Kies je oefenvorm</h2>
            <p className="mt-3 text-slate-300">
              Start met MC-vragen voor snelle toetsing of kies casussen om je
              juridische schrijfvaardigheid te trainen.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">2. Kies je leerstukken</h2>
            <p className="mt-3 text-slate-300">
              Selecteer bijvoorbeeld poging, medeplegen, belanghebbende,
              overdracht of openbare-ordebevoegdheden.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">3. Leer van feedback</h2>
            <p className="mt-3 text-slate-300">
              Je ziet direct uitleg, voorbeeldantwoorden en later AI-feedback op
              je juridische redenering.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
