// In-memory transaction store — works on Vercel's read-only filesystem.
// Data resets on cold start; the client Zustand store holds state locally too.

let transactions: unknown[] = [];

export function getTransactions() {
  return transactions;
}

export function addTransaction(tx: unknown) {
  transactions.unshift(tx);
}

export function resetTransactions() {
  transactions = [];
}
