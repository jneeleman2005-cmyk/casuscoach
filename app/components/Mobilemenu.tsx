"use client";

import { useState } from "react";

type MobileMenuProps = {
  isFreeMode: boolean;
};

export default function MobileMenu({ isFreeMode }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <span className="text-2xl leading-none">☰</span>
        )}
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

            {!isFreeMode ? (
              <a href="/abonnementen" className="hover:text-blue-700">
                Abonnementen
              </a>
            ) : null}

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