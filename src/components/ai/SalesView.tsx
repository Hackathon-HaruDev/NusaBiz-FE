/**
 * Sales Recommendations View Component
 */

import { ShoppingCart, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "./AIStates";
import type { useSalesRecommendations } from "../../hooks/useAI";

interface SalesViewProps {
  state: ReturnType<typeof useSalesRecommendations>;
}

const SalesView: React.FC<SalesViewProps> = ({ state }) => {
  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;
  if (!state.data)
    return <EmptyState message="Klik untuk memuat rekomendasi" />;

  const { recommendations, message } = state.data;

  if (message) {
    return <EmptyState message={message} />;
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "stock_warning":
        return <AlertTriangle size={20} className="text-red-400" />;
      case "promotion_opportunity":
        return <TrendingUp size={20} className="text-green-400" />;
      case "slow_moving":
        return <Package size={20} className="text-yellow-400" />;
      default:
        return <ShoppingCart size={20} className="text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/50 bg-red-900/10";
      case "medium":
        return "border-yellow-500/50 bg-yellow-900/10";
      default:
        return "border-blue-500/50 bg-blue-900/10";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <ShoppingCart size={24} />
        Rekomendasi Penjualan
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 ${getPriorityColor(
              rec.priority
            )}`}
          >
            <div className="flex items-start gap-3">
              {getTypeIcon(rec.type)}
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">
                  {rec.productName}
                </h4>
                {rec.currentStock !== undefined && (
                  <p className="text-sm text-gray-400 mb-2">
                    Stok: {rec.currentStock}
                  </p>
                )}
                {rec.margin !== undefined && (
                  <p className="text-sm text-gray-400 mb-2">
                    Margin: {rec.margin}%
                  </p>
                )}
                <p className="text-sm text-gray-300">{rec.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesView;
