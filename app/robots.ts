import type { MetadataRoute } from "next";

const siteUrl = "https://casuscoach.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/account",
        "/account/",
        "/login",
        "/registreren",
        "/wachtwoord-vergeten",
        "/wachtwoord-resetten",
        "/auth",
        "/auth/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}