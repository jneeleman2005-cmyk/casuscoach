export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          ← Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Disclaimer
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            CasusCoach is studiehulp, geen juridisch advies.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            CasusCoach is bedoeld om rechtenstudenten te helpen oefenen met
            MC-vragen, casussen, rechtsgebieden en leerstukken. De informatie op
            deze website is uitsluitend bedoeld voor studiedoeleinden.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Geen juridisch advies</h2>

            <p className="mt-4 leading-8 text-slate-600">
              De uitleg, voorbeeldantwoorden, casussen en MC-vragen op
              CasusCoach vormen geen juridisch advies. De inhoud is bedoeld als
              oefenmateriaal voor studenten en mag niet worden gebruikt als
              vervanging van professioneel juridisch advies.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Geen vervanging van onderwijs</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach vervangt geen colleges, werkgroepen, literatuur,
              docentfeedback, tentameninstructies of officiële studiematerialen.
              Gebruik CasusCoach als extra oefenomgeving naast je opleiding.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Geen garantie op juistheid</h2>

            <p className="mt-4 leading-8 text-slate-600">
              We doen ons best om de inhoud duidelijk en zorgvuldig op te
              stellen. Toch kan informatie onvolledig, verouderd of onjuist
              zijn. Controleer belangrijke juridische informatie altijd met je
              studieboek, wettenbundel, docent of andere officiële bron.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Geen garantie op studieresultaat</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Het gebruik van CasusCoach garandeert niet dat je een tentamen,
              opdracht of studieonderdeel behaalt. Je blijft zelf
              verantwoordelijk voor je voorbereiding, leerproces en controle van
              de gebruikte bronnen.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <h2 className="text-2xl font-bold text-blue-950">
              Twijfel je over juridische inhoud?
            </h2>

            <p className="mt-4 leading-8 text-blue-950/80">
              Gebruik CasusCoach dan als startpunt om te oefenen, maar baseer je
              definitieve antwoord altijd op de eisen van je opleiding, je
              voorgeschreven literatuur en actuele wet- en regelgeving.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}