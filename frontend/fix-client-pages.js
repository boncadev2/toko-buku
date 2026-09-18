const fs = require('fs');
const path = require('path');

function processRoute(routeDir, genParamsFn) {
  const pagePath = path.join(routeDir, 'page.jsx');
  const clientPath = path.join(routeDir, 'client.jsx');
  
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Strip out any generateStaticParams I added
  content = content.replace(/export (async )?function generateStaticParams\(\) \{[\s\S]*?\}\n/g, '');
  
  // Make sure "use client" is at the top
  if (!content.includes('"use client"')) {
    content = '"use client";\n' + content;
  } else {
    content = content.replace(/"use client";?\s*/g, '');
    content = '"use client";\n' + content;
  }
  
  // Write the client component
  fs.writeFileSync(clientPath, content);
  
  // Write the server component page.jsx
  const serverContent = `
import ClientPage from './client';

${genParamsFn}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
`;
  fs.writeFileSync(pagePath, serverContent.trim() + '\n');
}

// 1. auth/[mode]
processRoute('src/app/auth/[mode]', `export function generateStaticParams() { 
  return [{ mode: 'login' }, { mode: 'register' }, { mode: 'forgot-password' }]; 
}`);

// 2. info/[slug]
processRoute('src/app/info/[slug]', `export function generateStaticParams() { 
  return [{ slug: 'tentang-kami' }, { slug: 'syarat-ketentuan' }, { slug: 'kebijakan-privasi' }, { slug: 'tentang' }, { slug: 'cara-belanja' }, { slug: 'pengiriman' }, { slug: 'kontak' }]; 
}`);

// 3. buku/[slug]
processRoute('src/app/buku/[slug]', `export async function generateStaticParams() {
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
}`);

