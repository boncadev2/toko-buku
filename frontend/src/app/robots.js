export const dynamic = "force-dynamic";

export default function robots() {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/cari", "/buku/", "/info/"],
        disallow: [
          "/admin",
          "/admin/*",
          "/akun",
          "/akun/*",
          "/checkout",
          "/checkout/*",
          "/auth",
          "/auth/*",
          "/api",
          "/api/*",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
