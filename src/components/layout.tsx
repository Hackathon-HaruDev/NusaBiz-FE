import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="relative h-screen w-full overflow-x-auto bg-white">
            <div className="flex flex-col w-full h-full">
                <div className="z-50">
                    <Header tooglesidebar={()=>setSidebarOpen(!isSidebarOpen)}/>
                </div>
                <div className="flex flex-row w-full h-full mt-15">
                    <div className="h-full z-40">
                        <Sidebar isOpen={isSidebarOpen}/>
                    </div>
                    <div className="w-full h-full overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;