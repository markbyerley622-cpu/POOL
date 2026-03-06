"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { formatNumber, shortenTxid, timeAgo } from "@/utils/format";

export default function TransactionFeed() {
  const transactions = useStore((s) => s.transactions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded-xl border border-neon-blue/20 bg-neon-blue/5 backdrop-blur"
    >
      <h3 className="text-sm font-bold text-neon-blue font-mono mb-3">
        Liquidity Operations
      </h3>
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="py-12 text-center">
            <motion.p
              className="text-xs font-mono text-neon-blue/30"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Waiting for buyback operations...
            </motion.p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {transactions.slice(0, 20).map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -30, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-neon-blue/10 bg-background/50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                >
                  <Image
                    src="/pool_token_logo.png"
                    alt="POOL"
                    width={28}
                    height={28}
                    className="rounded-full mt-0.5 flex-shrink-0"
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs font-mono text-electric-cyan font-bold"
                    >
                      Buyback Executed
                    </motion.span>
                    <span className="text-[10px] font-mono text-neon-blue/40">
                      {timeAgo(tx.timestamp)}
                    </span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-mono text-green-400 font-bold"
                  >
                    +{formatNumber(tx.amount)} {tx.token}
                  </motion.p>
                  <p className="text-[10px] font-mono text-neon-blue/50">
                    Wallet: {tx.wallet}
                  </p>
                  <a
                    href={`https://solscan.io/tx/${tx.txid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-neon-purple hover:text-neon-purple/80 transition-colors"
                  >
                    TX: {shortenTxid(tx.txid)}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
