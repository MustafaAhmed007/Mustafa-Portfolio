import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mustafa-portfolio.vercel.app";
  const routes = ["/","/work","/systems","/thinking","/lab","/experience","/about","/resume","/contact","/evidence"];
  return routes.map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
