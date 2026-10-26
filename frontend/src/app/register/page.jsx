import ClientPage from '../auth/[mode]/client';

export default function RegisterPage() {
  return <ClientPage params={Promise.resolve({ mode: 'register' })} />;
}
