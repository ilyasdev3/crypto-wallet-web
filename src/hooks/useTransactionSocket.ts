// src/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { showToast } from "../utils/toastConfig";

interface TransactionUpdate {
  transactionId: string;
  status: "completed" | "failed" | "pending";
  type: "send" | "receive";
  amount: string;
  timestamp: number;
}

export const useSocket = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Initialize socket
    socketRef.current = io("http://localhost:4000", {
      withCredentials: true,
    });

    const socket = socketRef.current;

    // Connection handlers
    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("joinUser", userId);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId]);

  const subscribeToTransactions = (
    callback: (data: TransactionUpdate) => void
  ) => {
    if (!socketRef.current) return;

    socketRef.current.on("transactionUpdate", callback);
    return () => {
      socketRef.current?.off("transactionUpdate", callback);
    };
  };

  return {
    socket: socketRef.current,
    subscribeToTransactions,
  };
};
