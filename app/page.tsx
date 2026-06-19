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
          Oefen strafrecht met MC-vragen, casussen en directe uitleg. Niet
          alleen stampen, maar leren toepassen zoals op je tentamen.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/strafrecht"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Start met strafrecht
          </a>

          <a
            href="#uitleg"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Hoe werkt het?
          </a>
        </div>
      </section>

      <section id="uitleg" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">1. Lees de casus</h2>
            <p className="mt-3 text-slate-300">
              Je krijgt korte juridische situaties zoals je die ook op een
              tentamen kunt tegenkomen.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">2. Kies je antwoord</h2>
            <p className="mt-3 text-slate-300">
              Beantwoord MC-vragen en ontdek meteen of je juridisch juist
              redeneert.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold">3. Leer van uitleg</h2>
            <p className="mt-3 text-slate-300">
              Je ziet niet alleen het juiste antwoord, maar ook waarom de andere
              opties fout zijn.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
