const fs = require('fs');
let content = fs.readFileSync('src/app/page.jsx', 'utf8');

content = content.replace(
  '{promoBooks ? promoBooks.map((book) => <DynamicBookCard book={book} key={book.id} />) : discounts.map((book) => <BookCard book={book} key={book[0]} />)}',
  '{promoBooks && promoBooks.length > 0 ? promoBooks.map((book) => <DynamicBookCard book={book} key={book.id} />) : discounts.map((book) => <BookCard book={book} key={book[0]} />)}'
);

fs.writeFileSync('src/app/page.jsx', content);
