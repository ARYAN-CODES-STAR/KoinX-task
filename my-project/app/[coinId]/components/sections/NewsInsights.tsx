"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ExternalLink } from "lucide-react";
import { NewsSkeletonLoader } from "./Sentiment";

interface NewsItem {
  title: string;
  url: string;
  published_at: string;
  source: string;
  description: string;
}

export function NewsInsightsSection({ coinId }: { coinId: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?categories=${coinId}&excludeCategories=Sponsored`
        );
        const data = await response.json();
        setNews(data.Data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [coinId]);

  if (loading) {
    return <NewsSkeletonLoader />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Latest News and Insights</h2>
      <div className="grid gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <ExternalLink size={20} />
              </a>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays size={16} className="mr-2" />
              {new Date(item.published_at).toLocaleDateString()}
              <span className="mx-2">•</span>
              <span>{item.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
