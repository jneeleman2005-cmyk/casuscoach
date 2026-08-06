export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto flex min-h-[720px] max-w-6xl flex-col items-center justify-center text-center">
        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Voor rechtenstudenten - gratis oefenen
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Bereid je slimmer voor op je rechten tentamen.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Oefen MC-vragen en casussen per rechtsgebied en leerstuk. Je krijgt
          directe uitleg en voorbeeldantwoorden, zodat je leert toepassen in
          plaats van alleen stampen.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/oefenen"
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Start gratis oefenen
          </a>

          <a
            href="/registreren"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            Account maken
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-700">MC</p>
            <p className="mt-2 text-sm text-slate-600">
              Meerkeuzevragen met directe feedback
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-700">Casus</p>
            <p className="mt-2 text-sm text-slate-600">
              Open vragen met modelantwoord
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-700">Score</p>
            <p className="mt-2 text-sm text-slate-600">
              Voortgang bewaren met account
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-16">
        <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Gratis toegang
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-green-950">
            CasusCoach is gratis te gebruiken.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-green-950/80">
            Je kunt de beschikbare MC-vragen en open casussen gebruiken. Maak
            een account aan om je voortgang, scores en antwoorden automatisch op
            te slaan.
          </p>

          <a
            href="/oefenen"
            className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            Start met oefenen
          </a>
        </div>
      </section>
    </main>
  );
}