import type { Transaction } from "../types/transaction";


export const getLastMonthSaldo = (transactions: Transaction[]) => {
  const now = new Date();
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const d = new Date(t.transaction_date);

    // hanya transaksi SEBELUM bulan ini
    if (d < firstDayThisMonth) {
      if (t.type === "Income") {
        income += Number(t.amount);
      } else if (t.type === "Expense") {
        expense += Number(t.amount);
      }
    }
  });

  return income - expense;
};
