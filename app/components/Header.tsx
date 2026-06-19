import Logo from "./logo";
import { createClient } from "../lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
  <Logo />

  <div>
    <p className="font-bold leading-none text-slate-950">CasusCoach</p>
    <p className="mt-1 text-xs text-slate-500">
      Voor rechtenstudenten
    </p>
  </div>
</a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <a href="/over" className="hover:text-blue-700">
            Over
          </a>

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

          <a href="/veelgestelde-vragen" className="hover:text-blue-700">
            FAQ
          </a>

          <a href="/contact" className="hover:text-blue-700">
            Contact
          </a>
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <a
              href="/account"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Mijn account
            </a>

            <a
              href="/auth/logout"
              className="hidden rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-100 sm:inline-block"
            >
              Uitloggen
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 sm:inline-block"
            >
              Inloggen
            </a>

            <a
              href="/registreren"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Account maken
            </a>
          </div>
        )}
      </div>
    </header>
  );
}