import Chart from "react-apexcharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const MonthlyBalanceSplineChart = ({ series }: { series: any }) => {
  const options = {
    chart: {
      id: "spline-area-chart",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: "transparent",
    },

    theme: {
      mode: "dark" as const,
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
      },
    },

    dataLabels: { enabled: false },

    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
    },

    xaxis: {
      categories: months,
      labels: {
        style: { colors: "#9CA3AF", fontSize: "13px" },
      },
      axisBorder: {
        color: "#374151",
      },
      axisTicks: {
        color: "#374151",
      },
    },

    yaxis: {
      labels: {
        formatter: (val: { toLocaleString: () => any }) =>
          `Rp ${val.toLocaleString()}`,
        style: { colors: "#9CA3AF" },
      },
    },

    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val: { toLocaleString: () => any }) =>
          `Rp ${val.toLocaleString()}`,
      },
    },

    legend: {
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      labels: {
        colors: "#ffffff",
      },
    },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
};
