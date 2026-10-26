import ClientPage from '../auth/[mode]/client';

export default function LoginPage() {
  return <ClientPage params={Promise.resolve({ mode: 'login' })} />;
}
