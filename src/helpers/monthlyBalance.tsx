import type { Transaction } from "../types/transaction";


export const getMonthlyBalance = (transactions: Transaction[]) => {
  const result: Record<number, { income: number; expense: number; net: number }> = {};

  // init 12 bulan
  for (let i = 1; i <= 12; i++) {
    result[i] = {
      income: 0,
      expense: 0,
      net: 0,
    };
  }

  transactions.forEach((trx) => {
    const month = new Date(trx.transaction_date).getMonth() + 1;

    if (trx.type === "Income") {
      result[month].income += trx.amount;
    } else if (trx.type === "Expense") {
      result[month].expense += trx.amount;
    }

    result[month].net = result[month].income - result[month].expense;
  });

  return result;
};
