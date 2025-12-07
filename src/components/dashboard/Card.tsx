import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import React from "react";
import { formatNumber } from "../../helpers/formatNumber";
import Skeleton from "../skeletonLoading";

interface props {
  title?: "Saldo" | "Omzet";
  current: number;
  past: number;
  loading?: boolean;
}

const Card: React.FC<props> = ({ title, current, past, loading }) => {
  const condition = [
    {
      logo: <TrendingUpIcon />,
      class: "text-[#089E00] gap-2 items-center text-xl",
    },
    {
      logo: <TrendingDownIcon />,
      class: "text-[#C63939] gap-2 items-center text-xl",
    },
  ];
  const difference = current - past;

  const percentage =
    past === 0
      ? current > 0
        ? 100
        : 0
      : Math.round((difference / Math.abs(past)) * 100);

  const isUp = current >= past;
  return (
    <div className="border p-4 border-gray-700 bg-[#1e293b] flex flex-col w-full rounded-lg">
      <span className="flex flex-row justify-between text-3xl mb-2">
        <p className="font-semibold">{title}</p>
        <span
          className={`flex flex-row ${
            isUp ? condition[0].class : condition[1].class
          }`}
        >
          {isUp ? condition[0].logo : condition[1].logo}
          {percentage}%
        </span>
      </span>
      <p className="text-md opacity-75">{`${
        title === "Saldo" ? "Saldo Saat Ini" : "Omzet Hari Ini"
      }`}</p>
      <div className="text-3xl font-semibold mb-3">
        {loading ? <Skeleton h={10} w={100} /> : `Rp ${formatNumber(current)}`}
      </div>
      <p>{title === "Saldo" ? "Bulan Lalu" : "Kemarin"}</p>
      <div className="text-md opacity-75">
        {loading ? <Skeleton h={6} w={100} /> : `Rp ${formatNumber(past)}`}
      </div>
    </div>
  );
};

export default Card;
