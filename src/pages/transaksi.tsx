import { useState } from "react";
import AiButton from "../components/aiButton";
import AiModal from "../components/aiModal";
import Card from "../components/transaksi/card";
import Table from "../components/transaksi/table";
import { useTransactions } from "../hooks/useTransactions";

const Transaksi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch transaction totals and list from backend
  const { transactions, totals, loading, refreshData } = useTransactions();

  return (
    <div className="p-3 sm:p-5 flex flex-col gap-4 sm:gap-5">
      <p className="font-bold text-2xl sm:text-3xl md:text-4xl">Transaksi</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card
          title="PEMASUKAN"
          amount={totals?.income || 0}
          color="text-[#35A042]"
          loading={loading}
        />
        <Card
          title="PENGELUARAN"
          amount={totals?.expense || 0}
          color="text-[#FF5500]"
          loading={loading}
        />
        <Card
          title="SALDO"
          amount={totals?.net || 0}
          color="text-[#ffffff]"
          loading={loading}
        />
      </div>
      <div>
        <Table
          transactions={transactions}
          loading={loading}
          onRefresh={refreshData}
        />
      </div>
      <AiButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default Transaksi;
