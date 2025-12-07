/**
 * AI Utility Components
 * Loading, Error, and Empty states
 */

import { Loader2, AlertCircle, Package } from "lucide-react";

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <Loader2 className="animate-spin mb-4" size={48} />
    <p>Memuat data...</p>
  </div>
);

export const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-red-400">
    <AlertCircle size={48} className="mb-4" />
    <p className="text-center">{message}</p>
  </div>
);

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <Package size={48} className="mb-4 opacity-50" />
    <p className="text-center">{message}</p>
  </div>
);
