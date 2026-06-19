import { createClient } from "../lib/supabase/server";

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

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <a
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar home
          </a>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Mijn account
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Je bent nog niet ingelogd.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Log in of maak een account aan om je persoonlijke omgeving te
              bekijken.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Inloggen
              </a>

              <a
                href="/registreren"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Account maken
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const displayName =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : "Student";

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
            Welkom terug, {displayName}.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
  Je persoonlijke oefenomgeving is actief. Later worden hier je echte
  voortgang, Premium-status en oefenresultaten geladen.
</p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Overzicht</h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Je account is gekoppeld aan Supabase Auth. De volgende stap is
                  voortgang en Premium-status opslaan in de database.
                </p>
              </div>

              <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                Ingelogd
              </span>
            </div>
<div className="mt-6 flex flex-col gap-3 sm:flex-row">
  <a
    href="/account/gegevens"
    className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
  >
    Accountgegevens bekijken
  </a>

  <a
    href="/oefenen"
    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
  >
    Verder oefenen
  </a>

  <a
    href="/auth/logout"
    className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-center font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-100"
  >
    Uitloggen
  </a>
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
            Account werkt nu met Supabase
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-blue-950/80">
            De gebruiker wordt nu opgehaald via Supabase Auth. De volgende stap
            is een uitlogknop maken en daarna echte voortgang opslaan.
          </p>
        </section>
      </div>
    </main>
  );
}