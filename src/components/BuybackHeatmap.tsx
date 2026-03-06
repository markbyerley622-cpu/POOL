"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useStore } from "@/store/useStore";

export default function BuybackHeatmap() {
  const transactions = useStore((s) => s.transactions);

  const chartData = useMemo(() => {
    if (transactions.length === 0) return [];

    const sorted = [...transactions].sort((a, b) => a.timestamp - b.timestamp);
    let cumulative = 0;

    return sorted.map((tx) => {
      cumulative += tx.amount;
      const d = new Date(tx.timestamp);
      const label = `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
      return {
        time: label,
        liquidity: cumulative,
      };
    });
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded-xl border border-neon-blue/20 bg-neon-blue/5 backdrop-blur"
    >
      <h3 className="text-sm font-bold text-neon-blue font-mono mb-3">
        Buyback Activity
      </h3>
      <div className="h-48">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <motion.p
              className="text-xs font-mono text-neon-blue/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Waiting for buyback data...
            </motion.p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="liqGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#00a3ff88", fontSize: 10 }}
                axisLine={{ stroke: "#00a3ff22" }}
              />
              <YAxis
                tick={{ fill: "#00a3ff88", fontSize: 10 }}
                axisLine={{ stroke: "#00a3ff22" }}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString()
                }
              />
              <Tooltip
                contentStyle={{
                  background: "#0a0a1f",
                  border: "1px solid #00f0ff33",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#00f0ff",
                }}
                formatter={(value) => [Number(value).toLocaleString(), "Cumulative Liquidity"]}
              />
              <Area
                type="monotone"
                dataKey="liquidity"
                stroke="#00f0ff"
                strokeWidth={2}
                fill="url(#liqGradient)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
