interface SentimentData {
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    facebook_likes: number;
  }
  
  export function SentimentSection({ data }: { data: SentimentData }) {
    const socialMetrics = [
      {
        platform: 'Twitter',
        metric: 'Followers',
        value: data.twitter_followers?.toLocaleString() || 'N/A',
      },
      {
        platform: 'Reddit',
        metric: 'Subscribers',
        value: data.reddit_subscribers?.toLocaleString() || 'N/A',
      },
      {
        platform: 'Reddit',
        metric: 'Active Accounts (48h)',
        value: data.reddit_accounts_active_48h?.toLocaleString() || 'N/A',
      },
      {
        platform: 'Reddit',
        metric: 'Average Posts (48h)',
        value: data.reddit_average_posts_48h?.toFixed(1) || 'N/A',
      },
      {
        platform: 'Facebook',
        metric: 'Likes',
        value: data.facebook_likes?.toLocaleString() || 'N/A',
      },
    ];
  
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Community Sentiment</h3>
          <div className="flex items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {data.sentiment_votes_up_percentage?.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Bullish</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                {data.sentiment_votes_down_percentage?.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Bearish</div>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Social Media Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="text-sm text-gray-500">{metric.platform} {metric.metric}</div>
                <div className="text-lg font-semibold mt-1">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export function NewsSkeletonLoader() {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4">nnnnnn</div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }