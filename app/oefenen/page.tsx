export default function OefenenPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar home
        </a>

        <section className="mt-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Kies je oefenvorm
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Hoe wil je oefenen?
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            CasusCoach helpt je op twee manieren: je kunt volledige casussen
            oplossen of MC-vragen oefenen per rechtsgebied en leerstuk.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <a
            href="/casus"
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-white hover:bg-slate-800"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Optie 1
            </p>

            <h2 className="mt-3 text-3xl font-bold">Casus oplossen</h2>

            <p className="mt-5 leading-7 text-slate-300">
              Kies een rechtsgebied en leerstuk. Daarna krijg je een casus die
              je zelf beantwoordt volgens PROC/IRAC. Na het inleveren krijg je
              feedback en een voorbeeldantwoord.
            </p>
          </a>

          <a
            href="/mc"
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-white hover:bg-slate-800"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Optie 2
            </p>

            <h2 className="mt-3 text-3xl font-bold">MC-vragen oefenen</h2>

            <p className="mt-5 leading-7 text-slate-300">
              Kies een rechtsgebied en oefen één leerstuk of een mix van
              leerstukken. Je ziet direct of je antwoord goed is en waarom.
            </p>
          </a>
        </section>
      </div>
    </main>
  );
}
