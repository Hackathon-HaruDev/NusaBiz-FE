import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout: React.FC = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="relative h-screen w-full overflow-x-auto">
            <div className="flex flex-col w-full h-full">
                <div className="z-50 text-white">
                    <Header tooglesidebar={()=>setSidebarOpen(!isSidebarOpen)}/>
                </div>
                <div className="flex flex-row overflow-y-hidden w-full h-full mt-16">
                    <div className="h-full z-40 text-white">
                        <Sidebar isOpen={isSidebarOpen}/>
                    </div>
                    <div className={`w-full h-full overflow-y-auto transition-all duration-300 ${isSidebarOpen && "ml-52"}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;