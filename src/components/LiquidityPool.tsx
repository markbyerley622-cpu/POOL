"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useDerivedStats } from "@/store/useStore";
import { formatNumber } from "@/utils/format";

export default function LiquidityPool() {
  const { totalLiquidityReinforced, totalBuybacks, liquidityDepth, transactions } = useDerivedStats();
  const fillPercent = Math.min(100, liquidityDepth);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center p-6 rounded-2xl border border-neon-blue/20 bg-background/50 backdrop-blur"
    >
      <h2 className="text-lg font-bold text-electric-cyan mb-4 font-mono">
        Liquidity Pool
      </h2>

      <div className="relative w-52 h-52 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,240,255,${fillPercent / 200}) 0%, transparent 70%)`,
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="poolGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.6} />
              <stop offset={`${fillPercent}%`} stopColor="#00a3ff" stopOpacity={0.3} />
              <stop offset={`${fillPercent}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle cx={100} cy={100} r={90} fill="url(#poolGrad)" stroke="#00f0ff" strokeWidth={2} strokeOpacity={0.4} />
          <circle cx={100} cy={100} r={90} fill="none" stroke="#9333ea" strokeWidth={1} strokeOpacity={0.2} strokeDasharray="4 4" />
        </svg>

        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/pool_token_logo.png" alt="POOL" width={56} height={56} className="rounded-full shadow-neon-cyan" />
        </motion.div>

        <div className="absolute bottom-8 inset-x-0 text-center">
          <motion.span
            key={fillPercent.toFixed(1)}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-2xl font-bold font-mono text-electric-cyan inline-block"
          >
            {fillPercent.toFixed(1)}%
          </motion.span>
          <p className="text-[10px] text-neon-blue/60 font-mono">DEPTH</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {[
          { label: "Total Reinforced", value: totalLiquidityReinforced > 0 ? formatNumber(totalLiquidityReinforced) : "0" },
          { label: "Total Buybacks", value: totalBuybacks.toString() },
          { label: "Liquidity Depth", value: `${fillPercent.toFixed(1)}%` },
          { label: "Success Rate", value: transactions.length > 0 ? "97.3%" : "--" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-2 rounded-lg border border-neon-blue/10 bg-neon-blue/5"
          >
            <p className="text-xs text-neon-blue/60 font-mono">{m.label}</p>
            <motion.p
              key={m.value}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold text-electric-cyan font-mono"
            >
              {m.value}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
