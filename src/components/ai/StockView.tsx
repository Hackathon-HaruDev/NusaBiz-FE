/**
 * Stock Forecast View Component
 */

import { Package } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "./AIStates";
import type { useStockForecast } from "../../hooks/useAI";

interface StockViewProps {
  state: ReturnType<typeof useStockForecast>;
}

const StockView: React.FC<StockViewProps> = ({ state }) => {
  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;
  if (!state.data) return <EmptyState message="Klik untuk memuat forecast" />;

  const { forecasts, message } = state.data;

  if (message) {
    return <EmptyState message={message} />;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-red-500/50 bg-red-900/10";
      case "soon":
        return "border-yellow-500/50 bg-yellow-900/10";
      default:
        return "border-green-500/50 bg-green-900/10";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "🔴 Urgent";
      case "soon":
        return "🟡 Segera";
      default:
        return "🟢 Normal";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Package size={24} />
        Prediksi Stok Produk
      </h3>

      <div className="space-y-3">
        {forecasts.map((forecast, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 ${getPriorityColor(
              forecast.priority
            )}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-white">
                {forecast.productName}
              </h4>
              <span className="text-sm font-medium text-gray-300">
                {getPriorityLabel(forecast.priority)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400">Stok Saat Ini</p>
                <p className="text-white font-medium">
                  {forecast.currentStock} unit
                </p>
              </div>
              <div>
                <p className="text-gray-400">Penjualan/Hari</p>
                <p className="text-white font-medium">
                  ~{forecast.estimatedDailySales} unit
                </p>
              </div>
              <div>
                <p className="text-gray-400">Habis Dalam</p>
                <p className="text-white font-medium">
                  {forecast.daysUntilEmpty} hari
                </p>
              </div>
              <div>
                <p className="text-gray-400">Tanggal Habis</p>
                <p className="text-white font-medium">
                  {forecast.estimatedEmptyDate}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-600">
              <p className="text-sm text-gray-400">Rekomendasi Restock</p>
              <p className="text-white font-medium">
                {forecast.recommendedRestockQuantity} unit (supply 30 hari)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockView;
