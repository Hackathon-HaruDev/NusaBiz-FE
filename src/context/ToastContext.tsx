import React, { createContext, useContext, useState, useCallback } from "react";

import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto transform transition-all duration-300 animate-in slide-in-from-right fade-in"
          >
            <div
              className={`
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[300px] max-w-sm
              ${
                toast.type === "success"
                  ? "bg-white border-green-200 text-green-800"
                  : ""
              }
              ${
                toast.type === "error"
                  ? "bg-white border-red-200 text-red-800"
                  : ""
              }
              ${
                toast.type === "warning"
                  ? "bg-white border-yellow-200 text-yellow-800"
                  : ""
              }
              ${
                toast.type === "info"
                  ? "bg-white border-blue-200 text-blue-800"
                  : ""
              }
            `}
            >
              <div className="shrink-0">
                {toast.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                {toast.type === "warning" && (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                {toast.type === "info" && (
                  <Info className="w-5 h-5 text-blue-500" />
                )}
              </div>

              <p className="text-sm font-medium flex-1">{toast.message}</p>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
