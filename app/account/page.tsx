import { createClient } from "../lib/supabase/server";

type Subject = {
  id: string;
  name: string;
  slug: string;
};

type McAttemptRow = {
  created_at: string;
  is_correct: boolean;
  mc_questions:
    | {
        subject_id: string;
      }
    | {
        subject_id: string;
      }[]
    | null;
};

type CaseAttemptRow = {
  created_at: string;
  open_cases:
    | {
        subject_id: string;
      }
    | {
        subject_id: string;
      }[]
    | null;
};

type SubjectProgress = {
  subjectId: string;
  subjectName: string;
  mcTotal: number;
  mcCorrect: number;
  mcScore: number;
  caseTotal: number;
  totalActivity: number;
  lastActivity: string | null;
};

function formatDate(value: string | null) {
  if (!value) {
    return "Nog geen activiteit";
  }

  return new Date(value).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getRelationSubjectId(
  relation:
    | {
        subject_id: string;
      }
    | {
        subject_id: string;
      }[]
    | null,
) {
  if (!relation) {
    return null;
  }

  if (Array.isArray(relation)) {
    return relation[0]?.subject_id ?? null;
  }

  return relation.subject_id;
}

function getScore(correct: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((correct / total) * 100);
}

function getActivityLabel(total: number) {
  if (total === 0) {
    return "Nog niet gestart";
  }

  if (total < 5) {
    return "Net begonnen";
  }

  if (total < 15) {
    return "Goed bezig";
  }

  return "Sterk actief";
}

export default async function AccountPage() {
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
              Mijn account
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Je bent nog niet ingelogd.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Log in of maak een account aan om je persoonlijke voortgang te
              bekijken.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Inloggen
              </a>

              <a
                href="/registreren"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Account maken
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const displayName =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : "Student";

  const [
    subjectsResult,
    mcAttemptsResult,
    caseAttemptsResult,
    adminResult,
  ] = await Promise.all([
    supabase
      .from("subjects")
      .select("id, name, slug")
      .eq("is_published", true)
      .order("sort_order", { ascending: true }),

    supabase
      .from("user_mc_attempts")
      .select(
        "created_at, is_correct, mc_questions(subject_id)",
      )
      .order("created_at", { ascending: false }),

    supabase
      .from("user_case_attempts")
      .select(
        "created_at, open_cases(subject_id)",
      )
      .order("created_at", { ascending: false }),

    supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const subjects = (subjectsResult.data ?? []) as Subject[];
  const mcAttempts = (mcAttemptsResult.data ?? []) as McAttemptRow[];
  const caseAttempts = (caseAttemptsResult.data ?? []) as CaseAttemptRow[];
  const isAdmin = Boolean(adminResult.data);

  const progressBySubject = new Map<string, SubjectProgress>();

  subjects.forEach((subject) => {
    progressBySubject.set(subject.id, {
      subjectId: subject.id,
      subjectName: subject.name,
      mcTotal: 0,
      mcCorrect: 0,
      mcScore: 0,
      caseTotal: 0,
      totalActivity: 0,
      lastActivity: null,
    });
  });

  mcAttempts.forEach((attempt) => {
    const subjectId = getRelationSubjectId(attempt.mc_questions);

    if (!subjectId) {
      return;
    }

    const progress = progressBySubject.get(subjectId);

    if (!progress) {
      return;
    }

    progress.mcTotal += 1;

    if (attempt.is_correct) {
      progress.mcCorrect += 1;
    }

    if (
      !progress.lastActivity ||
      new Date(attempt.created_at) > new Date(progress.lastActivity)
    ) {
      progress.lastActivity = attempt.created_at;
    }
  });

  caseAttempts.forEach((attempt) => {
    const subjectId = getRelationSubjectId(attempt.open_cases);

    if (!subjectId) {
      return;
    }

    const progress = progressBySubject.get(subjectId);

    if (!progress) {
      return;
    }

    progress.caseTotal += 1;

    if (
      !progress.lastActivity ||
      new Date(attempt.created_at) > new Date(progress.lastActivity)
    ) {
      progress.lastActivity = attempt.created_at;
    }
  });

  const progressRows = Array.from(progressBySubject.values()).map((row) => {
    const mcScore = getScore(row.mcCorrect, row.mcTotal);

    return {
      ...row,
      mcScore,
      totalActivity: row.mcTotal + row.caseTotal,
    };
  });

  const totalMcAttempts = mcAttempts.length;
  const totalCorrectMcAttempts = mcAttempts.filter(
    (attempt) => attempt.is_correct,
  ).length;
  const totalCaseAttempts = caseAttempts.length;
  const totalActivity = totalMcAttempts + totalCaseAttempts;
  const successRate = getScore(totalCorrectMcAttempts, totalMcAttempts);

  const lastMcDate = mcAttempts[0]?.created_at ?? null;
  const lastCaseDate = caseAttempts[0]?.created_at ?? null;

  const lastActivity =
    lastMcDate && lastCaseDate
      ? new Date(lastMcDate) > new Date(lastCaseDate)
        ? lastMcDate
        : lastCaseDate
      : lastMcDate || lastCaseDate;

  const mostActiveSubject = [...progressRows]
    .sort((a, b) => b.totalActivity - a.totalActivity)
    .at(0);

  const bestScoreSubject = [...progressRows]
    .filter((row) => row.mcTotal > 0)
    .sort((a, b) => b.mcScore - a.mcScore)
    .at(0);

  const recentActivityRows = [
    ...mcAttempts.slice(0, 5).map((attempt) => ({
      type: "MC-vraag",
      result: attempt.is_correct ? "Goed" : "Fout",
      date: attempt.created_at,
    })),
    ...caseAttempts.slice(0, 5).map((attempt) => ({
      type: "Open casus",
      result: "Ingeleverd",
      date: attempt.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <a
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
        Terug naar home
        </a>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Mijn account
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Welkom terug, {displayName}.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Je persoonlijke oefenomgeving is actief. Hier zie je je voortgang,
              score en activiteit per rechtsgebied.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Laatste activiteit
            </p>

            <p className="mt-3 text-2xl font-bold text-blue-950">
              {formatDate(lastActivity)}
            </p>

            <p className="mt-3 leading-7 text-blue-950/80">
              Totaal opgeslagen oefeningen:{" "}
              <span className="font-bold">{totalActivity}</span>
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              MC-pogingen
            </p>
            <p className="mt-3 text-4xl font-bold">{totalMcAttempts}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Alle opgeslagen meerkeuze-antwoorden.
            </p>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
            <p className="text-sm font-semibold text-green-700">
              Goed beantwoord
            </p>
            <p className="mt-3 text-4xl font-bold text-green-950">
              {totalCorrectMcAttempts}
            </p>
            <p className="mt-3 text-sm leading-6 text-green-950/80">
              Je totale aantal juiste MC-antwoorden.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-semibold text-blue-700">Gemiddelde score</p>
            <p className="mt-3 text-4xl font-bold text-blue-950">
              {successRate}%
            </p>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-blue-700"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Casusantwoorden
            </p>
            <p className="mt-3 text-4xl font-bold">{totalCaseAttempts}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Open antwoorden die je hebt opgeslagen.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Voortgang per rechtsgebied
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Bekijk per vak hoeveel je hebt geoefend en hoe je scoort op
                  MC-vragen.
                </p>
              </div>

              <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                Live data
              </span>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Rechtsgebied</th>
                    <th className="px-4 py-4 font-semibold">MC</th>
                    <th className="px-4 py-4 font-semibold">Score</th>
                    <th className="px-4 py-4 font-semibold">Casussen</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {progressRows.map((row) => (
                    <tr key={row.subjectId} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-semibold">
                        {row.subjectName}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {row.mcTotal}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex min-w-32 items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-700"
                              style={{ width: `${row.mcScore}%` }}
                            />
                          </div>

                          <span className="font-semibold">{row.mcScore}%</span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {row.caseTotal}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          {getActivityLabel(row.totalActivity)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Gratis toegang
              </p>

              <h2 className="mt-3 text-2xl font-bold text-green-950">
                Volledige toegang actief
              </h2>

              <p className="mt-4 leading-7 text-green-950/80">
                Later wordt hier automatisch getoond of je een actief
                toegang hebt. Met Gratis toegang kun je onbeperkt oefenen.
              </p>

              <a
                href="/oefenen"
                className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
              >
                Start met oefenen
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Highlights</h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Meest geoefend
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {mostActiveSubject && mostActiveSubject.totalActivity > 0
                      ? mostActiveSubject.subjectName
                      : "Nog geen data"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Beste MC-score
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {bestScoreSubject
                      ? `${bestScoreSubject.subjectName} - ${bestScoreSubject.mcScore}%`
                      : "Nog geen MC-score"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Volgende stap
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    Meer oefenen per leerstuk
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recente activiteit</h2>

              <p className="mt-3 leading-7 text-slate-600">
                Je laatste opgeslagen oefeningen in een overzicht.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/mc"
                className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                MC oefenen
              </a>

              <a
                href="/casus"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Casus maken
              </a>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4 font-semibold">Type</th>
                  <th className="px-4 py-4 font-semibold">Resultaat</th>
                  <th className="px-4 py-4 font-semibold">Datum</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {recentActivityRows.length > 0 ? (
                  recentActivityRows.map((activity) => (
                    <tr key={`${activity.type}-${activity.date}`}>
                      <td className="px-4 py-4 font-semibold">
                        {activity.type}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {activity.result}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {formatDate(activity.date)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      Nog geen activiteit opgeslagen.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {isAdmin ? (
          <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Admin
                </p>

                <h2 className="mt-3 text-2xl font-bold text-blue-950">
                  Contentbeheer
                </h2>

                <p className="mt-4 max-w-3xl leading-8 text-blue-950/80">
                  Je hebt adminrechten. Voeg nieuwe MC-vragen en open casussen
                  toe voor staatsrecht en internationaal recht.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/admin/vragen"
                  className="rounded-xl bg-blue-700 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-blue-800"
                >
                  MC-vraag toevoegen
                </a>

                <a
                  href="/admin/casussen"
                  className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-center font-semibold text-blue-700 shadow-sm transition hover:border-blue-300"
                >
                  Casus toevoegen
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}