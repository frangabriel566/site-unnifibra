import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: siteConfig.seo.indexable ? "/" : undefined,
      disallow: siteConfig.seo.indexable ? "/admin" : "/",
    },
    sitemap: `${siteConfig.seo.canonicalUrl}/sitemap.xml`,
  };
}
