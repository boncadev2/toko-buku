import ClientPage from './client';

export function generateStaticParams() { 
  return [{ mode: 'login' }, { mode: 'register' }, { mode: 'forgot-password' }]; 
}

export default function Page({ params }) {
  return <ClientPage params={params} />;
}
