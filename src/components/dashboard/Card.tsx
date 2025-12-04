import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import React from "react";

interface props{
    data?: any
    title?: "Saldo" | "Omzet"

}

const Card:React.FC = () =>{
    const data_static = {
        IsUp: true,
        percentage: 20,
        saldo: 45000,
        last_month: 30000
    }
    const condition = [
        {
            logo: <TrendingUpIcon />,
            class: "text-[#089E00] gap-2 items-center text-xl"
        },
        {
            logo: <TrendingDownIcon/>,
            class: "text-[#C63939] gap-2 items-center text-xl"
        }
    ]
    return(
        <div className="border p-4 border-[#e5e5e5] flex flex-col w-full rounded-lg">
            <span className="flex flex-row justify-between text-3xl mb-2">
                <p className="font-semibold">Saldo</p>
                <span className={`flex flex-row ${data_static.IsUp ? condition[0].class : condition[1].class}`}>
                    {data_static.IsUp ? condition[0].logo : condition[1].logo}
                    {data_static.percentage}%
                </span>
            </span>
            <p className="text-md opacity-75">Saldo Saat Ini</p>
            <p className="text-3xl font-semibold mb-3">{`Rp ${data_static.saldo}`}</p>
            <p>Bulan Lalu</p>
            <p className="text-md opacity-75">{`Rp ${data_static.last_month}`}</p>
        </div>
    )
}

export default Card