import Riwayat from "../../components/dashboard/riwayat";
import { mapTransactionToRiwayat } from "../../helpers/mapTransaction";
import type { Transaction } from "../../types/transaction";

export const TransactionHistory = ({ transactions, loading }: { transactions: Transaction[], loading:boolean }) => {
  return (
    <div className="flex flex-col w-[30%] border border-[#e5e5e5]" style={{ height: 'calc(100vh - 120px)' }}>
      <p className="w-full text-center p-3 text-2xl border-b border-[#e5e5e5]">
        Riwayat Transaksi
      </p>

      <div className="flex flex-col overflow-y-auto flex-1">
        {
          loading ? 
            <p className="p-5">Loading Data</p> 
          :
            transactions.map((trx) => (
              <Riwayat key={trx.id} data={mapTransactionToRiwayat(trx)}/>
            ))
        }
        
      </div>
    </div>
  );
};
