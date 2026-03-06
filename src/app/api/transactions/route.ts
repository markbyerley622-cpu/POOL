import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "transactions.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

function readTransactions() {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeTransactions(txs: unknown[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(txs, null, 2), "utf-8");
}

export async function GET() {
  const txs = readTransactions();
  return NextResponse.json(txs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const tx = {
    id: crypto.randomUUID(),
    wallet: body.wallet,
    amount: body.amount,
    token: body.token,
    txid: body.txid,
    timestamp: Date.now(),
    message: body.message || undefined,
  };

  const txs = readTransactions();
  txs.unshift(tx);
  writeTransactions(txs);

  return NextResponse.json(tx);
}
