"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-10 border-b border-neon-blue/20 bg-background/80 backdrop-blur-md">
      <div className="grid grid-cols-3 items-center px-8 py-4">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/pool_token_logo.png"
              alt="POOL"
              width={44}
              height={44}
              className="rounded-full shadow-neon-blue"
            />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-neon-blue via-electric-cyan to-neon-purple bg-clip-text text-transparent">
              POOL Wheel
            </h1>
            <p className="text-[10px] text-electric-cyan/50 font-mono tracking-wider uppercase">
              Liquidity Flywheel
            </p>
          </div>
        </div>

        {/* Center: Description */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[13px] text-foreground/35 text-center leading-relaxed tracking-wide max-w-sm">
            Automated buybacks from creator fees. An agentic system routes funds
            directly to the LP, strengthening market depth.
          </p>
        </motion.div>

        {/* Right: Status */}
        <div className="flex items-center gap-3 justify-end">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm text-green-400 font-mono">
            Agent: ACTIVE
          </span>
        </div>
      </div>
    </header>
  );
}
