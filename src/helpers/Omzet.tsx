import type { Transaction } from "../types/transaction";

export const getTodayOmzet = (transactions: Transaction[]) => {
  const today = new Date();

  return transactions
    .filter(t => {
      const d = new Date(t.transaction_date);
      return (
        t.type === "Income" &&
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);
};

export const getYesterdayOmzet = (transactions: Transaction[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return transactions
    .filter(t => {
      const d = new Date(t.transaction_date);
      return (
        t.type === "Income" &&
        d.getDate() === yesterday.getDate() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getFullYear() === yesterday.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);
};
