export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-950">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mx-auto w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          404 · Pagina niet gevonden
        </p>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Deze pagina bestaat niet.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          De link die je hebt geopend klopt niet of de pagina is verplaatst.
          Ga terug naar de homepage van CasusCoach.
        </p>

        <div className="mt-10">
          <a
            href="/"
            className="inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Terug naar home
          </a>
        </div>
      </section>
    </main>
  );
}