/**
 * Insights View Component
 */

import { TrendingUp, TrendingDown, Package } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "./AIStates";
import type { useBusinessInsights } from "../../hooks/useAI";

interface InsightsViewProps {
  state: ReturnType<typeof useBusinessInsights>;
}

const InsightsView: React.FC<InsightsViewProps> = ({ state }) => {
  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;
  if (!state.data) return <EmptyState message="Klik untuk memuat insights" />;

  const { categoryInsights, productInsights, marginInsights } = state.data;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <TrendingUp size={24} />
        Analisis Bisnis Otomatis
      </h3>

      {/* Category Insights */}
      {categoryInsights.length > 0 && (
        <div className="bg-[#2C3E50] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">
            Tren Kategori
          </h4>
          <div className="space-y-2">
            {categoryInsights.map((insight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-gray-300 text-sm"
              >
                <TrendingUp
                  className="text-yellow-400 shrink-0 mt-0.5"
                  size={16}
                />
                <p>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Margin Insights */}
      <div className="bg-[#2C3E50] rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Margin Laba</h4>
        <div className="flex items-start gap-3 text-gray-300 text-sm">
          {marginInsights.change < 0 ? (
            <TrendingDown className="text-red-400 shrink-0 mt-0.5" size={16} />
          ) : (
            <TrendingUp className="text-green-400 shrink-0 mt-0.5" size={16} />
          )}
          <div>
            <p className="font-medium">
              Margin saat ini: {marginInsights.currentMargin}%
            </p>
            <p className="mt-1">{marginInsights.message}</p>
          </div>
        </div>
      </div>

      {/* Product Insights */}
      {productInsights.length > 0 && (
        <div className="bg-[#2C3E50] rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">
            Kontribusi Produk
          </h4>
          <div className="space-y-2">
            {productInsights.map((insight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 text-gray-300 text-sm"
              >
                <Package className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <p>{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsView;
