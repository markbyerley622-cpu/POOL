export interface Transaction {
  id: string;
  wallet: string;
  amount: number;
  token: string;
  txid: string;
  timestamp: number;
  message?: string;
}
