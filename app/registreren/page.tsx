export default function RegistrerenPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <section>
          <a
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
            ← Terug naar home
          </a>

          <p className="mt-12 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Account maken
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Maak straks een account aan om slimmer te oefenen.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Met een account kan CasusCoach later je voortgang bewaren,
            Premium-toegang controleren en persoonlijke oefenresultaten tonen.
          </p>

          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="font-semibold text-blue-950">
              Registratie is nog niet actief
            </p>

            <p className="mt-3 leading-7 text-blue-950/80">
              Deze pagina is alvast voorbereid. De echte registratie wordt later
              gekoppeld aan authenticatie en een database.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Account aanmaken</h2>

          <p className="mt-3 leading-7 text-slate-600">
            Vul je gegevens in. De knop werkt later pas echt wanneer de
            accountfunctie technisch is gekoppeld.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Naam
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Je naam"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                E-mailadres
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jij@example.com"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Wachtwoord
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimaal 8 tekens"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Account maken
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <p>
              Heb je al een account?{" "}
              <a href="/login" className="font-semibold text-blue-700">
                Log in
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}