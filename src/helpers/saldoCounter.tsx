import type { Transaction } from "../types/transaction";

export const calculateBalanceFromTransactions = (transactions: Transaction[]) => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions.reduce((acc, trx) => {
    if (trx.type === "Income") return acc + trx.amount;
    if (trx.type === "Expense") return acc - trx.amount;
    return acc;
  }, 0);
};
