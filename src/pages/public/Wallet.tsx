import React, { useState, useEffect } from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";

// Example data for wallet transactions
const exampleTransactions = [
  {
    id: "txn1",
    date: "2024-11-01",
    type: "Sent",
    amount: 0.5,
    status: "Approved", // Added status for each transaction
    to: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
  {
    id: "txn2",
    date: "2024-11-02",
    type: "Received",
    amount: 1.2,
    status: "Pending", // Added status for each transaction
    from: "0x9876543210abcdef9876543210abcdef98765432",
  },
  {
    id: "txn3",
    date: "2024-11-03",
    type: "Sent",
    amount: 2.0,
    status: "Rejected", // Added status for each transaction
    to: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
];

const Wallet: React.FC = () => {
  const [walletInfo, setWalletInfo] = useState({
    balance: 10.5, // Example balance
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678", // Example wallet address
  });

  const [transactions, setTransactions] = useState(exampleTransactions);
  const [activeTab, setActiveTab] = useState("Pending"); // Default tab

  // Fetch wallet info and transactions from API or backend
  useEffect(() => {
    // For now, using static data. Replace with an API call if needed.
    // Example API call could be something like:
    // fetchWalletInfo();
    // fetchTransactions();
  }, []);

  // Filter transactions based on the status
  const filteredTransactions = transactions.filter(
    (txn) => txn.status === activeTab
  );

  return (
    <PageTemplate>
      <div className="space-y-8">
        {/* Wallet Info Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-2 font-semibold">
            Wallet Balance
          </Typography>
          <Typography variant="body1" className="text-primary-500 text-2xl">
            {walletInfo.balance} ETH
          </Typography>
        </div>

        {/* Wallet Address Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-2 font-semibold">
            Wallet Address
          </Typography>
          <div className="flex items-center">
            <Typography variant="body1" className="text-primary-500 mr-4">
              {walletInfo.walletAddress}
            </Typography>
            <button
              onClick={() =>
                navigator.clipboard.writeText(walletInfo.walletAddress)
              }
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Transaction Tabs and Buttons (Half Screen Width & Centered) */}
        <div className="w-1/2 mx-auto flex justify-between items-center bg-dark-300 p-4 rounded-lg mb-6">
          {/* Transaction Tabs */}
          <div className="flex space-x-4">
            {["Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-white font-semibold px-4 py-2 rounded-lg transition ${
                  activeTab === tab
                    ? "bg-primary-500"
                    : "bg-dark-400 hover:bg-primary-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Deposit & Withdraw Buttons */}
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Deposit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Withdraw
            </button>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-4 font-semibold">
            Transaction History
          </Typography>
          <div className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <div key={txn.id} className="flex justify-between">
                  <div>
                    <Typography variant="body1" className="font-semibold">
                      {txn.type} - {txn.date}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                      {txn.type === "Sent"
                        ? `To: ${txn.to}`
                        : `From: ${txn.from}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="body1"
                      className={`font-semibold ${
                        txn.type === "Sent" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {txn.amount} ETH
                    </Typography>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="body1" className="text-gray-400">
                No transactions to display
              </Typography>
            )}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Wallet;
