import ClientPage from "./client";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    ).replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/books?per_page=1000`);
    if (!res.ok) return [];
    const payload = await res.json();
    const books = payload?.data?.data || payload?.data || [];
    return books.map((b) => ({ slug: b.slug }));
  } catch (e) {
    return [
      { slug: "laut-bercerita" },
      { slug: "bumi-manusia" },
      { slug: "atomic-habits" },
      { slug: "filosofi-teras" },
      { slug: "sapiens" },
      { slug: "the-midnight-library" },
      { slug: "rich-dad-poor-dad" },
      { slug: "kosakata-anak-hebat" },
    ];
  }
}

async function getBook(slug) {
  try {
    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
    ).replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/books/${slug}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const payload = await res.json();
    return payload?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const book = await getBook(slug);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  if (!book) {
    return {
      title: "Buku Tidak Ditemukan",
      description: "Halaman buku yang Anda cari tidak dapat ditemukan.",
    };
  }

  const rawDescription =
    book.short_description ||
    book.description ||
    `Beli buku ${book.title} karya ${book.author} dengan harga terbaik dan jaminan original di toko kami.`;
  const cleanDescription = rawDescription
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const coverUrl = book.cover_image_url || `${siteUrl}/hero.jpg`;

  return {
    title: `${book.title} - ${book.author || "Buku Original"}`,
    description: cleanDescription,
    keywords: [
      book.title,
      book.author,
      book.category?.name,
      book.publisher,
      "buku",
      "buku original",
      "beli buku",
      book.isbn,
    ].filter(Boolean),
    openGraph: {
      title: `${book.title} - ${book.author || "Buku Original"}`,
      description: cleanDescription,
      url: `${siteUrl}/buku/${slug}`,
      type: "book",
      images: [
        {
          url: coverUrl,
          width: 800,
          height: 1100,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} - ${book.author || "Buku Original"}`,
      description: cleanDescription,
      images: [coverUrl],
    },
    alternates: {
      canonical: `${siteUrl}/buku/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const book = await getBook(slug);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  const bookSchema = book
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: book.title,
        image: book.cover_image_url || `${siteUrl}/hero.jpg`,
        description: (book.short_description || book.description || book.title)
          .replace(/<[^>]+>/g, "")
          .trim(),
        sku: book.sku || book.slug,
        isbn: book.isbn || undefined,
        brand: {
          "@type": "Brand",
          name: book.publisher || "Penerbit Buku",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/buku/${slug}`,
          priceCurrency: "IDR",
          price: book.price,
          availability:
            book.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        ...(book.rating > 0
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: book.rating,
                reviewCount: book.sold_count || 1,
              },
            }
          : {}),
      }
    : null;

  return (
    <>
      {bookSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />
      )}
      <ClientPage params={params} />
    </>
  );
}
