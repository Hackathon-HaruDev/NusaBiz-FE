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

const Dashboard:React.FC = () => {
  const { user, activeBusiness, transactions,loading } = useDashboard();
  const omzetToday = getTodayOmzet(transactions);
  const omzetYesterday = getYesterdayOmzet(transactions);
  const lastMonthSaldo = getLastMonthSaldo(transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const saldo = calculateBalanceFromTransactions(transactions);
  const monthlySeries = getMonthlyChartSeries(transactions);
    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="text-2xl font-bold">Dashboard {activeBusiness?.business_name}</p>
            <main className="flex flex-row h-fit w-full">
                <div className="flex flex-col px-3 gap-4 w-full">
                    <div className="flex flex-row gap-4">
                        <Card current={saldo} past={lastMonthSaldo} title="Saldo" loading={loading}/>
                        <Card title="Omzet" current={omzetToday} past={omzetYesterday} loading={loading}/>
                    </div>
                    <div className="border border-[#e5e5e5] flex flex-col h-full p-1">
                        <div className="flex flex-row justify-between ">
                            <p className="text-2xl">Performa Data Penjualan: </p>
                            <span className="flex flex-row items-center gap-2">
                                <ChevronLeftIcon />
                                <p>2025</p>
                                <ChevronRightIcon />
                            </span>
                        </div>
                        <div className="w-full">
                            <div className="w-full p-5">
                                <MonthlyBalanceSplineChart series={monthlySeries} />
                            </div>
                        </div>
                    </div>
                </div>
                <TransactionHistory transactions={transactions} loading={loading} />
              </main>
      <AiButton onClick={() => setIsModalOpen(true)} />
      <AiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
