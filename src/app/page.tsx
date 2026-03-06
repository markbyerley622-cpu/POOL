"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import AIAgent from "@/components/AIAgent";
import LiquidityPool from "@/components/LiquidityPool";
import Flywheel from "@/components/Flywheel";
import TelemetryPanel from "@/components/TelemetryPanel";
import DecisionEngine from "@/components/DecisionEngine";
import LiquidityRadar from "@/components/LiquidityRadar";
import TokenAnalytics from "@/components/TokenAnalytics";
import TransactionFeed from "@/components/TransactionFeed";
import AdminPanel from "@/components/AdminPanel";
import EducationPanel from "@/components/EducationPanel";
import ParticleBackground from "@/components/ParticleBackground";
import { useSync } from "@/hooks/useSync";

const BuybackHeatmap = dynamic(() => import("@/components/BuybackHeatmap"), {
  ssr: false,
});

export default function Home() {
  useSync();

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Header />
      <AdminPanel />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex justify-center p-6 rounded-2xl border border-neon-blue/20 bg-background/50 backdrop-blur">
            <Flywheel />
          </div>
          <div className="flex justify-center p-6 rounded-2xl border border-neon-purple/20 bg-background/50 backdrop-blur">
            <AIAgent />
          </div>
          <LiquidityPool />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TelemetryPanel />
          <DecisionEngine />
          <LiquidityRadar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BuybackHeatmap />
          <TokenAnalytics />
        </div>

        <TransactionFeed />

        <EducationPanel />

        <footer className="text-center py-8 border-t border-neon-blue/10">
          <p className="text-xs font-mono text-neon-blue/30">
            POOL Wheel - Automated Liquidity Flywheel - Powered by Solana
          </p>
        </footer>
      </main>
    </div>
  );
}
