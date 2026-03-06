import { NextResponse } from "next/server";
import { getTransactions, addTransaction } from "@/lib/transactions";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getTransactions(), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const tx = {
    id: crypto.randomUUID(),
    wallet: body.wallet,
    amount: Number(body.amount),
    token: body.token || "POOL",
    txid: body.txid,
    timestamp: Date.now(),
    message: body.message || undefined,
  };

  addTransaction(tx);
  return NextResponse.json(tx);
}
