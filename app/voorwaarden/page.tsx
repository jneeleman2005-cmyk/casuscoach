export default function VoorwaardenPage() {
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
            Voorwaarden
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Gebruiksvoorwaarden van CasusCoach.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Deze voorwaarden beschrijven op hoofdlijnen hoe CasusCoach gebruikt
            mag worden. CasusCoach is nog in ontwikkeling. Laat deze tekst
            juridisch controleren voordat je betaalde abonnementen, accounts of
            AI-feedback actief aanbiedt.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">1. Gebruik van CasusCoach</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach is bedoeld als digitale studiehulp voor
              rechtenstudenten. Je mag het platform gebruiken om te oefenen met
              MC-vragen, casussen, rechtsgebieden en leerstukken.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">2. Studiehulp, geen juridisch advies</h2>

            <p className="mt-4 leading-8 text-slate-600">
              De inhoud van CasusCoach is uitsluitend bedoeld voor
              studiedoeleinden. De vragen, casussen, uitleg en
              voorbeeldantwoorden vormen geen juridisch advies en vervangen geen
              onderwijs, literatuur, docentfeedback of professionele juridische
              bijstand.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">3. Account en toegang</h2>

            <p className="mt-4 leading-8 text-slate-600">
              In de huidige ontwikkelfase kan CasusCoach zonder account worden
              gebruikt. Als later accounts worden toegevoegd, ben je zelf
              verantwoordelijk voor het veilig bewaren van je inloggegevens en
              voor het gebruik van je account.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">4. Gratis en betaalde functies</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach kan gratis en betaalde functies aanbieden. De gratis
              demo kan beperkt zijn in aantal vragen, casussen of
              functionaliteiten. Betaalde functies worden pas definitief actief
              zodra accounts en betalingen technisch zijn gekoppeld.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">5. Betalingen en abonnementen</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Betalingen zijn op dit moment nog niet gekoppeld. Als CasusCoach
              later betaalde abonnementen aanbiedt, worden prijs, looptijd,
              verlenging, opzegging en betaalwijze duidelijk vermeld voordat je
              een abonnement afsluit.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">6. Intellectuele eigendom</h2>

            <p className="mt-4 leading-8 text-slate-600">
              De inhoud, vormgeving, teksten, vragen, casussen,
              voorbeeldantwoorden en structuur van CasusCoach mogen niet zonder
              toestemming worden gekopieerd, verspreid, verkocht of gebruikt voor
              een concurrerende dienst.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">7. Toegestaan gebruik</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Je mag CasusCoach gebruiken voor normale studiedoeleinden. Het is
              niet toegestaan het platform te misbruiken, beveiliging te
              omzeilen, geautomatiseerd grote hoeveelheden content te kopiëren
              of content te gebruiken op een manier die schadelijk is voor
              CasusCoach of andere gebruikers.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">8. Beschikbaarheid</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach probeert het platform goed beschikbaar te houden, maar
              kan niet garanderen dat de website altijd foutloos, veilig of
              onafgebroken beschikbaar is. Onderhoud, storingen of wijzigingen
              kunnen tijdelijk invloed hebben op de werking.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">9. Wijzigingen</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach kan de inhoud, functies, prijzen en voorwaarden later
              aanpassen. Bij belangrijke wijzigingen wordt de informatie op de
              website bijgewerkt.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <h2 className="text-2xl font-bold text-blue-950">
              Voorwaarden in ontwikkeling
            </h2>

            <p className="mt-4 leading-8 text-blue-950/80">
              Deze voorwaarden zijn een basisversie voor de ontwikkelfase van
              CasusCoach. Laat ze juridisch controleren voordat je het platform
              commercieel inzet met gebruikersaccounts, betalingen of
              AI-feedback.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}