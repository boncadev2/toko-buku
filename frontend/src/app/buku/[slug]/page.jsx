import ClientPage from './client';

export async function generateStaticParams() {
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
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
