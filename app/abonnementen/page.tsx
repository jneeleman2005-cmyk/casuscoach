import { getPlatformSettings } from "../lib/platform";

export default async function AbonnementenPage() {
  const platform = await getPlatformSettings();

  if (platform.isFreeMode) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <a
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            Terug naar home
          </a>

          <section className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Gratis toegang
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-green-950 sm:text-5xl">
              CasusCoach is gratis te gebruiken.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-green-950/80">
              Je kunt de beschikbare MC-vragen en open casussen gebruiken.
              Maak een account aan om je voortgang automatisch op te slaan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/oefenen"
                className="rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                Start met oefenen
              </a>

              <a
                href="/registreren"
                className="rounded-xl border border-green-200 bg-white px-5 py-3 text-center font-semibold text-green-700 shadow-sm transition hover:border-green-300"
              >
                Account maken
              </a>
            </div>
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold">MC-vragen</p>

              <p className="mt-3 leading-7 text-slate-600">
                Oefen meerkeuzevragen per rechtsgebied en leerstuk. Je krijgt
                direct feedback en uitleg bij het juiste antwoord.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold">Open casussen</p>

              <p className="mt-3 leading-7 text-slate-600">
                Werk open vragen uit en vergelijk je antwoord met het
                modelantwoord en de beoordelingspunten.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold">Voortgang</p>

              <p className="mt-3 leading-7 text-slate-600">
                Met een account zie je je oefenpogingen, scores en
                casusantwoorden terug in je persoonlijke dashboard.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Toegang
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Kies de toegang die bij je studie past.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Hier kunnen later verschillende vormen van toegang worden getoond.
          </p>
        </section>
      </div>
    </main>
  );
}