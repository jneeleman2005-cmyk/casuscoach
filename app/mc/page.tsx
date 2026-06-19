const subjects = [
  {
    name: "Strafrecht",
    slug: "strafrecht",
    available: true,
    href: "/strafrecht",
    topics: ["Mix", "Poging", "Medeplegen", "Noodweer", "Opzet", "Diefstal"],
  },
  {
    name: "Bestuursrecht",
    slug: "bestuursrecht",
    available: false,
    href: "#",
    topics: ["Besluit", "Belanghebbende", "Bezwaar", "Evenredigheid", "Handhaving"],
  },
  {
    name: "Europees recht",
    slug: "europees-recht",
    available: false,
    href: "#",
    topics: ["Voorrang", "Rechtstreekse werking", "Vrij verkeer", "EU-instellingen"],
  },
  {
    name: "Internationaal recht",
    slug: "internationaal-recht",
    available: false,
    href: "#",
    topics: ["Verdragen", "Staatsaansprakelijkheid", "Immuniteit", "Mensenrechten"],
  },
  {
    name: "Staatsrecht",
    slug: "staatsrecht",
    available: false,
    href: "#",
    topics: ["Grondrechten", "Trias politica", "Wetgeving", "Ministeriële verantwoordelijkheid"],
  },
  {
    name: "Goederenrecht",
    slug: "goederenrecht",
    available: false,
    href: "#",
    topics: ["Eigendom", "Bezit", "Houderschap", "Overdracht"],
  },
  {
    name: "Bedrijfsrecht",
    slug: "bedrijfsrecht",
    available: false,
    href: "#",
    topics: ["BV", "NV", "Bestuurdersaansprakelijkheid", "Vertegenwoordiging"],
  },
  {
    name: "Openbare orde recht",
    slug: "openbare-orde-recht",
    available: false,
    href: "#",
    topics: ["APV", "Noodbevel", "Noodverordening", "Wet Damocles", "Demonstratierecht"],
  },
];

export default function McPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/oefenen" className="text-sm text-slate-400 hover:text-white">
          ← Terug naar oefenvormen
        </a>

        <section className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            MC-vragen oefenen
          </p>

          <h1 className="mt-4 text-4xl font-bold">Kies een rechtsgebied</h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Kies eerst een rechtsgebied. Daarna oefen je per leerstuk of met een
            mix van leerstukken. Je ziet direct of je antwoord goed is en waarom
            de andere antwoorden niet kloppen.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {subjects.map((subject) => (
              <a
                key={subject.slug}
                href={subject.href}
                className={`rounded-3xl border p-6 transition ${
                  subject.available
                    ? "border-slate-800 bg-slate-900 hover:border-white hover:bg-slate-800"
                    : "cursor-not-allowed border-slate-900 bg-slate-900/40 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{subject.name}</h2>

                    <p className="mt-3 text-slate-300">
                      Oefen MC-vragen per leerstuk of in gemengde volgorde.
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      subject.available
                        ? "bg-green-950 text-green-300"
                        : "bg-slate-950 text-slate-500"
                    }`}
                  >
                    {subject.available ? "Beschikbaar" : "Binnenkort"}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {subject.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
