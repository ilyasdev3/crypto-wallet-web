// components/modals/TransactionModal.tsx
import React from "react";
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
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "deposit" | "withdraw";
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
}) => {
  const [amount, setAmount] = React.useState("");
  const [selectedToken, setSelectedToken] = React.useState<string>(
    tokens[0].symbol
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-50 border border-dark-100 sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {type === "deposit" ? (
              <div className="p-2 rounded-full bg-accent-success/10 text-accent-success">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-full bg-accent-error/10 text-accent-error">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            )}
            <DialogTitle className="text-xl font-bold text-white">
              {type === "deposit" ? "Deposit" : "Withdraw"} Funds
            </DialogTitle>
          </div>
          <DialogDescription>
            {type === "deposit"
              ? "Add funds to your wallet"
              : "Withdraw funds from your wallet"}
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

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Amount</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-20"
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
              variant={type === "deposit" ? "primary" : "secondary"}
              size="large"
              className="flex-1"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : type === "deposit" ? (
                "Deposit"
              ) : (
                "Withdraw"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
