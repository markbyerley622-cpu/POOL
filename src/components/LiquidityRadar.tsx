"use client";

import { motion } from "framer-motion";

const SIGNALS = [
  { label: "Reward Accumulation", angle: 30, dist: 60, color: "#00a3ff" },
  { label: "Buyback Opportunity", angle: 150, dist: 55, color: "#9333ea" },
  { label: "Liquidity Reinforcement", angle: 270, dist: 65, color: "#00f0ff" },
];

export default function LiquidityRadar() {
  return (
    <div className="p-4 rounded-xl border border-electric-cyan/20 bg-electric-cyan/5 backdrop-blur flex flex-col items-center">
      <h3 className="text-sm font-bold text-electric-cyan font-mono mb-3">
        Liquidity Radar
      </h3>
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Grid circles */}
          {[30, 60, 90].map((r) => (
            <circle
              key={r}
              cx={100}
              cy={100}
              r={r}
              fill="none"
              stroke="#00f0ff"
              strokeWidth={0.5}
              strokeOpacity={0.2}
            />
          ))}
          {/* Cross lines */}
          <line x1={100} y1={10} x2={100} y2={190} stroke="#00f0ff" strokeWidth={0.5} strokeOpacity={0.15} />
          <line x1={10} y1={100} x2={190} y2={100} stroke="#00f0ff" strokeWidth={0.5} strokeOpacity={0.15} />

          {/* Signal dots */}
          {SIGNALS.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const x = 100 + s.dist * Math.cos(rad);
            const y = 100 + s.dist * Math.sin(rad);
            return (
              <g key={i}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill={s.color}
                  animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Sweep line */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
            style={{
              background:
                "linear-gradient(90deg, #00f0ff 0%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {SIGNALS.map((s, i) => (
          <span
            key={i}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ color: s.color, backgroundColor: s.color + "15" }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
