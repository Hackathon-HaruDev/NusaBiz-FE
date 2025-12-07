import type { Transaction } from "../types/transaction";
import { getMonthlyBalance } from "./monthlyBalance";

export const getMonthlyChartSeries = (
  transactions: Transaction[],
  year: number
) => {

  // Filter transaksi berdasarkan tahun
  const filtered = transactions.filter((trx) => {
    const trxYear = new Date(trx.transaction_date).getFullYear();
    return trxYear === year;
  });

  // Hitung pemasukan/pengeluaran/bulan pada tahun tsb
  const monthly = getMonthlyBalance(filtered);

  const income = Object.values(monthly).map((m) => m.income);
  const expense = Object.values(monthly).map((m) => m.expense);
  const net = Object.values(monthly).map((m) => m.net);

  return [
    { name: "Pemasukan", data: income },
    { name: "Pengeluaran", data: expense },
    { name: "Saldo", data: net },
  ];
};
