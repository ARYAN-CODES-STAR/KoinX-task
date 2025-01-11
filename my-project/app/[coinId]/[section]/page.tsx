import CoinDetails from '../../components/CoinDetails';

type PageProps = {
  params: {
    coinId: string;
    section: string;
  }
}

export default function CoinDetailsPage({ params }: PageProps) {
  const coinId = params.coinId || 'bitcoin';
  const section = params.section || 'overview';

  return <CoinDetails initialCoinId={coinId} initialSection={section} />;
}