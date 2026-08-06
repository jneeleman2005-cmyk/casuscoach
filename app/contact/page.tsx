import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met CasusCoach of meld een fout in een vraag, casus of uitleg.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Terug naar home
        </a>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Vraag stellen of fout melden.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Zie je een fout in een vraag, casus of toelichting? Of werkt iets
            niet goed? Stuur dan een melding. Zo kunnen we CasusCoach gericht
            verbeteren.
          </p>

          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}