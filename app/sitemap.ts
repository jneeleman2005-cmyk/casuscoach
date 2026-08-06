import type { MetadataRoute } from "next";

const siteUrl = "https://casuscoach.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/oefenen",
    "/mc",
    "/casus",
    "/over",
    "/contact",
    "/veelgestelde-vragen",
    "/disclaimer",
    "/privacy",
    "/voorwaarden",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}