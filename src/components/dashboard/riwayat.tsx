import { DollarSignIcon, ShoppingBagIcon } from "lucide-react";
import React from "react";
import { formatNumber } from "../../helpers/formatNumber";

interface props {
  data: any;
}

const Riwayat: React.FC<props> = ({ data }) => {
  return (
    <div className="flex flex-row gap-4 p-5 items-center border-b border-gray-700 cursor-pointer hover:bg-gray-700/30 transition-colors">
      <div
        className={`${
          data.tipe === "Pemasukan" ? "bg-[#3ED750]/35" : "bg-[#D73E3E]/35"
        } p-3 rounded-lg`}
      >
        {data.tipe === "Pemasukan" ? (
          <ShoppingBagIcon className="text-[#35A042]" />
        ) : (
          <DollarSignIcon className="text-[#C63939]" />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <p className="font-semibold">{data.kategori}</p>
          <p
            className={
              data.tipe === "Pemasukan" ? "text-[#35A042]" : "text-[#C63939]"
            }
          >
            Rp {formatNumber(data.nominal)}
          </p>
        </div>
        <p className="text-sm">{data.deskripsi}</p>
        <p className="text-sm opacity-60">{data.waktu}</p>
      </div>
    </div>
  );
};

export default Riwayat;
