export default function OefenenPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-medium text-slate-500 hover:text-blue-700">
          ← Terug naar home
        </a>

        <section className="mt-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Kies je oefenvorm
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Hoe wil je oefenen?
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            CasusCoach helpt je op twee manieren: je kunt volledige casussen
            oplossen of MC-vragen oefenen per rechtsgebied en leerstuk.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-blue-800">
                Gratis proberen
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-900/80">
                Je kunt CasusCoach gratis proberen met een beperkte demo:
                maximaal 3 MC-vragen per selectie en 1 casus per selectie. Met
                een studentenabonnement oefen je onbeperkt.
              </p>
            </div>

            <a
              href="/abonnementen"
              className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Bekijk studentenprijzen
            </a>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <a
            href="/casus"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Optie 1
            </p>

            <h2 className="mt-3 text-3xl font-bold">Casus oplossen</h2>

            <p className="mt-5 leading-7 text-slate-600">
              Kies een rechtsgebied en één of meerdere leerstukken. Daarna krijg
              je een casus die je zelf beantwoordt volgens PROC/IRAC.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="font-semibold text-blue-800">Gratis proberen</p>
              <p className="mt-2 text-sm leading-6 text-blue-900/80">
                Maximaal 1 casus per selectie, inclusief voorbeeldantwoord en
                demo-feedback.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-800">Premium</p>
              <p className="mt-2 text-sm leading-6 text-green-900/80">
                Onbeperkt casussen oefenen en later AI-feedback op jouw
                uitgewerkte antwoord.
              </p>
            </div>
          </a>

          <a
            href="/mc"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Optie 2
            </p>

            <h2 className="mt-3 text-3xl font-bold">MC-vragen oefenen</h2>

            <p className="mt-5 leading-7 text-slate-600">
              Kies een rechtsgebied en oefen één leerstuk of een mix van
              leerstukken. Je ziet direct of je antwoord goed is en waarom.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="font-semibold text-blue-800">Gratis proberen</p>
              <p className="mt-2 text-sm leading-6 text-blue-900/80">
                Maximaal 3 MC-vragen per selectie, inclusief directe uitleg per
                antwoord.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-800">Premium</p>
              <p className="mt-2 text-sm leading-6 text-green-900/80">
                Onbeperkt MC-vragen oefenen per rechtsgebied, leerstuk of
                gemengde selectie.
              </p>
            </div>
          </a>
        </section>
      </div>
    </main>
  );
}