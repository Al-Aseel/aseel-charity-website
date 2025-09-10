import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/news",
    "/programs",
    "/reports",
    "/archive",
    "/search",
  ].map((path) => ({
    url: `${host}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Note: Dynamic routes (news/[id], programs/[id], archive/[id])
  // could be fetched from your API and appended here for better coverage.
  // Keeping sitemap simple and static to avoid runtime API dependency.

  return staticRoutes;
}
