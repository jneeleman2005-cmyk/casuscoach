import { createClient } from "./supabase/server";

export type PlatformSettings = {
  paymentsEnabled: boolean;
  freeFullAccess: boolean;
  isFreeMode: boolean;
};

export async function getPlatformSettings(): Promise<PlatformSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("platform_settings")
    .select("key, value")
    .in("key", ["payments_enabled", "free_full_access"]);

  if (error || !data) {
    return {
      paymentsEnabled: false,
      freeFullAccess: true,
      isFreeMode: true,
    };
  }

  const paymentsEnabled =
    data.find((setting) => setting.key === "payments_enabled")?.value ===
    "true";

  const freeFullAccess =
    data.find((setting) => setting.key === "free_full_access")?.value !==
    "false";

  return {
    paymentsEnabled,
    freeFullAccess,
    isFreeMode: !paymentsEnabled && freeFullAccess,
  };
}
