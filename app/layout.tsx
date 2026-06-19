import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CasusCoach | Oefen rechten slimmer",
  description:
    "Oefen MC-vragen en casussen per rechtsgebied en leerstuk. Voor rechtenstudenten die zich slimmer willen voorbereiden op tentamens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-slate-50 text-slate-950 antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 font-bold text-white">
                C
              </div>

              <div>
                <p className="font-bold leading-none text-slate-950">
                  CasusCoach
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Voor rechtenstudenten
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <a href="/oefenen" className="hover:text-blue-700">
                Oefenen
              </a>

              <a href="/mc" className="hover:text-blue-700">
                MC-vragen
              </a>

              <a href="/casus" className="hover:text-blue-700">
                Casussen
              </a>

              <a href="/abonnementen" className="hover:text-blue-700">
                Abonnementen
              </a>
            </nav>

            <a
              href="/oefenen"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Start gratis
            </a>
          </div>
        </header>

        {children}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <p className="text-lg font-bold">CasusCoach</p>

              <p className="mt-3 max-w-xl leading-7 text-slate-600">
                Oefen rechten met MC-vragen en casussen per rechtsgebied en
                leerstuk. Gericht op tentamenvoorbereiding, toepassing en
                juridische redenering.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-950">Oefenen</p>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>
                  <a href="/mc" className="hover:text-blue-700">
                    MC-vragen
                  </a>
                </p>

                <p>
                  <a href="/casus" className="hover:text-blue-700">
                    Casussen
                  </a>
                </p>

                <p>
                  <a href="/oefenen" className="hover:text-blue-700">
                    Kies oefenvorm
                  </a>
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-950">Studentenprijzen</p>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Gratis demo beschikbaar</p>
                <p>Premium vanaf €2,99 per week</p>
                <p>
                  <a href="/abonnementen" className="hover:text-blue-700">
                    Bekijk abonnementen
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-6 py-5">
            <p className="mx-auto max-w-7xl text-sm text-slate-500">
              © 2026 CasusCoach. Studiehulp voor rechtenstudenten. Geen
              vervanging van juridisch advies of onderwijs.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}