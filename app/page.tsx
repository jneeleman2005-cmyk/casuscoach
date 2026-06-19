export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
          Voor rechtenstudenten
        </p>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          CasusCoach
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Oefen rechten met MC-vragen, casussen en directe uitleg. Niet alleen
          stampen, maar leren toepassen zoals op je tentamen.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/oefenen"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Start met oefenen
          </a>

          <a
            href="/abonnementen"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Bekijk abonnementen
          </a>
        </div>
      </section>

      <section id="uitleg" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">1. Kies je oefenvorm</h2>
            <p className="mt-3 text-slate-300">
              Oefen met MC-vragen of los volledige casussen op volgens
              PROC/IRAC.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">2. Kies je rechtsgebied</h2>
            <p className="mt-3 text-slate-300">
              Selecteer bijvoorbeeld strafrecht, bestuursrecht, goederenrecht of
              openbare orde recht.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">3. Leer van feedback</h2>
            <p className="mt-3 text-slate-300">
              Je ziet direct uitleg bij MC-vragen en voorbeeldantwoorden bij
              casussen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}