interface FundamentalsData {
    market_cap: number;
    total_volume: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    atl: number;
    ath_date: string;
    atl_date: string;
  }
  
  export function FundamentalsSection({ data }: { data: FundamentalsData }) {
    const metrics = [
      {
        label: 'Market Cap',
        value: `$${data.market_cap?.toLocaleString()}`,
      },
      {
        label: '24h Trading Volume',
        value: `$${data.total_volume?.toLocaleString()}`,
      },
      {
        label: 'Circulating Supply',
        value: data.circulating_supply?.toLocaleString(),
      },
      {
        label: 'Total Supply',
        value: data.total_supply?.toLocaleString() || 'N/A',
      },
      {
        label: 'Max Supply',
        value: data.max_supply?.toLocaleString() || 'N/A',
      },
      {
        label: 'All Time High',
        value: `$${data.ath?.toLocaleString()}`,
        subtext: new Date(data.ath_date).toLocaleDateString(),
      },
      {
        label: 'All Time Low',
        value: `$${data.atl?.toLocaleString()}`,
        subtext: new Date(data.atl_date).toLocaleDateString(),
      },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-sm text-gray-500 mb-2">{metric.label}</h3>
            <div className="text-lg font-semibold">{metric.value}</div>
            {metric.subtext && (
              <div className="text-sm text-gray-500 mt-1">{metric.subtext}</div>
            )}
          </div>
        ))}
      </div>
    );
  }