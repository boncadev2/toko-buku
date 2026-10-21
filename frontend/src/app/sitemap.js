export const dynamic = "force-static";

export default async function sitemap() {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  ).replace(/\/$/, "");

  const staticEntries = [
    {
      url: `${base}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/cari`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let bookEntries = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${apiUrl}/books?per_page=1000`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const payload = await res.json();
      const books = payload?.data?.data || payload?.data || [];
      if (Array.isArray(books)) {
        bookEntries = books
          .filter((b) => b && b.slug)
          .map((b) => ({
            url: `${base}/buku/${b.slug}`,
            lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
          }));
      }
    }
  } catch {
    const fallbackSlugs = [
      "laut-bercerita",
      "bumi-manusia",
      "atomic-habits",
      "filosofi-teras",
      "sapiens",
      "the-midnight-library",
      "rich-dad-poor-dad",
      "kosakata-anak-hebat",
    ];
    bookEntries = fallbackSlugs.map((slug) => ({
      url: `${base}/buku/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  return [...staticEntries, ...bookEntries];
}
