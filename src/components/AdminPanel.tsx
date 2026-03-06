"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

function extractTxid(input: string): string {
  const match = input.match(/solscan\.io\/tx\/([A-Za-z0-9]+)/);
  if (match) return match[1];
  return input.trim();
}

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("POOL");
  const [txUrl, setTxUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const addTransaction = useStore((s) => s.addTransaction);
  const setFlywheelSpeed = useStore((s) => s.setFlywheelSpeed);
  const setAgentActive = useStore((s) => s.setAgentActive);
  const resetAll = useStore((s) => s.resetAll);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "c" && !window.getSelection()?.toString()) {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount || !txUrl) return;

    const txid = extractTxid(txUrl);

    await addTransaction({
      wallet,
      amount: parseFloat(amount),
      token,
      txid,
      message: message || undefined,
    });

    setAgentActive(true);
    setFlywheelSpeed(5);
    setTimeout(() => {
      setAgentActive(false);
      setFlywheelSpeed(1);
    }, 4000);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);

    setWallet("");
    setAmount("");
    setTxUrl("");
    setMessage("");
  };

  const handleReset = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    await resetAll();
    setConfirmReset(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md p-6 rounded-2xl border border-red-500/30 bg-[#0a0a1f] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-red-400 font-mono">
                Agent Control Panel
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-red-400/50 hover:text-red-400 text-xl"
              >
                x
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] text-red-400/60 font-mono">Creator Wallet Address</label>
                <input
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-red-500/20 text-sm font-mono text-white focus:outline-none focus:border-red-500/50"
                  placeholder="7xKX...m9Pq"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-red-400/60 font-mono">Token Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-red-500/20 text-sm font-mono text-white focus:outline-none focus:border-red-500/50"
                    placeholder="125000"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-red-400/60 font-mono">Token Symbol</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-red-500/20 text-sm font-mono text-white focus:outline-none focus:border-red-500/50"
                    placeholder="POOL"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-red-400/60 font-mono">Solscan TX Link</label>
                <input
                  type="text"
                  value={txUrl}
                  onChange={(e) => setTxUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-red-500/20 text-sm font-mono text-white focus:outline-none focus:border-red-500/50"
                  placeholder="https://solscan.io/tx/4FsyQj..."
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-red-400/60 font-mono">Optional Message</label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-red-500/20 text-sm font-mono text-white focus:outline-none focus:border-red-500/50"
                  placeholder="Buyback note"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-mono font-bold text-sm transition-all bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50"
              >
                {submitted ? "EXECUTED" : "Execute Buyback"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-red-500/10">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2 rounded-lg font-mono text-xs transition-all border bg-yellow-500/10 text-yellow-400/80 border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/40"
              >
                {confirmReset ? "Click again to confirm reset" : "Reset All Data"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
