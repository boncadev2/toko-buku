const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

// Update function signatures
content = content.replace('function BookCard({ book })', 'function BookCard({ book, appName = "BukuPagi" })');
content = content.replace('function DynamicBookCard({ book, label, coverClass })', 'function DynamicBookCard({ book, label, coverClass, appName = "BukuPagi" })');
content = content.replace('function Shelf({ shelf, dynamicBooks })', 'function Shelf({ shelf, dynamicBooks, appName = "BukuPagi" })');

// Update Shelf rendering cards
content = content.replace(
  '<DynamicBookCard book={book} key={book.id} />',
  '<DynamicBookCard book={book} key={book.id} appName={appName} />'
);
content = content.replace(
  '<BookCard book={book} key={book[0]} />',
  '<BookCard book={book} key={book[0]} appName={appName} />'
);

// Update Home rendering Shelf
content = content.replace(
  '<Shelf shelf={shelf} key={shelf.id} dynamicBooks=',
  '<Shelf shelf={shelf} key={shelf.id} appName={appName} dynamicBooks='
);

fs.writeFileSync('src/app/page.jsx', content);
