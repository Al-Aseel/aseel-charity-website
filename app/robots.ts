import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/_next/", "/api/", "/admin", "/private", "/draft"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
