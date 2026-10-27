import type { MetadataRoute } from "next";
import { siteUrl, slugs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [`${siteUrl}/`, ...Object.values(slugs).map((s) => `${siteUrl}/work/${s}/`)].map((url) => ({ url, changeFrequency: "monthly", priority: url.endsWith("/My-portfolio/") ? 1 : 0.7 }));
}
