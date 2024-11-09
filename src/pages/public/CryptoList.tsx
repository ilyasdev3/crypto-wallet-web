import React, { useState, useEffect } from "react";
import PageTemplate from "../../components/_layout"; // Assuming you have this component

// Crypto Data Interface
interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cryptocurrencies data
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
        );
        const data: Crypto[] = await response.json();
        setCryptos(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch cryptocurrencies");
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

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
          <span>{error}</span>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="space-y-8">
        <div className="p-6 bg-dark-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Cryptocurrency List
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-dark-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold">{crypto.name}</h3>
                <p className="text-lg text-gray-400">
                  {crypto.symbol.toUpperCase()}
                </p>
                <p className="text-lg font-bold mt-2">
                  {crypto.current_price} USD
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CryptoList;
