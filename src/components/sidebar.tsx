import React, { act, useEffect, useState } from "react";
import { sidebarItem } from "../constant/sidebarItem";
import { LogOutIcon, SettingsIcon, UserRoundIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface props{
    isOpen: boolean
}

const SideBar: React.FC<props> = ({isOpen}) => {
const navigate = useNavigate()
const active = "bg-[#3D4C66]  rounded-lg font-bold"
const [isActive, setIsActive] = useState("Dashboard");
return (
    <div className={`bg-(--primary) flex flex-col h-[calc(100vh-64px)] font-(--font-karma) text-2xl w-52 p-5 fixed transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
        <div
            className="flex flex-col h-full justify-between"
        >
            {/* Menu Items */}
            <div className="flex flex-col gap-5 text-lg">
            {sidebarItem.map((data, index) => (
                <div className={`flex flex-row gap-3 items-center p-2 cursor-pointer ${isActive === data.nama && active}`} key={index} onClick={()=>{navigate(`/${data.nama}`), setIsActive(data.nama)}}>
                    {data.icon}
                    <p>{data.nama}</p>
                </div>
            ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-3 text-lg">
            <div className={`flex flex-row gap-3 items-center p-2 cursor-pointer ${isActive === "Profil" && active}`} onClick={()=>{navigate(`/Profil`), setIsActive("Profil")}}>
                <UserRoundIcon />
                <p>Profil</p>
            </div>

            <div className="flex flex-row gap-3 items-center p-2 cursor-pointer">
                <LogOutIcon />
                <p>Keluar</p>
            </div>
            </div>
        </div>
    </div>
    
);
};

export default SideBar;