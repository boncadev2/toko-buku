export const dynamic = "force-static";

export default function sitemap() {
    const base =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080";

    return [
        "/",
        "/cari",
        "/buku/laut-bercerita",
        "/buku/atomic-habits",
    ].map((path) => ({
        url: `${base}${path}`,
        lastModified: new Date(),
    }));
}