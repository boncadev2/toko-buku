import "./globals.css";
import DynamicFavicon from "../components/DynamicFavicon";

export async function generateMetadata() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  ).replace(/\/$/, "");

  let appName = "Toko Buku Online";
  let appDescription =
    "Toko buku online terlengkap dan terpercaya. Temukan beragam koleksi buku pilihan, best seller, dan promo menarik.";
  let googleVerification = "";
  let appLogo = `${siteUrl}/hero.jpg`;
  let customKeywords = "";

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${apiUrl}/settings`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);

    if (res.ok) {
      const payload = await res.json();
      const data = payload?.data || {};
      if (data.app_name) appName = data.app_name;
      if (data.meta_title) appName = data.meta_title;
      if (data.meta_description) appDescription = data.meta_description;
      else if (data.hero_description) appDescription = data.hero_description;
      if (data.google_site_verification)
        googleVerification = data.google_site_verification
          .replace(/<meta[^>]*content=["']([^"']+)["'][^>]*>/i, "$1")
          .replace(/^google-site-verification=/, "")
          .trim();
      if (data.meta_keywords) customKeywords = data.meta_keywords;
      if (data.app_logo) appLogo = data.app_logo;
    }
  } catch {}

  const parsedKeywords = customKeywords
    ? customKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [
        "toko buku",
        appName,
        "beli buku online",
        "novel",
        "buku motivasi",
        "literatur",
        "buku murah",
        "buku original",
        "diskon buku",
      ];

  const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${appName} - Toko Buku Online Terlengkap & Original`,
      template: `%s | ${appName}`,
    },
    description: appDescription,
    keywords: parsedKeywords,
    authors: [{ name: appName }],
    creator: appName,
    publisher: appName,
    formatDetection: {
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${appName} - Toko Buku Online Terlengkap & Original`,
      description: appDescription,
      url: siteUrl,
      siteName: appName,
      images: [
        {
          url: appLogo,
          width: 1200,
          height: 630,
          alt: appName,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${appName} - Toko Buku Online`,
      description: appDescription,
      images: [appLogo],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    alternates: {
      canonical: "/",
    },
  };

  if (googleVerification) {
    metadata.verification = {
      google: googleVerification,
    };
  }

  return metadata;
}

export default function RootLayout({ children }) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Toko Buku Online",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/cari?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "BookStore",
        "@id": `${siteUrl}/#store`,
        url: `${siteUrl}/`,
        name: "Toko Buku Online",
        priceRange: "Rp",
      },
    ],
  };

  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
