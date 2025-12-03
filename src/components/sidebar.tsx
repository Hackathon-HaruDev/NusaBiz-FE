import React, { useEffect, useState } from "react";
import { sidebarItem } from "../constant/sidebarItem";
import { LogOutIcon, SettingsIcon, SidebarIcon } from "lucide-react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// data-aos="fade-right"
interface props{
    isOpen: boolean
}

const SideBar: React.FC<props> = ({isOpen}) => {
return (
    isOpen &&
    <div className={`bg-(--primary) flex flex-col h-[calc(100vh-64px)] font-(--font-karma) text-2xl w-52 p-5 fixed`} >
        <div
            className="flex flex-col h-full justify-between"
        >
            {/* Menu Items */}
            <div className="flex flex-col gap-5 text-lg">
            {sidebarItem.map((data, index) => (
                <div className="flex flex-row gap-3 items-center" key={index}>
                <div className="bg-[var(--secondary)] p-1 rounded-lg text-white">
                    {data.icon}
                </div>
                <p>{data.nama}</p>
                </div>
            ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-3 text-lg">
            <div className="flex flex-row gap-3 items-center">
                <div className="bg-[var(--secondary)] p-1 rounded-lg text-white">
                <SettingsIcon />
                </div>
                <p>Pengaturan</p>
            </div>

            <div className="flex flex-row gap-3 items-center">
                <div className="bg-[var(--secondary)] p-1 rounded-lg text-white">
                <LogOutIcon />
                </div>
                <p>Keluar</p>
            </div>
            </div>
        </div>
    </div>
    
);
};

export default SideBar;