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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-electric-cyan transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
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
