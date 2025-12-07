import React from "react";

interface props {
    title:string
    data:any
    onChange: (value: string) => void;
}

const DropDown:React.FC<props> = ({data, title, onChange}) => {
    return(
        <div className="flex flex-row gap-3 items-center">
            <p className="md:text-2xl font-semibold">{title}</p>
            <select className="bg-(--primary) text-white p-2 rounded-lg" onChange={(e) => onChange?.(e.target.value)}>
                {data.map((item:any)=>(
                    <option key={item.id} value={String(item.id)}>{item.nama}</option>
                ))}
            </select>
        </div>
    )
}

export default DropDown