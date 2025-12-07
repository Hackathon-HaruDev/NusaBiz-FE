import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  className?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type = "info",
  message,
  className = "",
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return "alert-success bg-green-100 text-green-800 border-green-200";
      case "error":
        return "alert-error alert-soft bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "alert-warning bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
      default:
        return "alert-info bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
      case "error":
        return <XCircle className="w-5 h-5 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div
      role="alert"
      className={`alert ${getAlertStyle()} flex items-center gap-2 p-4 rounded-lg shadow-sm border mb-4 animate-in fade-in slide-in-from-top-2 duration-300 ${className}`}
    >
      {getIcon()}
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Alert;
