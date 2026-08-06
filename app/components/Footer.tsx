import { getPlatformSettings } from "../lib/platform";

export default async function Footer() {
  const platform = await getPlatformSettings();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">CasusCoach</p>

          <p className="mt-3 max-w-xl leading-7 text-slate-600">
            Oefen rechten met MC-vragen en casussen per rechtsgebied en
            leerstuk. Gericht op tentamenvoorbereiding, toepassing en
            juridische redenering.
          </p>

          {platform.isFreeMode ? (
            <p className="mt-4 w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              Gratis toegang
            </p>
          ) : null}
        </div>

        <div>
          <p className="font-semibold text-slate-950">Platform</p>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              <a href="/over" className="hover:text-blue-700">
                Over CasusCoach
              </a>
            </p>

            <p>
              <a href="/oefenen" className="hover:text-blue-700">
                Kies oefenvorm
              </a>
            </p>

            {!platform.isFreeMode ? (
              <p>
                <a href="/abonnementen" className="hover:text-blue-700">
                  Toegang
                </a>
              </p>
            ) : null}

            <p>
              <a href="/veelgestelde-vragen" className="hover:text-blue-700">
                Veelgestelde vragen
              </a>
            </p>

            <p>
              <a href="/contact" className="hover:text-blue-700">
                Contact
              </a>
            </p>
          </div>
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
              <a href="/account" className="hover:text-blue-700">
                Mijn account
              </a>
            </p>

            {platform.isFreeMode ? (
              <p className="font-semibold text-green-700">
                Alle oefenstof is gratis toegankelijk
              </p>
            ) : (
              <p className="font-semibold text-blue-700">
                Uitgebreide toegang beschikbaar
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-950">Juridisch</p>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              <a href="/disclaimer" className="hover:text-blue-700">
                Disclaimer
              </a>
            </p>

            <p>
              <a href="/privacy" className="hover:text-blue-700">
                Privacy
              </a>
            </p>

            <p>
              <a href="/voorwaarden" className="hover:text-blue-700">
                Voorwaarden
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5">
        <p className="mx-auto max-w-7xl text-sm text-slate-500">
          CasusCoach 2026. Studiehulp voor rechtenstudenten. Geen vervanging
          van juridisch advies of onderwijs.
        </p>
      </div>
    </footer>
  );
}