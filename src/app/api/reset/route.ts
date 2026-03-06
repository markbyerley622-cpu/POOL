import { NextResponse } from "next/server";
import { resetTransactions } from "@/lib/transactions";

export const dynamic = "force-dynamic";

export async function POST() {
  resetTransactions();
  return NextResponse.json({ ok: true });
}
