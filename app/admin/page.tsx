import { createClient } from "../lib/supabase/server";
import AdminPaymentSettings from "../components/AdminPaymentSettings";
type RelationName =
  | {
      name: string;
    }
  | {
      name: string;
    }[]
  | null;

type RecentMcQuestion = {
  id: string;
  question: string;
  created_at: string;
  difficulty: string;
  is_premium: boolean;
  subjects: RelationName;
  topics: RelationName;
};

type RecentOpenCase = {
  id: string;
  title: string;
  created_at: string;
  difficulty: string;
  is_premium: boolean;
  subjects: RelationName;
  topics: RelationName;
};

function getRelationName(relation: RelationName) {
  if (!relation) {
    return "Onbekend";
  }

  if (Array.isArray(relation)) {
    return relation[0]?.name ?? "Onbekend";
  }

  return relation.name;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
              Admin
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Je bent niet ingelogd.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Log in met een admin-account om content te beheren.
            </p>

            <a
              href="/login"
              className="mt-8 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Inloggen
            </a>
          </section>
        </div>
      </main>
    );
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminUser) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-4xl">
          <a
            href="/account"
            className="text-sm font-medium text-slate-500 hover:text-blue-700"
          >
        Terug naar account
          </a>

          <section className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
              Geen toegang
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-red-950 sm:text-5xl">
              Je hebt geen adminrechten.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-red-950/80">
              Alleen accounts die in de tabel admin_users staan, mogen
              content beheren.
            </p>

            <a
              href="/account"
              className="mt-8 inline-block rounded-xl bg-red-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-red-800"
            >
        Terug naar account
            </a>
          </section>
        </div>
      </main>
    );
  }

  const [
    subjectsCountResult,
    topicsCountResult,
    mcCountResult,
    casesCountResult,
    recentMcResult,
    recentCasesResult,
  ] = await Promise.all([
    supabase
      .from("subjects")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("topics")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("mc_questions")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("open_cases")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("mc_questions")
      .select(
        "id, question, created_at, difficulty, is_premium, subjects(name), topics(name)",
      )
      .order("created_at", { ascending: false })
      .limit(5),

    supabase
      .from("open_cases")
      .select(
        "id, title, created_at, difficulty, is_premium, subjects(name), topics(name)",
      )
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const subjectsCount = subjectsCountResult.count ?? 0;
  const topicsCount = topicsCountResult.count ?? 0;
  const mcCount = mcCountResult.count ?? 0;
  const casesCount = casesCountResult.count ?? 0;

  const recentMcQuestions = (recentMcResult.data ?? []) as RecentMcQuestion[];
  const recentCases = (recentCasesResult.data ?? []) as RecentOpenCase[];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <a
          href="/account"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
        Terug naar account
        </a>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Admin dashboard
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Beheer de content van CasusCoach.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Voeg MC-vragen en open casussen toe, controleer hoeveel content er
              live staat en bouw rustig verder aan staatsrecht en internationaal
              recht.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Adminstatus
            </p>

            <p className="mt-3 text-2xl font-bold text-blue-950">
              Actief beheeraccount
            </p>

            <p className="mt-3 leading-7 text-blue-950/80">
              Je kunt content toevoegen en beheren.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Rechtsgebieden
            </p>

            <p className="mt-3 text-4xl font-bold">{subjectsCount}</p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Actieve vakken in het platform.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Leerstukken</p>

            <p className="mt-3 text-4xl font-bold">{topicsCount}</p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Onderwerpen waarop studenten kunnen filteren.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold text-blue-700">MC-vragen</p>

            <p className="mt-3 text-4xl font-bold text-blue-950">{mcCount}</p>

            <p className="mt-3 text-sm leading-6 text-blue-950/80">
              Meerkeuzevragen met antwoord en toelichting.
            </p>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
            <p className="text-sm font-semibold text-green-700">
              Open casussen
            </p>

            <p className="mt-3 text-4xl font-bold text-green-950">
              {casesCount}
            </p>

            <p className="mt-3 text-sm leading-6 text-green-950/80">
              Casussen met modelantwoord en beoordelingspunten.
            </p>
          </div>
        </section>
<section className="mt-8">
  <AdminPaymentSettings />
</section>
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Snelle acties</h2>

            <p className="mt-3 leading-7 text-slate-600">
              Voeg nieuwe oefenstof toe zonder in de database te hoeven werken.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/admin/vragen"
                className="rounded-2xl border border-blue-200 bg-blue-50 p-6 transition hover:border-blue-300 hover:bg-blue-100"
              >
                <p className="text-lg font-bold text-blue-950">
                  MC-vraag toevoegen
                </p>

                <p className="mt-3 text-sm leading-6 text-blue-950/80">
                  Voeg vraag, antwoordopties, juiste antwoord en toelichting
                  toe.
                </p>
              </a>

              <a
                href="/admin/casussen"
                className="rounded-2xl border border-green-200 bg-green-50 p-6 transition hover:border-green-300 hover:bg-green-100"
              >
                <p className="text-lg font-bold text-green-950">
                  Casus toevoegen
                </p>

                <p className="mt-3 text-sm leading-6 text-green-950/80">
                  Voeg casustekst, modelantwoord en beoordelingspunten toe.
                </p>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Livegang-check</h2>

            <p className="mt-3 leading-7 text-slate-600">
              Richting livegang wil je vooral genoeg kwalitatieve content hebben.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold">MC-vragen minimum</p>
                  <p className="font-bold">{mcCount}/40</p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-blue-700"
                    style={{
                      width: `${Math.min((mcCount / 40) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold">Open casussen minimum</p>
                  <p className="font-bold">{casesCount}/10</p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-green-700"
                    style={{
                      width: `${Math.min((casesCount / 10) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                Advies voor eerste liveversie: minimaal 20 MC-vragen en 5
                casussen per rechtsgebied.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Recente MC-vragen</h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Vraag</th>
                    <th className="px-4 py-4 font-semibold">Vak</th>
                    <th className="px-4 py-4 font-semibold">Type</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {recentMcQuestions.length > 0 ? (
                    recentMcQuestions.map((question) => (
                      <tr key={question.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="line-clamp-2 font-semibold">
                            {question.question}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {getRelationName(question.topics)} {" "}
                            {formatDate(question.created_at)}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {getRelationName(question.subjects)}
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            {question.is_premium ? "Premium" : "Gratis"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Nog geen MC-vragen toegevoegd.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Recente casussen</h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Casus</th>
                    <th className="px-4 py-4 font-semibold">Vak</th>
                    <th className="px-4 py-4 font-semibold">Type</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {recentCases.length > 0 ? (
                    recentCases.map((openCase) => (
                      <tr key={openCase.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="line-clamp-2 font-semibold">
                            {openCase.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {getRelationName(openCase.topics)} {" "}
                            {formatDate(openCase.created_at)}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-slate-700">
                          {getRelationName(openCase.subjects)}
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            {openCase.is_premium ? "Premium" : "Gratis"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Nog geen open casussen toegevoegd.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}