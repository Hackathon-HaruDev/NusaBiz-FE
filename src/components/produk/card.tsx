import { SquarePenIcon, Trash2Icon } from "lucide-react";
import React from "react";

interface props{
    data: any
}

const ProdukCard:React.FC<props> = ({data}) => {
    const percentage = (data.stok / data.total_stok) * 100
    return(
        <div className="flex flex-col gap-2 p-5 border border-[#e5e5e5] rounded-lg hover:scale-102 transition-all cursor-pointer">
            <div className="flex flex-row gap-3">
                <img
                    src="/images/pfp.png"
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                />

                <div className="flex flex-col flex-1">
                    <p>{data.nama_item}</p>
                    <p>{data.stok}/{data.total_stok} Stock</p>

                    <div className="bg-white border w-full h-2 rounded">
                        <div
                            className="h-full bg-(--secondary) rounded"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div>
                    <p>Harga Beli: </p>
                    <p>Rp. {data.beli}</p>
                </div>
                <div>
                    <p>Harga Jual: </p>
                    <p>Rp. {data.jual}</p>
                </div>
            </div>
            <div className="flex flex-row gap-3 items-end justify-between">
                <p className="w-full line-clamp-4">{data.desc}</p>
                <div className="flex flex-1 flex-row gap-2">
                    <button><SquarePenIcon/></button>
                    <button><Trash2Icon className="text-red-500"/></button>
                </div>
            </div>
        </div>
    )
}

export default ProdukCard