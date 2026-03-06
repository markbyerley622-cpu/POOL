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

        {/* Right: Social + Status */}
        <div className="flex items-center gap-4 justify-end">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-electric-cyan transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-electric-cyan transition-colors">
            <Image src="/github.png" alt="GitHub" width={22} height={22} className="opacity-50 hover:opacity-100 transition-opacity" />
          </a>
          <div className="w-px h-5 bg-foreground/10" />
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
