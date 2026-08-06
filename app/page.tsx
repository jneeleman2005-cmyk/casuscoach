export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Gratis oefenen voor rechtenstudenten
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Oefen rechten slimmer, zonder overzicht kwijt te raken.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              CasusCoach helpt je oefenen met MC-vragen en open casussen per
              rechtsgebied en leerstuk. Je krijgt duidelijke feedback en ziet
              waar je nog aan moet werken.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/oefenen"
                className="rounded-xl bg-blue-700 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Start met oefenen
              </a>

              <a
                href="/registreren"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
              >
                Account maken
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Per leerstuk</p>
                <p className="mt-1">Oefen gericht op het onderwerp dat je nodig hebt.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Directe uitleg</p>
                <p className="mt-1">Zie meteen waarom een antwoord klopt.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Voortgang</p>
                <p className="mt-1">Houd bij waar je al mee hebt geoefend.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    Vandaag oefenen
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Kies je oefensessie
                  </h2>
                </div>

                <div className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  Gratis
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href="/mc"
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-5 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-blue-950">
                        MC-vragen
                      </p>
                      <p className="mt-2 text-sm leading-6 text-blue-950/75">
                        Test je kennis en krijg direct uitleg bij je antwoord.
                      </p>
                    </div>

                    <span className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-blue-700">
                      MC
                    </span>
                  </div>
                </a>

                <a
                  href="/casus"
                  className="rounded-2xl border border-green-100 bg-green-50 p-5 transition hover:border-green-300 hover:bg-green-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-green-950">
                        Open casussen
                      </p>
                      <p className="mt-2 text-sm leading-6 text-green-950/75">
                        Oefen juridisch redeneren met modelantwoorden.
                      </p>
                    </div>

                    <span className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-green-700">
                      Casus
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">
                  Voorbeeld voortgang
                </p>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Staatsrecht</span>
                      <span>60%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <div className="h-2 w-3/5 rounded-full bg-blue-700" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Internationaal recht</span>
                      <span>35%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <div className="h-2 w-1/3 rounded-full bg-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Waarom CasusCoach
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Gemaakt voor studenten die gewoon willen weten waar ze staan.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Geen onnodige poespas. Je kiest een rechtsgebied, oefent met
              vragen of casussen en krijgt daarna overzichtelijke feedback.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-700">01</p>
              <h3 className="mt-3 text-xl font-bold">Kies een rechtsgebied</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Begin breed of oefen direct met een specifiek vak zoals
                Staatsrecht of Internationaal recht.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-700">02</p>
              <h3 className="mt-3 text-xl font-bold">Oefen per leerstuk</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Richt je op onderwerpen die terugkomen in colleges,
                werkgroepen en tentamens.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-700">03</p>
              <h3 className="mt-3 text-xl font-bold">Krijg feedback</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Bekijk waarom een antwoord juist is en leer van de toelichting
                of het modelantwoord.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-700">04</p>
              <h3 className="mt-3 text-xl font-bold">Bekijk je voortgang</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Met een account zie je wat je hebt gemaakt en waar je nog mee
                kunt oefenen.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Rechtsgebieden
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Oefen wat je op dit moment nodig hebt.
              </h2>
            </div>

            <a
              href="/oefenen"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              Naar oefenen
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Staatsrecht",
              "Internationaal recht",
              "Grondrechten",
              "Verdragenrecht",
            ].map((name) => (
              <div
                key={name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="font-bold text-slate-950">{name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  MC-vragen en casussen per leerstuk.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-[2rem] border border-blue-100 bg-blue-700 p-8 text-white shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
                Begin rustig
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Maak een account en bewaar je voortgang.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-blue-50">
                Je kunt gratis oefenen. Met een account kun je later verdergaan
                waar je gebleven was.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/registreren"
                className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                Account maken
              </a>

              <a
                href="/oefenen"
                className="rounded-xl border border-blue-200 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
              >
                Eerst bekijken
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}