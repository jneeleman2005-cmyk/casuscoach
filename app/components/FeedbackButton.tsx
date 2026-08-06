"use client";

import { usePathname } from "next/navigation";

export default function FeedbackButton() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/registreren") ||
    pathname.startsWith("/wachtwoord-vergeten") ||
    pathname.startsWith("/wachtwoord-resetten")
  ) {
    return null;
  }

  const href = `/contact?onderwerp=fout-melden&pagina=${encodeURIComponent(pathname)}`;

  return (
    <a
      href={href}
      className="fixed bottom-5 right-5 z-50 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-lg transition hover:border-blue-200 hover:text-blue-700"
    >
      Fout melden
    </a>
  );
}