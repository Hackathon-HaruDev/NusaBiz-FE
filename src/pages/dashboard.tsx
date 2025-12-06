import { ChevronLeftIcon, ChevronRightIcon, LayoutDashboardIcon } from "lucide-react";
import React from "react";
import Card from "../components/dashboard/Card";
import Riwayat from "../components/dashboard/riwayat";
import AiButton from "../components/aiButton";
import Chart from "react-apexcharts";

const Dashboard:React.FC = () => {
    const data_static = [
    {
        tipe: "Pemasukan",
        kategori: "Penjualan",
        nominal: 250000,
        deskripsi: "Penjualan Produk A",
        waktu: "Hari ini, 09.12"
    },
    {
        tipe: "Pengeluaran",
        kategori: "Operasional",
        nominal: 75000,
        deskripsi: "Beli Kertas Struk",
        waktu: "Hari ini, 08.22"
    },
    ]

const state = {
  options: {
    chart: {
      id: "basic-bar",
    },
    colors: ["#31A3D3"],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: "#e5e5e5",
    },
    tooltip: {
      y: {
        formatter: (val: { toLocaleString: () => any; }) => `Rp ${val.toLocaleString()}`
      }
    },
    xaxis: {
      categories: [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
      ],
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "13px"
        }
      }
    },
    yaxis: {
      labels: {
        style: { colors: "#6b7280" }
      }
    }
  },
  series: [
    {
      name: "Penjualan",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 70, 12, 40, 100]
    }
  ]
};

    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="text-2xl font-bold">Dashboard</p>
            <main className="flex flex-row h-fit w-full">
                <div className="flex flex-col px-3 gap-4 w-full">
                    <div className="flex flex-row gap-4">
                        <Card title="Saldo"/>
                        <Card title="Omzet"/>
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
                              <Chart
                                  options={state.options}
                                  series={state.series}
                                  type="bar"
                                  height={480}
                              />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[30%] border border-[#e5e5e5]" style={{height: 'calc(100vh - 120px)'}}>
                    <p className="w-full text-center p-3 text-2xl border-b border-[#e5e5e5]">Riwayat Transaksi</p>
                    <div className="flex flex-col overflow-y-auto flex-1">
                        {data_static.slice(0, 7).map((data) => (
                            <Riwayat data={data} />
                        ))}
                    </div>
                </div>
            </main>
            <AiButton />
        </div>
    )
}

export default Dashboard;