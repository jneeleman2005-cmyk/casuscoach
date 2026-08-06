"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
      >
        Menu
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[73px] z-50 border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
          <nav className="grid gap-4 text-sm font-semibold text-slate-700">
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
        </div>
      ) : null}
    </div>
  );
}
