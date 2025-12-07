import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="relative w-full">
            <div className="flex flex-col w-full h-full">
                <div className="z-50 text-white">
                    <Header tooglesidebar={()=>setSidebarOpen(!isSidebarOpen)}/>
                </div>
                <div className="flex flex-row overflow-y-hidden w-full h-full pt-16">
                    <div className="h-full z-40 text-white">
                        <Sidebar isOpen={isSidebarOpen}/>
                    </div>
                    <div className={`w-full h-full overflow-y-auto transition-all duration-300 ${isSidebarOpen && "md:pl-52 pl-0"}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;