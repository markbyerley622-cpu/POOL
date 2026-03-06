"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DECISIONS = [
  [
    "Reward threshold exceeded",
    "Liquidity reinforcement recommended",
    "Executing buyback",
    "Expected liquidity impact: HIGH",
  ],
  [
    "Pool depth analysis complete",
    "Slippage reduction target: 12%",
    "Optimal buyback size: 150K",
    "Confidence level: 94.7%",
  ],
  [
    "Volume spike detected",
    "Reward accumulation accelerating",
    "Pre-emptive buyback scheduled",
    "Risk assessment: LOW",
  ],
  [
    "Market conditions favorable",
    "Liquidity ratio above threshold",
    "Maintaining current strategy",
    "Next evaluation: 30s",
  ],
];

export default function DecisionEngine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % DECISIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl border border-neon-blue/20 bg-neon-blue/5 backdrop-blur">
      <h3 className="text-sm font-bold text-neon-blue font-mono mb-3">
        Decision Engine
      </h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-1.5"
        >
          {DECISIONS[index].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              <span className="text-neon-blue/40 font-mono text-[10px]">
                {">"}
              </span>
              <span className="text-xs font-mono text-neon-blue/80">
                {line}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
