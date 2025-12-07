import React, { useState } from "react";
import ProdukCard from "../components/produk/card";
import { PlusIcon } from "lucide-react";
import AiButton from "../components/aiButton";
import DropDown from "../components/dropdown";
import AiModal from "../components/aiModal";
import AddProductModal from "../components/produk/addproductmodal";

const Produk:React.FC = () => {
const produkList = [
  {
    nama_item: "Bedcover Motif Sakura",
    stok: 15,
    total_stok: 40,
    beli: 200000,
    jual: 270000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ea molestias qui quia veritatis modi sunt tempora perspiciatis, facilis at autem saepe delectus obcaecati vero, iusto dignissimos officia doloribus under"
  }
];

const dropdown = [
  {id:"stok-tertinggi", nama: "Stok Tertinggi"},
  {id:"stok-terendah", nama: "Stok Terendah"},
  {id:"harga-tertinggi", nama: "Harga Tertinggi"},
  {id:"harga-terendah", nama: "Harga Terendah"}
]

const [sortby, setSortBy] = useState("stok-terbanyak");
const [isAIModalOpen, setIsAIModalOpen] = useState(false);
const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    return(
        <div className="p-5 flex flex-col gap-5">
            <p className="text-2xl font-bold">Produk</p>
              <div className="flex flex-row justify-between">
                <DropDown title="Urutkan Berdasrakan" data={dropdown} onChange={setSortBy}/>
                {/* <button onClick={()=>{setIsAddProductModalOpen(true)}} className="flex flex-row gap-1 bg-(--primary) text-white items-center justify-center p-2 rounded-lg hover:scale-105 transition-all">
                  <PlusIcon />
                  <p>Tambah Produk</p>
                </button> */}
                <button className="btn btn-[#192335]" onClick={()=>{setIsAddProductModalOpen(true)}}><PlusIcon/> Tambah Produk</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                  {produkList.map((data, index)=>(
                      <div key={index}>
                          <ProdukCard data={data}/>
                      </div>
                  ))}
              </div>
          <AddProductModal isOpen={isAddProductModalOpen} onClose={()=>{setIsAddProductModalOpen(false)}}/>
          <AiButton onClick={()=>{setIsAIModalOpen(true)}} />
          <AiModal isOpen={isAIModalOpen} onClose={()=>{setIsAIModalOpen(false)}}/>
        </div>
    )
}

export default Produk