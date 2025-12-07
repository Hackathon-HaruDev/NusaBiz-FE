import type { Transaction } from "../types/transaction";

export const mapTransactionToRiwayat = (t: Transaction) => ({
  tipe: t.type === "Income" ? "Pemasukan" : "Pengeluaran",
  kategori: t.category,
  nominal: t.amount,
  deskripsi: t.description,
  waktu: new Date(t.transaction_date).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }),
});
