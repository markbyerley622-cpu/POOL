import { create } from "zustand";
import { Transaction } from "@/types";

interface PoolState {
  transactions: Transaction[];
  flywheelSpeed: number;
  agentActive: boolean;
  lastSyncedIds: Set<string>;

  setTransactions: (txs: Transaction[]) => void;
  syncFromServer: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp">) => Promise<void>;
  resetAll: () => Promise<void>;
  setFlywheelSpeed: (speed: number) => void;
  setAgentActive: (active: boolean) => void;

  // Derived
  totalLiquidityReinforced: () => number;
  totalBuybacks: () => number;
  liquidityDepth: () => number;
}

export const useStore = create<PoolState>((set, get) => ({
  transactions: [],
  flywheelSpeed: 1,
  agentActive: false,
  lastSyncedIds: new Set<string>(),

  setTransactions: (txs) => set({ transactions: txs }),

  syncFromServer: async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) return;
      const txs: Transaction[] = await res.json();
      set({ transactions: txs });
    } catch {
      // silent fail on network error
    }
  },

  addTransaction: async (tx) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    });
    if (!res.ok) return;
    // Re-fetch full list to stay in sync
    await get().syncFromServer();
  },

  resetAll: async () => {
    await fetch("/api/reset", { method: "POST" });
    set({
      transactions: [],
      flywheelSpeed: 1,
      agentActive: false,
    });
  },

  setFlywheelSpeed: (speed) => set({ flywheelSpeed: speed }),
  setAgentActive: (active) => set({ agentActive: active }),

  totalLiquidityReinforced: () =>
    get().transactions.reduce((sum, t) => sum + t.amount, 0),
  totalBuybacks: () => get().transactions.length,
  liquidityDepth: () =>
    Math.min(
      100,
      get().transactions.reduce((sum, t) => sum + t.amount / 50000, 0)
    ),
}));
