import React, { useEffect, useState } from "react";
import { sidebarItem } from "../constant/sidebarItem";
import { LogOutIcon, UserRoundIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { listed } from "../constant/listed";

interface props {
  isOpen: boolean;
}

const SideBar: React.FC<props> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeStyle = "bg-[#3D4C66] rounded-lg font-bold";

  const [isActive, setIsActive] = useState("Dashboard");

  useEffect(() => {
    const current = location.pathname.split("/")[1];

    if (current.toLowerCase() === "profil") {
      setIsActive("Profil");
      return;
    }

    const found = sidebarItem.find(
      (item) =>
        item.nama.toLowerCase().replace(/ /g, "-") === current.toLowerCase()
    );

    if (found) {
      setIsActive(found.nama);
    } else {
      setIsActive("Dashboard");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userToken");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      localStorage.removeItem("business_id");

      navigate(listed.auth, { replace: true });
    } catch (e) {
      window.location.href = listed.auth;
    }
  };

  return (
    <div
      className={`bg-(--primary) flex flex-col h-[calc(100vh-64px)] font-(--font-karma) text-2xl w-52 p-5 fixed transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-5 text-lg">
          {sidebarItem.map((data, index) => (
            <div
              key={index}
              className={`flex flex-row gap-3 items-center p-2 cursor-pointer ${
                isActive === data.nama && activeStyle
              }`}
              onClick={() => {
                navigate(`/${data.nama.toLowerCase().replace(/ /g, "-")}`);
                setIsActive(data.nama);
              }}
            >
              {data.icon}
              <p>{data.nama}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <div
            className={`flex flex-row gap-3 items-center p-2 cursor-pointer ${
              isActive === "Profil" && activeStyle
            }`}
            onClick={() => {
              navigate(`/profil`);
              setIsActive("Profil");
            }}
          >
            <UserRoundIcon />
            <p>Profil</p>
          </div>

          <div
            className="flex flex-row gap-3 items-center p-2 cursor-pointer hover:bg-red-600/20 hover:text-red-400 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOutIcon />
            <p>Keluar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
