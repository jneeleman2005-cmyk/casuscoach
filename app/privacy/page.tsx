export default function PrivacyPage() {
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
            Privacy
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Privacyverklaring van CasusCoach.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Op deze pagina lees je hoe CasusCoach met persoonsgegevens omgaat.
            CasusCoach is op dit moment in ontwikkeling. Deze privacyverklaring
            wordt later aangepast zodra accounts, betalingen of AI-feedback
            technisch worden gekoppeld.
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">1. Welke gegevens kunnen worden verwerkt?</h2>

            <p className="mt-4 leading-8 text-slate-600">
              In de huidige versie kun je CasusCoach gebruiken zonder account.
              Zodra functies zoals registratie, inloggen, abonnementen,
              betalingen of AI-feedback worden toegevoegd, kunnen gegevens
              worden verwerkt zoals naam, e-mailadres, abonnementsstatus,
              betaalinformatie, oefenresultaten en ingevulde antwoorden.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">2. Waarvoor worden gegevens gebruikt?</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Gegevens kunnen worden gebruikt om het platform te laten werken,
              gebruikers toegang te geven tot gratis of premiumfuncties,
              betalingen te verwerken, voortgang bij te houden, feedback te
              geven en CasusCoach technisch te verbeteren.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">3. Betalingen</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Betalingen zijn op dit moment nog niet gekoppeld. Als CasusCoach
              later betaalde abonnementen aanbiedt, kan gebruik worden gemaakt
              van een externe betaaldienst zoals Stripe of Mollie. CasusCoach
              slaat dan zelf geen volledige betaalkaartgegevens op.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">4. AI-feedback</h2>

            <p className="mt-4 leading-8 text-slate-600">
              AI-feedback is bedoeld als latere functie. Als deze functie wordt
              toegevoegd, kunnen ingevulde casusantwoorden worden verwerkt om
              feedback te genereren. Gebruik bij voorkeur geen gevoelige
              persoonsgegevens in oefenantwoorden.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">5. Cookies en technische gegevens</h2>

            <p className="mt-4 leading-8 text-slate-600">
              CasusCoach kan technische gegevens gebruiken die nodig zijn om de
              website goed te laten werken, zoals browserinformatie, apparaat,
              foutmeldingen en gebruik van pagina’s. Als later analytische of
              marketingcookies worden gebruikt, wordt deze privacyverklaring
              daarop aangepast.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">6. Delen met derden</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Gegevens kunnen later worden gedeeld met noodzakelijke technische
              dienstverleners, bijvoorbeeld voor hosting, authenticatie,
              betalingen, e-mail of AI-functionaliteit. Dit gebeurt alleen voor
              zover dat nodig is om CasusCoach te laten functioneren.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">7. Bewaartermijnen</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Persoonsgegevens worden niet langer bewaard dan nodig is voor het
              doel waarvoor ze zijn verzameld, tenzij een wettelijke verplichting
              een langere bewaartermijn vereist.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">8. Rechten van gebruikers</h2>

            <p className="mt-4 leading-8 text-slate-600">
              Gebruikers kunnen later verzoeken om inzage, correctie,
              verwijdering of beperking van hun persoonsgegevens. Zodra
              gebruikersaccounts en contactgegevens definitief zijn ingericht,
              wordt hier uitgelegd hoe zo’n verzoek kan worden ingediend.
            </p>
          </article>

          <article className="rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <h2 className="text-2xl font-bold text-blue-950">
              Privacyverklaring in ontwikkeling
            </h2>

            <p className="mt-4 leading-8 text-blue-950/80">
              Deze privacyverklaring is een basisversie voor de huidige
              ontwikkelfase van CasusCoach. Laat deze tekst juridisch controleren
              voordat je accounts, betalingen of AI-feedback daadwerkelijk aan
              gebruikers aanbiedt.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}