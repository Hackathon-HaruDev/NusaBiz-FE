import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import Card from "../components/dashboard/Card";

const Dashboard:React.FC = () => {
    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="flex flex-row gap-5 text-2xl font-bold">Dashboard</p>
            <main className="flex flex-row h-screen w-full">
                <div className="flex flex-col px-3 gap-4 w-full">
                    <div className="flex flex-row gap-4">
                        <Card />
                        <Card />
                    </div>
                    <div className="border border-[#e5e5e5] h-screen">
                        Chart
                    </div>
                </div>
                <div className="flex w-[30%] border border-[#e5e5e5]">
                    Riwayat transaksi
                </div>
            </main>

        </div>
    )
}

export default Dashboard;