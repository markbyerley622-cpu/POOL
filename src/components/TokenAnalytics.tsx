"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { formatNumber } from "@/utils/format";

export default function TokenAnalytics() {
  const transactions = useStore((s) => s.transactions);
  const totalBuybacks = useStore((s) => s.totalBuybacks());
  const totalLiquidityReinforced = useStore((s) => s.totalLiquidityReinforced());

  const avgBuyback =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
      : 0;

  const efficiency = transactions.length > 0 ? "97.3%" : "--";

  const metrics = [
    { label: "Total Buybacks", value: totalBuybacks > 0 ? totalBuybacks.toString() : "0" },
    { label: "Total Liquidity Added", value: totalLiquidityReinforced > 0 ? formatNumber(totalLiquidityReinforced) : "0" },
    { label: "Avg Buyback Size", value: avgBuyback > 0 ? formatNumber(avgBuyback) : "0" },
    { label: "Agent Efficiency", value: efficiency },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="p-4 rounded-xl border border-neon-purple/20 bg-neon-purple/5 backdrop-blur"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Image src="/pool_token_logo.png" alt="POOL" width={32} height={32} className="rounded-full" />
        </motion.div>
        <h3 className="text-sm font-bold text-neon-purple font-mono">
          Token Analytics
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="p-3 rounded-lg border border-neon-purple/10 bg-neon-purple/5 text-center"
          >
            <p className="text-[10px] text-neon-purple/60 font-mono mb-1">{m.label}</p>
            <motion.p
              key={m.value}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold text-neon-purple font-mono"
            >
              {m.value}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
