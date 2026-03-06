"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Scanning creator rewards...",
  "Liquidity opportunity detected",
  "Executing buyback protocol...",
  "Broadcasting transaction...",
  "Liquidity reinforcement confirmed",
  "Analyzing pool depth metrics...",
  "Monitoring trading volume...",
  "Calibrating reward threshold...",
  "Verifying on-chain data...",
  "Optimization cycle complete",
];

export default function TelemetryPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-xl border border-neon-purple/20 bg-neon-purple/5 backdrop-blur">
      <h3 className="text-sm font-bold text-neon-purple font-mono mb-3">
        Agent Telemetry
      </h3>
      <div className="h-8 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-electric-cyan"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-electric-cyan/80">
              {MESSAGES[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
