import Chart from "react-apexcharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export const MonthlyBalanceSplineChart = ({ series }: { series: any }) => {
  const options = {
    chart: {
      id: "spline-area-chart",
      toolbar: { show: true }
    },

    stroke: {
      curve: "smooth" as const,
      width: 3,
    },

    colors: ["#22C55E", "#EF4444", "#FACC15"],

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      }
    },

    dataLabels: { enabled: false },

    xaxis: {
      categories: months,
      labels: {
        style: { colors: "#6b7280", fontSize: "13px" },
      },
      title: { text: "Bulan", style: { fontWeight: 600 } }
    },

    yaxis: {
      labels: {
        formatter: (val: { toLocaleString: () => any; }) => `Rp ${val.toLocaleString()}`,
        style: { colors: "#6b7280" }
      },
      title: { text: "Jumlah (Rp)" }
    },

    tooltip: {
      y: {
        formatter: (val: { toLocaleString: () => any; }) => `Rp ${val.toLocaleString()}`
      }
    },

    legend: {
      position: "top" as const,
      horizontalAlign: "center" as const
    }
  };

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};
