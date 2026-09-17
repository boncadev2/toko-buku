export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080"}/sitemap.xml` }; }
