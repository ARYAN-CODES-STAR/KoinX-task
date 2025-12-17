"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

interface CoinData {
  usd: number;
  usd_24h_change: number;
  inr: number;
  inr_24h_change: number;
}

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    small: string;
    data: {
      price_change_percentage_24h: {
        usd: number;
      };
      sparkline: string;
    };
  };
}

interface CoinNames {
  name: string;
  symbol: string;
}

export default function CryptoDashboard({
  initialCoinId,
}: {
  initialCoinId: string;
}) {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${initialCoinId}&vs_currencies=inr,usd&include_24hr_change=true`
        );
        const priceData = await priceResponse.json();

        const trendingResponse = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const trendingData = await trendingResponse.json();

        setCoinData(priceData[initialCoinId]);
        setTrendingCoins(trendingData.coins.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [initialCoinId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...Please Wait!!</div>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Coin not found</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceCard coinId={initialCoinId} coinData={coinData} />
        </div>
        <div>
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Get started with a coin on AryanX
            </h2>
            <p className="mb-4">
              With our range of features that you can equip for free, AryanX allows you to be more educated and aware of your tax reports.
            </p>
            <div className="mb-6">
                <img src="https://imgs.search.brave.com/x0OFc0kx-SN91YG39LzkxsZpEaVeKC8eGsAleH982EU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmFua3JhdGUuY29t/LzIwMjEvMDgvMjUx/MTEzMzIvR2V0dHlJ/bWFnZXMtMTAxMjAz/NjYzMi5qcGc" alt="Crypto Portfolio" className="rounded-lg" />
              {/* <Image
                src="https://ibb.co/ZcKWX6p"
                width={400}
                height={200}
                alt="Crypto Portfolio"
                className="rounded-lg"
              /> */}
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-white text-blue-800 font-semibold flex justify-center items-center px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300">
                Get Started for <span className="font-bold">FREE</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <TrendingCoinsCard trendingCoins={trendingCoins} />
        </div>
      </div>

      <YouMayAlsoLikeSection trendingCoins={trendingCoins} />
      <TrendingCoinsSection trendingCoins={trendingCoins} />
    </main>
  );
}

function PriceCard({
  coinId,
  coinData,
}: {
  coinId: string;
  coinData: CoinData;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <img
          src="/api/placeholder/32/32"
          alt={coinId}
          className="w-8 h-8 rounded-full"
        />
        <h1 className="text-2xl font-bold ml-2 capitalize">{coinId}</h1>
        <span className="ml-2 text-gray-500 uppercase">
          {coinId.substring(0, 3)}
        </span>
      </div>

      <div className="flex items-center">
        <div className="text-3xl font-bold">
          ${coinData.usd.toLocaleString()}
        </div>
        <PriceChange change={coinData.usd_24h_change} />
      </div>
      <div className="text-gray-500">₹{coinData.inr.toLocaleString()}</div>

      <div className="mt-6 h-[400px]">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${coinId.toUpperCase()}USD&interval=D&hidesidetoolbar=1&hideTopBar=1&theme=light&style=1&timezone=Etc%2FUTC`}
          className="w-full h-full rounded-lg"
          title="TradingView Chart"
        />
      </div>
    </div>
  );
}

function PriceChange({ change }: { change: number }) {
  const isPositive = change > 0;
  return (
    <div
      className={`flex items-center ml-2 ${
        isPositive ? "text-green-500" : "text-red-500"
      }`}
    >
      {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="ml-1">{Math.abs(change).toFixed(2)}%</span>
    </div>
  );
}

function TrendingCoinsCard({
  trendingCoins,
}: {
  trendingCoins: TrendingCoin[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
      {trendingCoins.map((coin) => (
        <div
          key={coin.item.id}
          className="flex items-center justify-between py-2 border-b last:border-b-0"
        >
          <div className="flex items-center">
            <img
              src={coin.item.small}
              alt={coin.item.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="ml-2">{coin.item.name}</span>
          </div>
          <PriceChange
            change={coin.item.data.price_change_percentage_24h.usd}
          />
        </div>
      ))}
    </div>
  );
}

function TrendingCoinCard({ coin }: { coin: TrendingCoin }) {
  return (
    <div className="bg-white rounded-lg shadow-lg min-w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={coin.item.small}
            alt={coin.item.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-2">
            <div className="font-medium">{coin.item.symbol.toUpperCase()}</div>
            <div className="text-sm text-gray-500">{coin.item.name}</div>
          </div>
        </div>
        <PriceChange change={coin.item.data.price_change_percentage_24h.usd} />
      </div>
      {coin.item.data.sparkline && (
        <img
          src={coin.item.data.sparkline}
          alt="Price graph"
          className="w-full h-16 mt-4"
        />
      )}
    </div>
  );
}

function YouMayAlsoLikeSection({
  trendingCoins,
}: {
  trendingCoins: TrendingCoin[];
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {trendingCoins.map((coin) => (
          <TrendingCoinCard key={coin.item.id} coin={coin} />
        ))}
      </div>
    </section>
  );
}

function TrendingCoinsSection({
  trendingCoins,
}: {
  trendingCoins: TrendingCoin[];
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Trending Coins</h2>
      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
        {trendingCoins.map((coin) => (
          <TrendingCoinCard key={coin.item.id} coin={coin} />
        ))}
      </div>
    </section>
  );
}
