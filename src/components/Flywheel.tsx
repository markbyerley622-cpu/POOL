"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const SEGMENTS = [
  { label: "Creator Rewards", color: "#00a3ff" },
  { label: "Buyback", color: "#9333ea" },
  { label: "Liquidity Reinforcement", color: "#00f0ff" },
  { label: "Market Stability", color: "#22c55e" },
  { label: "Volume Growth", color: "#f59e0b" },
];

export default function Flywheel() {
  const flywheelSpeed = useStore((s) => s.flywheelSpeed);
  const duration = Math.max(2, 20 / flywheelSpeed);

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-lg font-bold text-electric-cyan mb-4 font-mono">
        Liquidity Flywheel
      </h2>
      <div className="relative w-72 h-72">
        {/* Glow background */}
        <div className="absolute inset-0 rounded-full bg-neon-blue/5 blur-2xl" />

        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {SEGMENTS.map((seg, i) => {
            const angle = (i * 360) / SEGMENTS.length;
            const nextAngle = ((i + 1) * 360) / SEGMENTS.length;
            const startRad = (angle * Math.PI) / 180;
            const endRad = (nextAngle * Math.PI) / 180;
            const r = 80;
            const cx = 100,
              cy = 100;
            const x1 = cx + r * Math.cos(startRad);
            const y1 = cy + r * Math.sin(startRad);
            const x2 = cx + r * Math.cos(endRad);
            const y2 = cy + r * Math.sin(endRad);

            return (
              <path
                key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                fill={seg.color}
                fillOpacity={0.15}
                stroke={seg.color}
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
            );
          })}
          {/* Center circle */}
          <circle
            cx={100}
            cy={100}
            r={25}
            fill="#050510"
            stroke="#00f0ff"
            strokeWidth={2}
            opacity={0.8}
          />
          <text
            x={100}
            y={103}
            textAnchor="middle"
            fill="#00f0ff"
            fontSize={8}
            fontFamily="monospace"
          >
            POOL
          </text>
        </motion.svg>
      </div>

      {/* Segment labels */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xs">
        {SEGMENTS.map((seg, i) => (
          <span
            key={i}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: seg.color,
              borderColor: seg.color + "40",
              backgroundColor: seg.color + "10",
            }}
          >
            {seg.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
