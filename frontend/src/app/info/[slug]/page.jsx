import ClientPage from './client';

export function generateStaticParams() { 
  return [{ slug: 'tentang-kami' }, { slug: 'syarat-ketentuan' }, { slug: 'kebijakan-privasi' }, { slug: 'tentang' }, { slug: 'cara-belanja' }, { slug: 'pengiriman' }, { slug: 'kontak' }]; 
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
