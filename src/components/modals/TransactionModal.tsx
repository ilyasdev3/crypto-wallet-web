import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../../components/ui/input";
import Button from "../ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import {
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Copy,
  Check,
  ArrowRight,
  Search,
} from "lucide-react";
import { showToast } from "../../utils/toastConfig";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "deposit" | "withdraw" | "transfer";
  userWalletAddress?: string; // User's wallet address for deposit
}

interface TokenOption {
  symbol: string;
  name: string;
  balance?: string;
  icon: string;
}

const tokens: TokenOption[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "1.234",
    icon: "🌐",
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "1,234.56",
    icon: "💵",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "2,345.67",
    icon: "💰",
  },
];

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  userWalletAddress = "0x1234...5678", // Default value for demo
}) => {
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<string>(tokens[0].symbol);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [addressCopied, setAddressCopied] = useState(false);
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs based on transaction type
      if (type === "withdraw" && !recipientAddress) {
        throw new Error("Please enter a valid wallet address");
      }

      if (type === "transfer" && !recipientUsername) {
        throw new Error("Please enter a valid username");
      }

      if (!amount || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} successful!`
      );
      onClose();
    } catch (error) {
      showToast.error(
        error instanceof Error ? error.message : "Transaction failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userWalletAddress);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
      showToast.success("Address copied to clipboard!");
    } catch (error) {
      showToast.error("Failed to copy address");
    }
  };

  const handleUsernameSearch = async () => {
    if (!recipientUsername) return;

    setIsSearchingUser(true);
    try {
      // Simulate API call to search user
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // For demo, assume user is found if username is longer than 3 chars
      const found = recipientUsername.length > 3;
      setUserFound(found);
      if (!found) {
        showToast.error("User not found");
      }
    } catch (error) {
      showToast.error("Error searching for user");
    } finally {
      setIsSearchingUser(false);
    }
  };

  const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);

  const renderTransactionFields = () => {
    switch (type) {
      case "deposit":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Your Deposit Address
            </label>
            <div className="flex items-center gap-2">
              <Input
                value={userWalletAddress}
                readOnly
                className="font-mono text-sm text-white"
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleCopyAddress}
                className="flex-shrink-0"
              >
                {addressCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              Send only {selectedToken} to this address
            </p>
          </div>
        );

      case "withdraw":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Recipient Wallet Address
            </label>
            <Input
              placeholder="Enter wallet address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="font-mono text-sm text-white"
            />
          </div>
        );

      case "transfer":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Recipient Username
            </label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter username"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
                className="text-sm text-white"
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleUsernameSearch}
                // disabled={isSearchingUser}
                className="flex-shrink-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            {isSearchingUser && (
              <p className="text-sm text-gray-400">Searching for user...</p>
            )}
            {userFound && (
              <p className="text-sm text-green-500">User found! ✓</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-50 border border-dark-100 sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {type === "deposit" && (
              <div className="p-2 rounded-full bg-accent-success/10 text-accent-success">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            )}
            {type === "withdraw" && (
              <div className="p-2 rounded-full bg-accent-error/10 text-accent-error">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            )}
            {type === "transfer" && (
              <div className="p-2 rounded-full bg-primary-500/10 text-primary-500">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
            <DialogTitle className="text-xl font-bold text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)} Funds
            </DialogTitle>
          </div>
          <DialogDescription>
            {type === "deposit" && "Add funds to your wallet"}
            {type === "withdraw" && "Withdraw funds to external wallet"}
            {type === "transfer" && "Transfer funds to another user"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Token Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Select Token
            </label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>{selectedTokenData?.icon}</span>
                    <span>{selectedTokenData?.symbol}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span>{token.icon}</span>
                        <div>
                          <p className="font-medium">{token.symbol}</p>
                          <p className="text-xs text-gray-400">{token.name}</p>
                        </div>
                      </div>
                      {token.balance && (
                        <p className="text-sm text-gray-400">
                          Balance: {token.balance}
                        </p>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transaction Type Specific Fields */}
          {renderTransactionFields()}

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Amount</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-20 text-white"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary-500 font-medium hover:text-primary-400"
                onClick={() => setAmount(selectedTokenData?.balance || "0")}
              >
                MAX
              </button>
            </div>
          </div>

          {/* Network Fee Estimate */}
          <div className="p-3 bg-dark-100 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-400">
                <span>Network Fee</span>
                <Info className="w-4 h-4" />
              </div>
              <span className="text-white">~$2.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">You will receive</span>
              <span className="font-medium text-white">
                {amount || "0.00"} {selectedToken}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outlined"
              size="large"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              // type="submit"
              variant={type === "deposit" ? "primary" : "secondary"}
              size="large"
              className="flex-1"
              // disabled={isLoading || (type === "transfer" && !userFound)}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                type.charAt(0).toUpperCase() + type.slice(1)
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
