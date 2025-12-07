import AiButton from "../components/aiButton";
import AiModal from "../components/aiModal";
import Card from "../components/transaksi/card";
import Table from "../components/transaksi/table";
import { useState } from "react";
const Transaksi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-3 sm:p-5 flex flex-col gap-4 sm:gap-5">
      <p className="font-bold text-2xl sm:text-3xl md:text-4xl">Transaksi</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card title="PEMASUKAN" amount="100.000" color="text-[#35A042]" />
        <Card title="PENGELUARAN" amount="100.000" color="text-[#FF5500]" />
        <Card title="SALDO" amount="100.000" color="text-[#000000]" />
      </div>
      <div>
        <Table />
      </div>
      <AiButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
export default Transaksi;
