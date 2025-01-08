export interface ServerToClientEvents {
  transactionUpdate: (data: TransactionUpdateData) => void;
  userOnline: (userId: string) => void;
  userOffline: (userId: string) => void;
  error: (error: string) => void;
}

export interface ClientToServerEvents {
  joinUser: (userId: string) => void;
  leaveUser: (userId: string) => void;
}

export interface TransactionUpdateData {
  transactionId: string;
  status: "pending" | "completed" | "failed";
  type: "send" | "receive" | "withdraw";
  amount?: string;
  timestamp: number;
}
