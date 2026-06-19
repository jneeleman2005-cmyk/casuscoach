export default function OverPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-medium text-slate-500 hover:text-blue-700">
          ← Terug naar home
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Over CasusCoach
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Studiehulp voor rechtenstudenten die willen leren toepassen.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            CasusCoach is gemaakt voor rechtenstudenten die niet alleen stof
            willen herkennen, maar vooral willen oefenen met de manier waarop
            juridische kennis op tentamens wordt getoetst.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Probleem
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Je kent de stof, maar toepassen blijft lastig.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Veel rechtenstudenten leren begrippen en artikelen, maar lopen
              vast zodra ze een casus moeten analyseren of MC-antwoorden moeten
              onderscheiden.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Oplossing
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Oefenen per rechtsgebied en leerstuk.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Je kiest gericht wat je wilt trainen, bijvoorbeeld poging,
              medeplegen, belanghebbende, overdracht of openbare orde. Daarna
              oefen je met MC-vragen of casussen.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Doel
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Beter juridisch redeneren.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              CasusCoach helpt je stap voor stap oefenen met rechtsvraag,
              rechtsregel, toepassing en conclusie. Zo train je niet alleen
              kennis, maar ook juridische denkvaardigheid.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-blue-200 bg-blue-50 p-8">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Voor wie?
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Voor HBO- en WO-rechtenstudenten.
              </h2>

              <p className="mt-5 leading-8 text-blue-950/80">
                CasusCoach is bedoeld als extra oefenomgeving naast colleges,
                werkgroepen, literatuur en oude tentamens. Het platform helpt je
                vooral met herhalen, toepassen en controleren of je de kern van
                een leerstuk begrijpt.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
              <p className="font-semibold text-slate-950">
                Je kunt oefenen met:
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>✓ MC-vragen met directe uitleg</li>
                <li>✓ Casussen met voorbeeldantwoord</li>
                <li>✓ Rechtsgebieden en leerstukken</li>
                <li>✓ Later: AI-feedback op casusantwoorden</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Belangrijk
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            CasusCoach is studiehulp, geen juridisch advies.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            De uitleg, vragen en voorbeeldantwoorden zijn bedoeld om te oefenen
            voor je studie. Ze vervangen geen onderwijs, docentfeedback,
            literatuur of professioneel juridisch advies.
          </p>
        </section>
      </div>
    </main>
  );
}