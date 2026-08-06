"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Subject = {
  id: string;
  name: string;
  slug: string;
  is_published: boolean;
  sort_order: number;
};

type Topic = {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  is_published: boolean;
  sort_order: number;
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminCategorieenPage() {
  const supabase = createClient();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [subjectName, setSubjectName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [topicSubjectId, setTopicSubjectId] = useState("");

  const [editingSubjectId, setEditingSubjectId] = useState("");
  const [editingSubjectName, setEditingSubjectName] = useState("");

  const [editingTopicId, setEditingTopicId] = useState("");
  const [editingTopicName, setEditingTopicName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const topicsBySubject = useMemo(() => {
    return subjects.map((subject) => ({
      subject,
      topics: topics.filter((topic) => topic.subject_id === subject.id),
    }));
  }, [subjects, topics]);

  async function loadData() {
    setLoading(true);
    setError("");

    const { data: subjectsData, error: subjectsError } = await supabase
      .from("subjects")
      .select("id, name, slug, is_published, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (subjectsError) {
      setError("Categorieen konden niet worden geladen.");
      setLoading(false);
      return;
    }

    const { data: topicsData, error: topicsError } = await supabase
      .from("topics")
      .select("id, subject_id, name, slug, is_published, sort_order")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (topicsError) {
      setError("Subcategorieen konden niet worden geladen.");
      setLoading(false);
      return;
    }

    const loadedSubjects = (subjectsData ?? []) as Subject[];
    setSubjects(loadedSubjects);
    setTopics((topicsData ?? []) as Topic[]);

    if (!topicSubjectId && loadedSubjects.length > 0) {
      setTopicSubjectId(loadedSubjects[0].id);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addSubject() {
    const name = subjectName.trim();

    if (!name) {
      setError("Vul een categorienaam in.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const nextSortOrder =
      subjects.length > 0
        ? Math.max(...subjects.map((subject) => subject.sort_order ?? 0)) + 1
        : 1;

    const { error } = await supabase.from("subjects").insert({
      name,
      slug: makeSlug(name),
      is_published: true,
      sort_order: nextSortOrder,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSubjectName("");
    setSuccess("Categorie toegevoegd.");
    await loadData();
    setSaving(false);
  }

  async function addTopic() {
    const name = topicName.trim();

    if (!topicSubjectId) {
      setError("Kies eerst een hoofdcategorie.");
      return;
    }

    if (!name) {
      setError("Vul een subcategorienaam in.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const currentSubjectTopics = topics.filter(
      (topic) => topic.subject_id === topicSubjectId,
    );

    const nextSortOrder =
      currentSubjectTopics.length > 0
        ? Math.max(...currentSubjectTopics.map((topic) => topic.sort_order ?? 0)) + 1
        : 1;

    const { error } = await supabase.from("topics").insert({
      subject_id: topicSubjectId,
      name,
      slug: makeSlug(name),
      is_published: true,
      sort_order: nextSortOrder,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setTopicName("");
    setSuccess("Subcategorie toegevoegd.");
    await loadData();
    setSaving(false);
  }

  async function updateSubjectName(subject: Subject) {
    const name = editingSubjectName.trim();

    if (!name) {
      setError("Categorienaam mag niet leeg zijn.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("subjects")
      .update({
        name,
        slug: makeSlug(name),
      })
      .eq("id", subject.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setEditingSubjectId("");
    setEditingSubjectName("");
    setSuccess("Categorie bijgewerkt.");
    await loadData();
    setSaving(false);
  }

  async function updateTopicName(topic: Topic) {
    const name = editingTopicName.trim();

    if (!name) {
      setError("Subcategorienaam mag niet leeg zijn.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("topics")
      .update({
        name,
        slug: makeSlug(name),
      })
      .eq("id", topic.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setEditingTopicId("");
    setEditingTopicName("");
    setSuccess("Subcategorie bijgewerkt.");
    await loadData();
    setSaving(false);
  }

  async function toggleSubject(subject: Subject) {
    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("subjects")
      .update({
        is_published: !subject.is_published,
      })
      .eq("id", subject.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    await loadData();
    setSaving(false);
  }

  async function toggleTopic(topic: Topic) {
    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("topics")
      .update({
        is_published: !topic.is_published,
      })
      .eq("id", topic.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    await loadData();
    setSaving(false);
  }

  async function deleteSubject(subject: Subject) {
    setError("");
    setSuccess("");

    const linkedTopics = topics.filter((topic) => topic.subject_id === subject.id);

    const { count: mcCount, error: mcError } = await supabase
      .from("mc_questions")
      .select("id", { count: "exact", head: true })
      .eq("subject_id", subject.id);

    if (mcError) {
      setError("Kon niet controleren of deze categorie MC-vragen heeft.");
      return;
    }

    const { count: caseCount, error: caseError } = await supabase
      .from("open_cases")
      .select("id", { count: "exact", head: true })
      .eq("subject_id", subject.id);

    if (caseError) {
      setError("Kon niet controleren of deze categorie casussen heeft.");
      return;
    }

    if (linkedTopics.length > 0 || (mcCount ?? 0) > 0 || (caseCount ?? 0) > 0) {
      setError(
        "Deze categorie kan niet worden verwijderd, omdat er nog subcategorieen, MC-vragen of casussen aan gekoppeld zijn. Verberg de categorie of verplaats/verwijder eerst de gekoppelde content.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Weet je zeker dat je de categorie "${subject.name}" wilt verwijderen?`,
    );

    if (!confirmed) return;

    setSaving(true);

    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", subject.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSuccess("Categorie verwijderd.");
    await loadData();
    setSaving(false);
  }

  async function deleteTopic(topic: Topic) {
    setError("");
    setSuccess("");

    const { count: mcCount, error: mcError } = await supabase
      .from("mc_questions")
      .select("id", { count: "exact", head: true })
      .eq("topic_id", topic.id);

    if (mcError) {
      setError("Kon niet controleren of deze subcategorie MC-vragen heeft.");
      return;
    }

    const { count: caseCount, error: caseError } = await supabase
      .from("open_cases")
      .select("id", { count: "exact", head: true })
      .eq("topic_id", topic.id);

    if (caseError) {
      setError("Kon niet controleren of deze subcategorie casussen heeft.");
      return;
    }

    if ((mcCount ?? 0) > 0 || (caseCount ?? 0) > 0) {
      setError(
        "Deze subcategorie kan niet worden verwijderd, omdat er nog MC-vragen of casussen aan gekoppeld zijn. Verberg de subcategorie of verplaats/verwijder eerst de gekoppelde content.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Weet je zeker dat je de subcategorie "${topic.name}" wilt verwijderen?`,
    );

    if (!confirmed) return;

    setSaving(true);

    const { error } = await supabase
      .from("topics")
      .delete()
      .eq("id", topic.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSuccess("Subcategorie verwijderd.");
    await loadData();
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-700">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Categorieen beheren
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Voeg hoofdcategorieen en subcategorieen toe voor MC-vragen en
            casussen. Gepubliceerde categorieen verschijnen in de oefenomgeving.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {success}
          </div>
        ) : null}

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Hoofdcategorie toevoegen
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Bijvoorbeeld: Staatsrecht, Strafrecht of Internationaal recht.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                placeholder="Naam hoofdcategorie"
                className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={addSubject}
                disabled={saving}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Toevoegen
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              Subcategorie toevoegen
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Bijvoorbeeld: Grondrechten onder Staatsrecht.
            </p>

            <div className="mt-5 grid gap-3">
              <select
                value={topicSubjectId}
                onChange={(event) => setTopicSubjectId(event.target.value)}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={topicName}
                  onChange={(event) => setTopicName(event.target.value)}
                  placeholder="Naam subcategorie"
                  className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={addTopic}
                  disabled={saving || subjects.length === 0}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading ? (
            <p className="p-4 text-sm text-slate-600">
              Categorieen laden...
            </p>
          ) : null}

          {!loading && subjects.length === 0 ? (
            <p className="p-4 text-sm text-slate-600">
              Er zijn nog geen categorieen.
            </p>
          ) : null}

          <div className="space-y-4">
            {topicsBySubject.map(({ subject, topics }) => (
              <article
                key={subject.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    {editingSubjectId === subject.id ? (
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                          value={editingSubjectName}
                          onChange={(event) =>
                            setEditingSubjectName(event.target.value)
                          }
                          className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                        <button
                          type="button"
                          onClick={() => updateSubjectName(subject)}
                          disabled={saving}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
                        >
                          Opslaan
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="break-words text-lg font-bold text-slate-950">
                          {subject.name}
                        </h2>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {subject.slug}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSubjectId(subject.id);
                        setEditingSubjectName(subject.name);
                      }}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                    >
                      Bewerken
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSubject(subject)}
                      disabled={saving}
                      className={
                        subject.is_published
                          ? "rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700"
                          : "rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                      }
                    >
                      {subject.is_published ? "Gepubliceerd" : "Verborgen"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSubject(subject)}
                      disabled={saving}
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {topics.length === 0 ? (
                    <p className="text-sm text-slate-600">
                      Nog geen subcategorieen.
                    </p>
                  ) : (
                    <div className="grid gap-3">
                      {topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="min-w-0">
                            {editingTopicId === topic.id ? (
                              <div className="flex flex-col gap-2 sm:flex-row">
                                <input
                                  value={editingTopicName}
                                  onChange={(event) =>
                                    setEditingTopicName(event.target.value)
                                  }
                                  className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateTopicName(topic)}
                                  disabled={saving}
                                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
                                >
                                  Opslaan
                                </button>
                              </div>
                            ) : (
                              <>
                                <h3 className="break-words text-sm font-bold text-slate-950">
                                  {topic.name}
                                </h3>
                                <p className="mt-1 text-xs font-semibold text-slate-500">
                                  {topic.slug}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTopicId(topic.id);
                                setEditingTopicName(topic.name);
                              }}
                              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                            >
                              Bewerken
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleTopic(topic)}
                              disabled={saving}
                              className={
                                topic.is_published
                                  ? "rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700"
                                  : "rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                              }
                            >
                              {topic.is_published
                                ? "Gepubliceerd"
                                : "Verborgen"}
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteTopic(topic)}
                              disabled={saving}
                              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Verwijderen
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
