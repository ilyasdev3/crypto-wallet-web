import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../../components/_layout";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_supply: number;
    price_change_percentage_24h: number;
  };
  image: {
    large: string;
  };
}

interface HistoricalData {
  prices: [number, number][];
}

type TimeRange = "1D" | "7D" | "1M" | "1Y";
type ChartType = "line" | "bar" | "candlestick";

const timeRanges: { label: string; value: TimeRange; days: string }[] = [
  { label: "1 Day", value: "1D", days: "1" },
  { label: "7 Days", value: "7D", days: "7" },
  { label: "1 Month", value: "1M", days: "30" },
  { label: "1 Year", value: "1Y", days: "365" },
];

const chartTypes: { label: string; value: ChartType }[] = [
  { label: "Line", value: "line" },
  { label: "Bar", value: "bar" },
  { label: "Candlestick", value: "candlestick" },
];

const CryptoDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [crypto, setCrypto] = useState<Crypto | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [chartType, setChartType] = useState<ChartType>("line");

  // Define chart options
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Price History (${
          timeRanges.find((t) => t.value === timeRange)?.label
        })`,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      if (!name) {
        setError("No cryptocurrency name provided");
        setLoading(false);
        return;
      }

      try {
        const formattedName = name.toLowerCase().replace(/\s+/g, "-");
        const selectedRange =
          timeRanges.find((t) => t.value === timeRange)?.days || "30";

        const cryptoRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${formattedName}`
        );

        if (!cryptoRes.ok) {
          if (cryptoRes.status === 404) {
            throw new Error("Cryptocurrency not found");
          }
          throw new Error(`HTTP error! status: ${cryptoRes.status}`);
        }

        const cryptoData = await cryptoRes.json();
        setCrypto(cryptoData);

        const historyRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${formattedName}/market_chart?vs_currency=usd&days=${selectedRange}&interval=${
            timeRange === "1D" ? "hourly" : "daily"
          }`
        );

        if (!historyRes.ok) {
          throw new Error(`HTTP error! status: ${historyRes.status}`);
        }

        const historyData = await historyRes.json();
        setHistoricalData(historyData);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch cryptocurrency data";
        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [name, timeRange]); // Refetch when timeRange changes

  // Format date based on time range
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case "1D":
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "7D":
        return date.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
      default:
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Prepare chart data
  const chartData = historicalData
    ? {
        labels: historicalData.prices.map((point) => formatDate(point[0])),
        datasets: [
          {
            label: `${crypto?.name ?? "Price"} (USD)`,
            data: historicalData.prices.map((point) => point[1]),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.1,
            pointRadius: timeRange === "1D" ? 1 : 2,
            pointHoverRadius: 5,
            fill: true,
          },
        ],
      }
    : null;

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case "line":
        return <Line options={chartOptions} data={chartData} />;
      case "bar":
        return <Bar options={chartOptions as any} data={chartData} />;
      case "candlestick":
        // Note: For candlestick, you'll need additional OHLC data
        return <Line options={chartOptions} data={chartData} />;
      default:
        return <Line options={chartOptions} data={chartData} />;
    }
  };

  if (loading) {
    return (
      <PageTemplate>
        <div className="flex justify-center items-center p-8">
          <span>Loading...</span>
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <div className="flex justify-center items-center p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="space-y-8">
        {/* Crypto Info Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {crypto?.name} ({crypto?.symbol.toUpperCase()})
          </h2>
          <div className="flex justify-center items-center">
            <img
              src={crypto?.image?.large}
              alt={`${crypto?.name || "Cryptocurrency"} logo`}
              className="w-20 h-20 mr-4"
            />
            <div>
              <p className="text-lg font-semibold">
                Current Price: $
                {crypto?.market_data.current_price.usd.toLocaleString() ??
                  "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Market Cap: $
                {crypto?.market_data.market_cap.usd.toLocaleString() ?? "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Total Supply:{" "}
                {crypto?.market_data.total_supply?.toLocaleString() ?? "N/A"}
              </p>
              <p
                className={`text-sm ${
                  (crypto?.market_data.price_change_percentage_24h ?? 0) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                24h Change:{" "}
                {crypto?.market_data.price_change_percentage_24h?.toFixed(2) ??
                  0}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex justify-between items-center px-6">
          <div className="space-x-2">
            {timeRanges.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setTimeRange(value)}
                className={`px-4 py-2 rounded ${
                  timeRange === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="space-x-2">
            {chartTypes.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setChartType(value)}
                className={`px-4 py-2 rounded ${
                  chartType === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Price History Chart */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">
            Price History
          </h3>
          {chartData ? (
            renderChart()
          ) : (
            <p className="text-center text-gray-500">
              No historical data available
            </p>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default CryptoDetail;
