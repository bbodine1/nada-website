import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.northaldroneapplicators.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Facebook crawler used by Sharing Debugger and link previews
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        // Facebook crawler variant
        userAgent: "Facebot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // `Host` should be hostname only (not full URL)
    host: "www.northaldroneapplicators.com",
  };
}
