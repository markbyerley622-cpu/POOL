"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Lower Slippage",
    desc: "Large trades can execute without moving price dramatically.",
  },
  {
    title: "Safer Trading",
    desc: "Deep liquidity reduces the risk of price manipulation.",
  },
  {
    title: "Market Stability",
    desc: "Liquidity buffers volatility and absorbs large orders.",
  },
  {
    title: "Better Trader Confidence",
    desc: "Traders are more likely to participate when liquidity is strong.",
  },
];

export default function EducationPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 rounded-xl border border-electric-cyan/20 bg-electric-cyan/5 backdrop-blur"
    >
      <h3 className="text-sm font-bold text-electric-cyan font-mono mb-1">
        Why Liquidity Matters
      </h3>
      <p className="text-xs text-electric-cyan/50 mb-4">
        Higher liquidity pools create healthier markets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(0,240,255,0.3)" }}
            className="p-3 rounded-lg border border-electric-cyan/10 bg-background/40 transition-colors"
          >
            <p className="text-xs font-bold text-electric-cyan font-mono mb-1">
              {b.title}
            </p>
            <p className="text-[11px] text-electric-cyan/50 leading-relaxed">
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
