const fs = require('fs');

// Patch auth/[mode]
let authContent = fs.readFileSync('src/app/auth/[mode]/page.jsx', 'utf8');
if (!authContent.includes('generateStaticParams')) {
  authContent = `export function generateStaticParams() { return [{ mode: 'login' }, { mode: 'register' }, { mode: 'forgot-password' }]; }\n` + authContent;
  fs.writeFileSync('src/app/auth/[mode]/page.jsx', authContent);
}

// Patch info/[slug]
let infoContent = fs.readFileSync('src/app/info/[slug]/page.jsx', 'utf8');
if (!infoContent.includes('generateStaticParams')) {
  infoContent = `export function generateStaticParams() { return [{ slug: 'tentang-kami' }, { slug: 'syarat-ketentuan' }, { slug: 'kebijakan-privasi' }]; }\n` + infoContent;
  fs.writeFileSync('src/app/info/[slug]/page.jsx', infoContent);
}

// Patch buku/[slug]
let bookContent = fs.readFileSync('src/app/buku/[slug]/page.jsx', 'utf8');
if (!bookContent.includes('generateStaticParams')) {
  const addStr = `export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8080/api/books?per_page=1000");
    if (!res.ok) return [];
    const payload = await res.json();
    const books = payload?.data?.data || [];
    return books.map(b => ({ slug: b.slug }));
  } catch (e) {
    return [
      { slug: 'laut-bercerita' }, { slug: 'bumi-manusia' }, { slug: 'atomic-habits' }, 
      { slug: 'filosofi-teras' }, { slug: 'sapiens' }, { slug: 'the-midnight-library' }, 
      { slug: 'rich-dad-poor-dad' }, { slug: 'kosakata-anak-hebat' }
    ];
  }
}\n`;
  bookContent = addStr + bookContent;
  fs.writeFileSync('src/app/buku/[slug]/page.jsx', bookContent);
}

