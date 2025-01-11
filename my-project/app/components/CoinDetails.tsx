"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUp, ArrowDown } from "lucide-react";
import Technicals from "../[coinId]/components/sections/Technicals";

interface CoinDetailsData {
  id: string;
  name: string;
  image: string;
  symbol: string;
  description: { en: string };
  market_data: {
    current_price: { usd: number; inr: number };
    price_change_percentage_24h: number;
  };
  team: Array<{ name: string; position: string }>;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
}

export default function CoinDetails({
  initialCoinId,
  initialSection,
}: {
  initialCoinId: string;
  initialSection: string;
}) {
  const [coinData, setCoinData] = useState<CoinDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "fundamentals", label: "Fundamentals" },
    { id: "news-insights", label: "News Insights" },
    { id: "sentiment", label: "Sentiment" },
    { id: "team", label: "Team" },
    { id: "technicals", label: "Technicals" },
  ];

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${initialCoinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
        );
        const data = await response.json();
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [initialCoinId]);

  if (loading) {
    return <LoadingState />;
  }

  if (!coinData) {
    return <div>Coin not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header with price info */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <img
            src={coinData.image || "/api/placeholder/32/32"}
            alt={coinData.name}
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-2xl font-bold ml-2">{coinData.name}</h1>
          <span className="ml-2 text-gray-500">
            {coinData.symbol?.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center">
          <div className="text-3xl font-bold">
            ${coinData.market_data.current_price.usd.toLocaleString()}
          </div>
          <PriceChange
            change={coinData.market_data.price_change_percentage_24h}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/${initialCoinId}/${tab.id}`}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                  initialSection === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Sections */}
      <div className="mt-6">
        {initialSection === "overview" && <OverviewSection data={coinData} />}
        {initialSection === "fundamentals" && (
          <FundamentalsSection data={coinData} />
        )}
        {initialSection === "news-insights" && (
          <NewsInsightsSection coinId={initialCoinId} />
        )}
        {initialSection === "sentiment" && <SentimentSection data={coinData} />}
        {initialSection === "team" && <TeamSection data={coinData} />}
        {initialSection === "technicals" && (
          <TechnicalsSection coinId={initialCoinId} />
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
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

// Content Section Components
function OverviewSection({ data }: { data: CoinDetailsData }) {
  return (
    <div className="prose max-w-none">
      <h2 className="text-xl font-bold mb-4">What is {data.name}?</h2>
      <div dangerouslySetInnerHTML={{ __html: data.description.en }} />
    </div>
  );
}

function FundamentalsSection({ data }: { data: CoinDetailsData }) {
  //fundamentals metrics here
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Market Data</h3>
      </div>
    </div>
  );
}

function NewsInsightsSection({ coinId }: { coinId: string }) {
  const [news, setNews] = useState([]);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Latest News</h2>
      {/* news items */}
    </div>
  );
}

function SentimentSection({ data }: { data: CoinDetailsData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Community Sentiment</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <ArrowUp className="text-green-500" />
            <span className="ml-2">
              {data.sentiment_votes_up_percentage?.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center">
            <ArrowDown className="text-red-500" />
            <span className="ml-2">
              {data.sentiment_votes_down_percentage?.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSection({ data }: { data: CoinDetailsData }) {
  return (
    <div className="gap-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <Technicals />
      </div>
    </div>
  );
}

function TechnicalsSection({ coinId }: { coinId: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Technical Analysis</h3>
      </div>
      <div className="h-[400px]">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${coinId.toUpperCase()}USD&interval=D&hidesidetoolbar=1&hideTopBar=1&theme=light&style=1&timezone=Etc%2FUTC`}
          className="w-full h-full rounded-lg"
          title="TradingView Chart"
        />
      </div>
    </div>
  );
}
