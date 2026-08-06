"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function AdminPaymentSettings() {
  const [paymentsEnabled, setPaymentsEnabled] = useState(false);
  const [freeFullAccess, setFreeFullAccess] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const { data, error } = await supabase
        .from("platform_settings")
        .select("key, value")
        .in("key", ["payments_enabled", "free_full_access"]);

      if (error) {
        setError("Instellingen konden niet worden geladen.");
        setLoading(false);
        return;
      }

      const paymentsSetting = data?.find(
        (setting) => setting.key === "payments_enabled",
      );

      const freeAccessSetting = data?.find(
        (setting) => setting.key === "free_full_access",
      );

      setPaymentsEnabled(paymentsSetting?.value === "true");
      setFreeFullAccess(freeAccessSetting?.value !== "false");

      setLoading(false);
    }

    loadSettings();
  }, []);

  async function saveSettings(nextPaymentsEnabled: boolean, nextFreeFullAccess: boolean) {
    setSaving(true);
    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.from("platform_settings").upsert([
      {
        key: "payments_enabled",
        value: String(nextPaymentsEnabled),
      },
      {
        key: "free_full_access",
        value: String(nextFreeFullAccess),
      },
    ]);

    if (error) {
      setError("Opslaan mislukt. Controleer of je adminrechten hebt.");
      setSaving(false);
      return;
    }

    setPaymentsEnabled(nextPaymentsEnabled);
    setFreeFullAccess(nextFreeFullAccess);
    setMessage("Instellingen opgeslagen.");
    setSaving(false);
  }

  async function enableFreeMode() {
    await saveSettings(false, true);
  }

  async function enablePaymentMode() {
    await saveSettings(true, false);
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Toegangsmodus</h2>
        <p className="mt-4 text-slate-600">Instellingen laden...</p>
      </div>
    );
  }

  const isFreeMode = !paymentsEnabled && freeFullAccess;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Toegangsmodus
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Betaalsysteem tijdelijk beheren
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Gebruik deze instelling om CasusCoach nu gratis live te zetten.
            Studenten kunnen dan alles gebruiken alsof zij volledige toegang
            hebben, terwijl adminrechten alleen voor contentbeheer blijven.
          </p>
        </div>

        <span
          className={
            isFreeMode
              ? "w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700"
              : "w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
          }
        >
          {isFreeMode ? "Gratis modus actief" : "Betaalmodus voorbereid"}
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-lg font-bold text-green-950">
            Gratis live-modus
          </p>

          <p className="mt-3 text-sm leading-6 text-green-950/80">
            Betalingen staan uit. Iedereen kan alle gratis en premium-gemarkeerde
            oefenstof gebruiken. Dit is ideaal voor de eerste livefase.
          </p>

          <button
            type="button"
            onClick={enableFreeMode}
            disabled={saving || isFreeMode}
            className="mt-6 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isFreeMode ? "Actief" : saving ? "Opslaan..." : "Gratis modus aanzetten"}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-lg font-bold text-slate-950">
            Betaalmodus later
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Deze stand is bedoeld voor later, wanneer Mollie of Stripe is
            gekoppeld. Premiumcontent kan dan worden afgeschermd.
          </p>

          <button
            type="button"
            onClick={enablePaymentMode}
            disabled={saving || (!isFreeMode && paymentsEnabled)}
            className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            {paymentsEnabled ? "Voorbereid" : saving ? "Opslaan..." : "Betaalmodus voorbereiden"}
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="font-semibold text-blue-950">Huidige instelling</p>

        <div className="mt-4 grid gap-3 text-sm text-blue-950/80 sm:grid-cols-2">
          <p>
            Betalingssysteem:{" "}
            <span className="font-bold">
              {paymentsEnabled ? "aan/voorbereid" : "uit"}
            </span>
          </p>

          <p>
            Volledige gratis toegang:{" "}
            <span className="font-bold">{freeFullAccess ? "ja" : "nee"}</span>
          </p>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}