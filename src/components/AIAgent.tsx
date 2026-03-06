"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function AIAgent() {
  const agentActive = useStore((s) => s.agentActive);

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-lg font-bold text-electric-cyan mb-4 font-mono">
        Liquidity Agent
      </h2>
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer scanning ring */}
        <motion.div
          className="absolute w-44 h-44 rounded-full border border-neon-blue/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-neon-blue shadow-neon-blue" />
        </motion.div>

        {/* Middle ring */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border border-neon-purple/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-neon-purple shadow-neon-purple" />
        </motion.div>

        {/* Core orb */}
        <motion.div
          className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: agentActive
              ? "radial-gradient(circle, #00f0ff 0%, #9333ea 50%, #050510 100%)"
              : "radial-gradient(circle, #00a3ff33 0%, #9333ea22 50%, #050510 100%)",
          }}
          animate={{
            scale: agentActive ? [1, 1.15, 1] : [1, 1.05, 1],
            boxShadow: agentActive
              ? [
                  "0 0 20px #00f0ff, 0 0 40px #9333ea",
                  "0 0 40px #00f0ff, 0 0 80px #9333ea",
                  "0 0 20px #00f0ff, 0 0 40px #9333ea",
                ]
              : [
                  "0 0 10px #00a3ff44",
                  "0 0 20px #00a3ff44",
                  "0 0 10px #00a3ff44",
                ],
          }}
          transition={{ duration: agentActive ? 0.8 : 2, repeat: Infinity }}
        >
          <span className="text-2xl font-bold font-mono text-electric-cyan">
            AI
          </span>
        </motion.div>

        {/* Scanning beam */}
        <motion.div
          className="absolute w-full h-0.5 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #00f0ff 50%, transparent 100%)",
          }}
          animate={{ rotate: 360, opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-3 text-xs font-mono"
        animate={{
          color: agentActive ? "#00f0ff" : "#00a3ff88",
        }}
      >
        {agentActive ? "EXECUTING BUYBACK" : "MONITORING"}
      </motion.p>
    </motion.div>
  );
}
