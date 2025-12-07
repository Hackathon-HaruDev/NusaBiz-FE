import Riwayat from "../../components/dashboard/riwayat";
import { mapTransactionToRiwayat } from "../../helpers/mapTransaction";
import type { Transaction } from "../../types/transaction";

export const TransactionHistory = ({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading: boolean;
}) => {
  return (
    <div
      className="flex flex-col border border-gray-700 bg-[#1e293b] rounded-lg"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <p className="w-full text-center p-3 text-2xl border-b border-gray-700 text-white">
        Riwayat Transaksi
      </p>

      <div className="flex flex-col overflow-y-auto flex-1">
        {loading ? (
          <p className="p-5 text-gray-400">Loading Data</p>
        ) : (
          transactions.map((trx) => (
            <Riwayat key={trx.id} data={mapTransactionToRiwayat(trx)} />
          ))
        )}
      </div>
    </div>
  );
};
