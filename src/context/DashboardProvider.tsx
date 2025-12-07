import { createContext, useContext, type ReactNode } from "react";
import { useDashboard } from "../hooks/useDashboard";

const DashboardContext = createContext(null as any);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const dashboard = useDashboard();
  return (
    <DashboardContext.Provider value={dashboard}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);