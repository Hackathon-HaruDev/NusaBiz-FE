import { SidebarIcon } from "lucide-react";
import React from "react";

interface props{
    tooglesidebar: () => void;
}

const header:React.FC<props> = ({tooglesidebar}) => {
    return(
        <div className="navbar fixed bg-(--primary) font-karma h-15 px-5">
            <div className="flex flex-row items-center">
                <button onClick={tooglesidebar}>
                    <SidebarIcon size={30} />
                </button>
                <p className="font-bold w-full text-center">NusaBiz</p>
            </div>
        </div>
    )
}

export default header