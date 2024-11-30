import React, { useState } from "react";
import PageTemplate from "../../components/_layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "@mui/material";
import { Badge } from "../../components/ui/badge";
import {
  Wallet as WalletIcon,
  Copy,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";

import TransactionModal from "../../components/modals/TransactionModal";
import { useQuery } from "@apollo/client";
import { GET_WALLET } from "../../graphql/wallet/query.wallet";
import Spinner from "../../components/ui/Spinner";

interface Transaction {
  id: string;
  date: string;
  type: "Sent" | "Received";
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  to?: string;
  from?: string;
}

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [copied, setCopied] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const exampleTransactions: Transaction[] = [
    {
      id: "txn1",
      date: "2024-11-01 14:30:25",
      type: "Sent",
      amount: 0.5,
      status: "Pending",
      to: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      id: "txn2",
      date: "2024-11-02 09:15:10",
      type: "Received",
      amount: 1.2,
      status: "Approved",
      from: "0x9876543210abcdef9876543210abcdef98765432",
    },
    {
      id: "txn3",
      date: "2024-11-03 16:45:30",
      type: "Sent",
      amount: 2.0,
      status: "Rejected",
      to: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      id: "txn4",
      date: "2024-11-04 16:45:30",
      type: "Received",
      amount: 0.5,
      status: "Pending",
      from: "0x9876543210abcdef9876543210abcdef98765432",
    },
    {
      id: "txn5",
      date: "2024-11-05 16:45:30",
      type: "Sent",
      amount: 0.5,
      status: "Approved",
      to: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      id: "txn6",
      date: "2024-11-06 16:45:30",
      type: "Received",
      amount: 0.5,
      status: "Rejected",
      from: "0x9876543210abcdef9876543210abcdef98765432",
    },
  ];

  const { data: walletData, loading: isLoading } = useQuery(GET_WALLET);

  // if (isLoading) return <Spinner />;

  const [transactions] = useState<Transaction[]>(exampleTransactions);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(walletData?.getWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Approved":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    const statusStyles = {
      Pending: "bg-yellow-500/10 text-yellow-500",
      Approved: "bg-green-500/10 text-green-500",
      Rejected: "bg-red-500/10 text-red-500",
    };

    return (
      <Badge className={`${statusStyles[status]} flex items-center gap-1`}>
        {getStatusIcon(status)}
        {status}
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.status === activeTab &&
      (searchQuery === "" ||
        txn.to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.from?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-dark-200 to-dark-300">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {walletData?.getWallet.balance} ETH
                </div>
                <div className="text-gray-400">
                  ${walletData?.getWallet.balance * 1850}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Address Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">
                Wallet Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-dark-300 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <WalletIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-mono text-sm">
                    {walletData?.getWallet.address.slice(0, 6)}...
                    {walletData?.getWallet.address.slice(-4)}
                  </span>
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCopyAddress}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsDepositOpen(true)}>
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button onClick={() => setIsWithdrawOpen(true)}>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {walletData?.getWallet.totalTransactions ?? 0} transactions •{" "}
              {walletData?.getWallet.pendingTransactions ?? 0} pending
            </span>
          </div>
        </div>

        {/* Transactions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                />
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Approved">Approved</TabsTrigger>
                <TabsTrigger value="Rejected">Rejected</TabsTrigger>
              </TabsList>

              {["Pending", "Approved", "Rejected"].map((status) => (
                <TabsContent key={status} value={status}>
                  <div className="space-y-4">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((txn) => (
                        <div
                          key={txn.id}
                          className="flex items-center justify-between p-4 bg-dark-300 rounded-lg hover:bg-dark-400 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-2 rounded-full ${
                                txn.type === "Sent"
                                  ? "bg-red-500/10"
                                  : "bg-green-500/10"
                              }`}
                            >
                              {txn.type === "Sent" ? (
                                <ArrowUpRight className="w-5 h-5 text-red-500" />
                              ) : (
                                <ArrowDownRight className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{txn.type}</div>
                              <div className="text-sm text-gray-400">
                                {new Date(txn.date).toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 font-mono mt-1">
                                {txn.type === "Sent"
                                  ? `To: ${txn.to?.slice(
                                      0,
                                      6
                                    )}...${txn.to?.slice(-4)}`
                                  : `From: ${txn.from?.slice(
                                      0,
                                      6
                                    )}...${txn.from?.slice(-4)}`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(txn.status)}
                            <div className="text-right">
                              <div
                                className={`font-medium ${
                                  txn.type === "Sent"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {txn.type === "Sent" ? "-" : "+"}
                                {txn.amount} ETH
                              </div>
                              <div className="text-sm text-gray-400">
                                ${(txn.amount * 1850).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        No transactions found
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
      // Add the modals:
      <TransactionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        type="deposit"
      />
      <TransactionModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        type="withdraw"
      />
    </PageTemplate>
  );
};

export default Wallet;
