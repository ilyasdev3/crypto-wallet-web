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
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Copy,
  Check,
  ArrowRight,
  Search,
} from "lucide-react";
import { showToast } from "../../utils/toastConfig";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { GET_USER_WITH_NAME } from "../../graphql/user/queries.user";
import {
  TRANSFER_FUNDS,
  WITHDRAW_FUNDS,
} from "../../graphql/wallet/mutation.wallet";
import { GET_USER_TRANSACTIONS } from "../../graphql/transaction/query.transaction";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "deposit" | "withdraw" | "transfer";
  userWalletAddress?: string;
}

interface TokenOption {
  symbol: string;
  name: string;
  balance?: string;
  icon: string;
}

const ethToken: TokenOption = {
  symbol: "ETH",
  name: "Ethereum",
  balance: "1.234",
  icon: "🌐",
};

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  userWalletAddress = "0x1234...5678",
}) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [addressCopied, setAddressCopied] = useState(false);
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const { refetch } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { input: { type: "pending" } },
  });

  const [getUserWithName, { loading }] = useLazyQuery(GET_USER_WITH_NAME, {
    onCompleted: (data) => {
      if (data?.getUserWithName.user) {
        console.log("data.getUserWithName", data.getUserWithName);
        setUserFound(true);
        setUserNotFound(false);
        setRecipientAddress(data.getUserWithName.user.address);
        setRecipientAddress(data.getUserWithName.address);
      } else {
        setUserFound(false);
        setUserNotFound(true);
      }
      setIsSearchingUser(false);
    },
    onError: (error) => {
      setIsSearchingUser(false);
      setUserFound(false);
      setUserNotFound(true);
    },
  });

  const [transferFunds, { loading: isTransferring }] = useMutation(
    TRANSFER_FUNDS,
    {
      onCompleted: (data) => {
        showToast.success(data.transferFunds.message);
        refetch();
        onClose();
      },
      onError: (error) => {
        showToast.error(error.message);
      },
    }
  );

  const [withdrawFunds, { loading: isWithdrawing }] = useMutation(
    WITHDRAW_FUNDS,
    {
      onCompleted: (data) => {
        showToast.success(data.withdrawFunds.message);
        refetch();
        onClose();
      },
      onError: (error) => {
        showToast.error(error.message);
      },
    }
  );

  const handleUsernameSearch = async () => {
    if (!recipientUsername.trim()) {
      showToast.error("Please enter a username");
      return;
    }

    setIsSearchingUser(true);
    setUserFound(false);

    await getUserWithName({
      variables: { username: recipientUsername.trim() },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount greater than zero");
      }

      if (type === "withdraw") {
        if (!recipientAddress) {
          throw new Error("Please enter a valid wallet address");
        }
      }

      if (type === "transfer") {
        if (!recipientUsername) {
          throw new Error("Please enter a valid username");
        }
        if (!recipientAddress) {
          await handleUsernameSearch();
        }
        if (!userFound) {
          throw new Error("Recipient user not found");
        }
      }

      if (type === "transfer") {
        await handleTransferFunds();
      } else if (type === "withdraw") {
        await handleWithdrawFunds();
      }
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
              Send only {ethToken.symbol} to this address
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
                // onClick={handleUsernameSearch}

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
            {userNotFound && (
              <p className="text-sm text-red-500">User not found! ✗</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const handleTransferFunds = async () => {
    try {
      await transferFunds({
        variables: {
          transferFunds: {
            amount: amount,
            username: recipientUsername,
          },
        },
      });
    } catch (error: any) {
      showToast.error(error.message);
    }
  };

  const handleWithdrawFunds = async () => {
    try {
      await withdrawFunds({
        variables: {
          withdrawFunds: {
            amount: amount,
            address: recipientAddress,
          },
        },
      });
    } catch (error: any) {
      showToast.error(error.message);
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

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            {/* <label className="text-sm font-medium text-gray-400">
              Balance: {ethToken.balance}
            </label> */}
            <div className="flex items-center gap-2 p-3 bg-dark-100 rounded-lg text-white">
              <span>{ethToken.icon}</span>
              <span>{ethToken.symbol}</span>
              <span className="text-sm text-gray-400">
                Balance: {ethToken.balance}
              </span>
            </div>
          </div>

          {renderTransactionFields()}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-400">Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-white"
            />
          </div>

          <div className="flex gap-3">
            <Button
              disabled={isLoading || isTransferring || isWithdrawing}
              variant="outlined"
              size="large"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || isTransferring || isWithdrawing}
              variant={type === "deposit" ? "primary" : "secondary"}
              size="large"
              className="flex-1"
              onClick={
                type === "transfer" ? handleTransferFunds : handleWithdrawFunds
              }
            >
              {isLoading || isTransferring || isWithdrawing ? (
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
