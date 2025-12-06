import React from "react";

type AuthOption = "masuk" | "daftar";

interface AuthToggleProps {
    activeTab: AuthOption;
    onTabChange: (tab: AuthOption) => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ activeTab, onTabChange }) => {
    const getButtonClasses = (tab: AuthOption) => {
        const baseClasses = "flex-1 py-2 text-center text-sm font-semibold rounded-xl transition duration-150";
        
        if (activeTab === tab) {
            return `${baseClasses} text-black bg-[#B9B9B9] shadow-md`;
        } else {
            return `${baseClasses} text-gray-500 hover:text-gray-700`;
        }
    };

    return (
        <div className="flex p-2 bg-gray-100 rounded-2xl mb-8">
            <button 
                className={getButtonClasses("masuk")}
                onClick={() => onTabChange("masuk")}
                type="button"
            >
                Masuk
            </button>
            
            <button 
                className={getButtonClasses("daftar")}
                onClick={() => onTabChange("daftar")}
                type="button"
            >
                Daftar
            </button>
        </div>
    );
}

export default AuthToggle;