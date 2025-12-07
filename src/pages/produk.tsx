import React, { useState } from "react";
import ProdukCard from "../components/produk/card";
import { PlusIcon } from "lucide-react";
import AiButton from "../components/aiButton";
import DropDown from "../components/dropdown";
import { useProducts } from "../hooks/useProduct";
import { useDashboardContext } from "../context/DashboardProvider";
import { sortProducts } from "../helpers/sortProducts";

const Produk:React.FC = () => {
    const { activeBusiness, loading: dashboardLoading } = useDashboardContext();
    const businessId = activeBusiness?.id || 0;
    const { products, loading: productLoading } = useProducts(businessId);
    const [sortby, setSortBy] = useState("stok-terbanyak");
    const sortedProducts = sortProducts(products, sortby);

    const dropdown = [
      {id:"stok-tertinggi", nama: "Stok Tertinggi"},
      {id:"stok-terendah", nama: "Stok Terendah"},
      {id:"harga-tertinggi", nama: "Harga Tertinggi"},
      {id:"harga-terendah", nama: "Harga Terendah"}
    ]

    if (dashboardLoading || productLoading) {
      return <p className="p-5">Loading produk...</p>;
    }
    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="text-2xl font-bold">Produk</p>
              <div className="flex flex-row justify-between">
                <DropDown title="Urutkan Berdasrakan" data={dropdown} onChange={setSortBy}/>
                <button className="flex flex-row gap-1 bg-(--primary) text-white items-center justify-center p-2 rounded-lg hover:scale-105 transition-all">
                  <PlusIcon />
                  <p>Tambah Produk</p>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                  {sortedProducts.map((data, index)=>(
                      <div key={index}>
                          <ProdukCard data={data}/>
                      </div>
                  ))}
              </div>
          <AiButton />
        </div>
    )
}

export default Produk