import React, { useState } from "react";
import ProdukCard from "../components/produk/card";
import { PlusIcon } from "lucide-react";
import AiButton from "../components/aiButton";
import DropDown from "../components/dropdown";
import { useProducts } from "../hooks/useProduct";
import { sortProducts } from "../helpers/sortProducts";
import AiModal from "../components/aiModal";
import AddProductModal from "../components/produk/addproductmodal";
import { useDashboard } from "../hooks/useDashboard";

const Produk:React.FC = () => {
    const { user, activeBusiness, transactions, loading } = useDashboard();
    const businessId = activeBusiness?.id || 0;
    const { products, loading: productLoading } = useProducts(businessId);
    const [sortby, setSortBy] = useState("stok-terbanyak");
    const sortedProducts = sortProducts(products, sortby);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const dropdown = [
      {id:"stok-tertinggi", nama: "Stok Tertinggi"},
      {id:"stok-terendah", nama: "Stok Terendah"},
      {id:"harga-tertinggi", nama: "Harga Tertinggi"},
      {id:"harga-terendah", nama: "Harga Terendah"}
    ]

    
    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="text-2xl font-bold">Produk</p>
              <div className="flex flex-row justify-between md:scale-100">
                <DropDown title="Urutkan" data={dropdown} onChange={setSortBy}/>
                <button className="btn btn-[#192335] bg-(--primary)" onClick={()=>{setIsAddProductModalOpen(true)}}><PlusIcon/> Tambah Produk</button>
              </div>
              {loading || productLoading ? 
              <p>Loading Data Produk</p> 
              :
              <div className="grid md:grid-cols-3 gap-4">
                  {sortedProducts.map((data, index)=>(
                      <div key={index}>
                          <ProdukCard data={data}/>
                      </div>
                  ))}
              </div>
              }
              
          <AddProductModal isOpen={isAddProductModalOpen} onClose={()=>{setIsAddProductModalOpen(false)}}/>
          <AiButton isLeft onClick={()=>{setIsAIModalOpen(true)}} />
          <AiModal isOpen={isAIModalOpen} onClose={()=>{setIsAIModalOpen(false)}}/>
        </div>
    )
}

export default Produk