// src/services/socketClient.service.ts
import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  TransactionUpdateData,
} from "../types/socket.types";

class SocketClientService {
  private static instance: SocketClientService;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;
  private userId: string | null = null;

  private constructor() {}

  public static getInstance(): SocketClientService {
    if (!SocketClientService.instance) {
      SocketClientService.instance = new SocketClientService();
    }
    return SocketClientService.instance;
  }

  public initialize(userId: string) {
    if (this.socket?.connected && this.userId === userId) return;

    this.userId = userId;
    this.socket = io("http://localhost:4000", {
      withCredentials: true,
      autoConnect: false,
    });

    this.setupEventListeners();
    this.connect();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket connected");
      if (this.userId) {
        this.socket?.emit("joinUser", this.userId);
      }
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  }

  public connect() {
    if (!this.socket?.connected) {
      this.socket?.connect();
    }
  }

  public disconnect() {
    if (this.userId) {
      this.socket?.emit("leaveUser", this.userId);
    }
    this.socket?.disconnect();
    this.userId = null;
  }

  public onTransactionUpdate(callback: (data: TransactionUpdateData) => void) {
    this.socket?.on("transactionUpdate", callback);
  }

  public offTransactionUpdate(callback: (data: TransactionUpdateData) => void) {
    this.socket?.off("transactionUpdate", callback);
  }
}

export default SocketClientService;
