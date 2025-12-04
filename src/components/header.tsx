import { SidebarIcon } from "lucide-react";
import React from "react";

interface props{
    tooglesidebar: () => void;
}

const header:React.FC<props> = ({tooglesidebar}) => {
    return(
        <div className="navbar fixed bg-(--primary) h-10 p-0 flex flex-row justify-between pr-5">
            <div className="flex flex-row-reverse items-center justify-between w-52 p-2">
                <button onClick={tooglesidebar}>
                    <SidebarIcon size={25} />
                </button>
                <p className="font-bold w-full text-center text-2xl">NusaBiz</p>
            </div>
            <img src="/images/pfp.png" className="w-8 h-8 rounded-full" />
        </div>
    )
}

export default header