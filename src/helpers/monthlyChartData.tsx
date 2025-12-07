import type { Transaction } from "../types/transaction";
import { getMonthlyBalance } from "./monthlyBalance";

export const getMonthlyChartSeries = (transactions: Transaction[]) => {
  const monthly = getMonthlyBalance(transactions);

  const income = Object.values(monthly).map((m) => m.income);
  const expense = Object.values(monthly).map((m) => m.expense);
  const net = Object.values(monthly).map((m) => m.net);

  return [
    {
      name: "Pemasukan",
      data: income,
    },
    {
      name: "Pengeluaran",
      data: expense,
    },
    {
      name: "Saldo",
      data: net,
    },
  ];
};
