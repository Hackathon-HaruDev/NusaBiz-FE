import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import Card from "../components/dashboard/Card";
import AiButton from "../components/aiButton";
import { useDashboard } from "../hooks/useDashboard";
import { TransactionHistory } from "../components/dashboard/TransactionHistory";
import { getTodayOmzet, getYesterdayOmzet } from "../helpers/Omzet";
import { getLastMonthSaldo } from "../helpers/lastMonthSaldo";
import AiModal from "../components/aiModal";
import { calculateBalanceFromTransactions } from "../helpers/saldoCounter";
import { getMonthlyChartSeries } from "../helpers/monthlyChartData";
import { MonthlyBalanceSplineChart } from "../components/dashboard/MonthlyBalanceChart";

const Dashboard: React.FC = () => {
  const { user, activeBusiness, transactions, loading } = useDashboard();
  const omzetToday = getTodayOmzet(transactions);
  const omzetYesterday = getYesterdayOmzet(transactions);
  const lastMonthSaldo = getLastMonthSaldo(transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const saldo = calculateBalanceFromTransactions(transactions);
  const [year, setYear] = useState(new Date().getFullYear());
  const monthlySeries = getMonthlyChartSeries(transactions, year);
  return (
    <div className="p-5 flex flex-col gap-5">
      <p className="text-2xl font-bold">
        Dashboard {activeBusiness?.business_name}
      </p>
      <main className="flex md:flex-row flex-col h-fit w-full md:gap-0 gap-4">
        <div className="flex flex-col px-3 gap-4 md:w-3/4">
          <div className="flex md:flex-row flex-col gap-4">
            <Card
              current={saldo}
              past={lastMonthSaldo}
              title="Saldo"
              loading={loading}
            />
            <Card
              title="Omzet"
              current={omzetToday}
              past={omzetYesterday}
              loading={loading}
            />
          </div>
          <div className="border border-gray-700 bg-[#1e293b] flex flex-col h-full p-2 rounded-lg">
            <div className="flex flex-row justify-between p-5">
              <p className="text-2xl">Performa Data Penjualan: </p>
              <span className="flex flex-row items-center gap-2">
                <ChevronLeftIcon onClick={() => setYear(year - 1)} />
                <p>{year}</p>
                <ChevronRightIcon onClick={() => setYear(year + 1)} />
              </span>
            </div>
            <div className="w-full">
              <div className="w-full p-5">
                <MonthlyBalanceSplineChart series={monthlySeries} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 flex-1 w-full">
          <TransactionHistory transactions={transactions} loading={loading} />
        </div>
      </main>
      <AiButton onClick={() => setIsModalOpen(true)} />
      <AiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
