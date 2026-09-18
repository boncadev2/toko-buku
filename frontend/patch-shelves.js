const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// Add state for latestBooks and bestsellers
content = content.replace(
  'const [promoBooks, setPromoBooks] = useState(null);',
  'const [promoBooks, setPromoBooks] = useState(null);\n  const [latestBooks, setLatestBooks] = useState(null);\n  const [bestsellerBooks, setBestsellerBooks] = useState(null);'
);

// Fetch them
content = content.replace(
  /fetch\(`\$\{process\.env\.NEXT_PUBLIC_API_URL \?\? "http:\/\/localhost:8080\/api"\}\/books\?sort=promo&per_page=4`\)\.then[^\n]+;/,
  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);'
);

// Update Shelf component to support dynamic rendering
content = content.replace(
  'function Shelf({ shelf }) {',
  `function Shelf({ shelf, dynamicBooks }) {
  const booksToRender = dynamicBooks && dynamicBooks.length > 0 ? dynamicBooks : shelf.books;
`
);

content = content.replace(
  /<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">\{shelf\.books\.map\(\(book\) => <BookCard book=\{book\} key=\{book\[0\]\} \/>\)}<\/div>/,
  '<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{booksToRender === dynamicBooks ? booksToRender.map(book => <DynamicBookCard book={book} key={book.id} />) : booksToRender.map(book => <BookCard book={book} key={book[0]} />)}</div>'
);

// Pass dynamic data to Shelves
content = content.replace(
  '{shelves.map((shelf) => <Shelf shelf={shelf} key={shelf.id} />)}',
  '{shelves.map((shelf) => <Shelf shelf={shelf} key={shelf.id} dynamicBooks={shelf.id === "terbaru" ? latestBooks : shelf.id === "terlaris" ? bestsellerBooks : null} />)}'
);

fs.writeFileSync('src/app/page.jsx', content);
