export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-medium text-slate-500 hover:text-blue-700">
          ← Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Contact
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Vragen, feedback of een fout gevonden?
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            CasusCoach is in ontwikkeling. Feedback van rechtenstudenten helpt
            om de vragen, casussen en uitleg steeds beter te maken.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Stuur een bericht</h2>

            <p className="mt-4 leading-7 text-slate-600">
              De contactfunctie wordt later gekoppeld aan een echt formulier.
              Voor nu kun je deze pagina gebruiken als vaste plek voor contact,
              feedback en supportinformatie.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <p className="font-semibold text-blue-950">
                E-mailadres volgt
              </p>

              <p className="mt-3 leading-7 text-blue-950/80">
                Voeg hier later een professioneel contactadres toe, bijvoorbeeld
                <span className="font-semibold"> info@casuscoach.nl</span> of
                <span className="font-semibold"> support@casuscoach.nl</span>.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">
                Waarvoor kun je contact opnemen?
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>✓ Feedback op MC-vragen of casussen</li>
                <li>✓ Een fout in een antwoord of uitleg</li>
                <li>✓ Vragen over abonnementen</li>
                <li>✓ Ideeën voor nieuwe rechtsgebieden of leerstukken</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Support
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Snelste route
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Gaat je vraag over oefenen? Start dan eerst via de oefenpagina
                en kies daarna MC-vragen of casussen.
              </p>

              <a
                href="/oefenen"
                className="mt-5 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Naar oefenen
              </a>
            </div>

            <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Voor studenten
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Suggesties zijn welkom
              </h2>

              <p className="mt-4 leading-7 text-green-950/80">
                Mis je een leerstuk of rechtsgebied? Dan kan dat later worden
                toegevoegd aan de databestanden van CasusCoach.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}