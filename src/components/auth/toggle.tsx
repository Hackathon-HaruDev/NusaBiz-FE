import React from "react";

type AuthOption = "masuk" | "daftar";

interface AuthToggleProps {
  activeTab: AuthOption;
  onTabChange: (tab: AuthOption) => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ activeTab, onTabChange }) => {
  const getButtonClasses = (tab: AuthOption) => {
    const baseClasses =
      "flex-1 py-2.5 text-center text-sm font-semibold rounded-xl transition duration-150";

    if (activeTab === tab) {
      return `${baseClasses} text-white bg-blue-600 shadow-md`;
    } else {
      return `${baseClasses} text-gray-400 hover:text-gray-200`;
    }
  };

  return (
    <div className="flex p-1.5 bg-[#0f172a] rounded-xl">
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
};

export default AuthToggle;
