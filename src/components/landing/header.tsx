import React from "react";
import { useNavigate } from "react-router-dom";

const header:React.FC = () => {
    const navigate = useNavigate();
    const navigates = [
        "Beranda", "Tentang", "Fitur"
    ]
    const ScrollToItem=(id:string)=>{
        const section = document.getElementById(id);
            if(section){
                section.scrollIntoView({behavior:"smooth"})
            }
    }
    return(
        <div className="fixed w-full p-5 flex flex-row justify-between items-center text-white">
            <p className="text-2xl">NusaBiz</p>
            <span className="flex flex-row justify-around w-[20%]">
                {navigates.map((data)=>(
                    <button className="hover:animate-pulse" onClick={()=>ScrollToItem(data)}>{data}</button>
                ))}
            </span>
            <button className="bg-(--secondary) text-white px-6 p-1 rounded-xl" onClick={()=>navigate("/auth")}>
                Login
            </button>
        </div>
    )
}

export default header