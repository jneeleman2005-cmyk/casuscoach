import { getPlatformSettings } from "../lib/platform";

export default async function OefenenPage() {
  const platform = await getPlatformSettings();

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
            Oefenen
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Kies hoe je wilt oefenen.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Train je juridische kennis met MC-vragen of werk open casussen uit.
            Je kunt oefenen per rechtsgebied en leerstuk.
          </p>
        </section>

        {platform.isFreeMode ? (
          <section className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-bold text-green-950">Gratis toegang</p>

                <p className="mt-2 max-w-3xl leading-7 text-green-950/80">
                  Alle beschikbare oefenstof is gratis toegankelijk. Maak een
                  account aan om je voortgang automatisch op te slaan.
                </p>
              </div>

              <a
                href="/registreren"
                className="rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                Account maken
              </a>
            </div>
          </section>
        ) : null}

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <a
            href="/mc"
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  MC-vragen
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Snel kennis toetsen
                </h2>
              </div>

              <span className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Direct feedback
              </span>
            </div>

            <p className="mt-5 leading-8 text-slate-600">
              Beantwoord meerkeuzevragen per rechtsgebied en leerstuk. Na je
              keuze zie je meteen of je antwoord goed is en krijg je uitleg.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 1</p>
                <p className="mt-1 font-bold">Kies vak</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 2</p>
                <p className="mt-1 font-bold">Beantwoord</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 3</p>
                <p className="mt-1 font-bold">Leer van uitleg</p>
              </div>
            </div>

            <div className="mt-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition group-hover:bg-blue-800">
              Start MC-vragen
            </div>
          </a>

          <a
            href="/casus"
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                  Open casussen
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Juridisch redeneren
                </h2>
              </div>

              <span className="rounded-2xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                Modelantwoord
              </span>
            </div>

            <p className="mt-5 leading-8 text-slate-600">
              Werk een casus uit in je eigen woorden en vergelijk je antwoord
              daarna met het modelantwoord, beoordelingspunten en toelichting.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 1</p>
                <p className="mt-1 font-bold">Lees casus</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 2</p>
                <p className="mt-1 font-bold">Schrijf antwoord</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Stap 3</p>
                <p className="mt-1 font-bold">Vergelijk</p>
              </div>
            </div>

            <div className="mt-8 inline-flex rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition group-hover:bg-green-800">
              Start casussen
            </div>
          </a>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Wat wordt opgeslagen?</h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">Onderdeel</th>
                  <th className="px-4 py-4 font-semibold">Zonder account</th>
                  <th className="px-4 py-4 font-semibold">Met account</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-4 py-4 font-semibold">MC-vragen oefenen</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-semibold">Casussen maken</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-semibold">Voortgang bewaren</td>
                  <td className="px-4 py-4 text-slate-700">Nee</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-semibold">Persoonlijk dashboard</td>
                  <td className="px-4 py-4 text-slate-700">Nee</td>
                  <td className="px-4 py-4 text-slate-700">Ja</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}