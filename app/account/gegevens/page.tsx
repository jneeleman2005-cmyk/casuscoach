import { createClient } from "../../lib/supabase/server";

export default async function AccountGegevensPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <a
            href="/account"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar account
          </a>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Accountgegevens
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              Je bent niet ingelogd.
            </h1>

            <p className="mt-6 leading-8 text-slate-600">
              Log in om je accountgegevens te bekijken.
            </p>

            <a
              href="/login"
              className="mt-8 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Inloggen
            </a>
          </section>
        </div>
      </main>
    );
  }

  const displayName =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : "Niet ingevuld";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <a
          href="/account"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          ← Terug naar account
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Accountgegevens
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Je gegevens.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Hier staan de gegevens die bij je account horen.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Persoonlijke gegevens</h2>

          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Naam</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {displayName}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                E-mailadres
              </p>
              <p className="mt-2 break-all text-lg font-semibold text-slate-950">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Premium-status
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                Niet actief
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Accountbeheer volgt later
          </h2>

          <p className="mt-4 leading-8 text-blue-950/80">
            Later kun je hier bijvoorbeeld je naam wijzigen, wachtwoord beheren
            en abonnementsgegevens bekijken.
          </p>
        </section>
      </div>
    </main>
  );
}