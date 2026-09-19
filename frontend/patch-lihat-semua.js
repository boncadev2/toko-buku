const fs = require('fs');

let content = fs.readFileSync('src/app/page.jsx', 'utf8');

const originalComponent = `function Shelf({ shelf, dynamicBooks, appName = "" }) {
  const booksToRender = dynamicBooks && dynamicBooks.length > 0 ? dynamicBooks : shelf.books;

  return <section id={shelf.id} className="scroll-mt-24 py-10 sm:py-14"><div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">{shelf.eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">{shelf.title}</h2><p className="mt-2 text-sm text-stone-600">{shelf.description}</p></div><a href="#" className="text-sm font-bold text-orange-700">Lihat semua →</a></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{booksToRender === dynamicBooks ? booksToRender.map(book => <DynamicBookCard book={book} key={book.id} appName={appName} />) : booksToRender.map(book => <BookCard book={book} key={book[0]} appName={appName} />)}</div></section>;
}`;

const newComponent = `function Shelf({ shelf, dynamicBooks, appName = "" }) {
  const booksToRender = dynamicBooks && dynamicBooks.length > 0 ? dynamicBooks : shelf.books;
  
  let link = "/cari";
  if (shelf.id === "terbaru") link = "/cari?sort=newest";
  else if (shelf.id === "terlaris") link = "/cari?sort=bestseller";
  else if (shelf.id === "promo") link = "/cari?sort=promo";

  return <section id={shelf.id} className="scroll-mt-24 py-10 sm:py-14"><div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">{shelf.eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950 sm:text-3xl">{shelf.title}</h2><p className="mt-2 text-sm text-stone-600">{shelf.description}</p></div><Link href={link} className="text-sm font-bold text-orange-700">Lihat semua →</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{booksToRender === dynamicBooks ? booksToRender.map(book => <DynamicBookCard book={book} key={book.id} appName={appName} />) : booksToRender.map(book => <BookCard book={book} key={book[0]} appName={appName} />)}</div></section>;
}`;

content = content.replace(originalComponent, newComponent);
fs.writeFileSync('src/app/page.jsx', content);

