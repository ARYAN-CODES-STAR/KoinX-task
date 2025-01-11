import { use } from 'react';
import CoinDetails from '../../components/CoinDetails';

export default function CoinDetailsPage({ 
  params 
}: { 
  params: { coinId: string; section: string } 
}) {
  const coinId = use(Promise.resolve(params.coinId)) || 'bitcoin';
  const section = use(Promise.resolve(params.section)) || 'overview';

  return <CoinDetails initialCoinId={coinId} initialSection={section} />;
}