import { use } from 'react';
import CryptoDashboard from './components/CryptoDashboard';

export default function Page({ params }: { params: { coinId: string } }) {
  const coinId = use(Promise.resolve(params.coinId)) || 'bitcoin';
  
  return <CryptoDashboard initialCoinId={coinId} />;
}