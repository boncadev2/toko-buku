import Link from "next/link";
import BookCover from "./BookCover";

export default function BookCard({ book }) {
  const detailHref = `/buku/${book.slug}`;

  return (
    <Link
      href={detailHref}
      className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
    >
      <div>
        <BookCover title={book.title} />
        <h2 className="mt-3 truncate text-sm font-bold">{book.title}</h2>
        <p className="mt-1 truncate text-xs text-stone-500">{book.author}</p>
        <p className="mt-2 font-black text-blue-700">Rp{Number(book.price).toLocaleString("id-ID")}</p>
      </div>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
        Lihat detail →
      </span>
    </Link>
  );
}
