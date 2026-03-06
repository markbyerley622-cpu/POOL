import { create } from "zustand";
import { Transaction } from "@/types";

interface PoolState {
  transactions: Transaction[];
  flywheelSpeed: number;
  agentActive: boolean;

  setTransactions: (txs: Transaction[]) => void;
  syncFromServer: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp">) => Promise<void>;
  resetAll: () => Promise<void>;
  setFlywheelSpeed: (speed: number) => void;
  setAgentActive: (active: boolean) => void;
}

export const useStore = create<PoolState>((set, get) => ({
  transactions: [],
  flywheelSpeed: 1,
  agentActive: false,

  setTransactions: (txs) => set({ transactions: txs }),

  syncFromServer: async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) return;
      const txs: Transaction[] = await res.json();
      // Only update if data actually changed (compare length + first id)
      const current = get().transactions;
      if (
        txs.length !== current.length ||
        (txs.length > 0 && current.length > 0 && txs[0].id !== current[0].id)
      ) {
        set({ transactions: txs });
      }
    } catch {
      // silent
    }
  },

  addTransaction: async (tx) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    });
    if (!res.ok) return;
    const newTx: Transaction = await res.json();
    // Immediately update local state so UI reacts instantly
    set((state) => ({ transactions: [newTx, ...state.transactions] }));
  },

  resetAll: async () => {
    await fetch("/api/reset", { method: "POST" });
    set({ transactions: [], flywheelSpeed: 1, agentActive: false });
  },

  setFlywheelSpeed: (speed) => set({ flywheelSpeed: speed }),
  setAgentActive: (active) => set({ agentActive: active }),
}));

// Helper hooks that derive values from transactions
export function useDerivedStats() {
  const transactions = useStore((s) => s.transactions);
  const totalLiquidityReinforced = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalBuybacks = transactions.length;
  const liquidityDepth = Math.min(100, transactions.reduce((sum, t) => sum + t.amount / 50000, 0));
  const avgBuyback = totalBuybacks > 0 ? totalLiquidityReinforced / totalBuybacks : 0;

  return { totalLiquidityReinforced, totalBuybacks, liquidityDepth, avgBuyback, transactions };
}
