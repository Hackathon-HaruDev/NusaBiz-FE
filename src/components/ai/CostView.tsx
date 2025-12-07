/**
 * Cost Recommendations View Component
 */

import { DollarSign } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "./AIStates";
import type { useCostRecommendations } from "../../hooks/useAI";

interface CostViewProps {
  state: ReturnType<typeof useCostRecommendations>;
}

const CostView: React.FC<CostViewProps> = ({ state }) => {
  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;
  if (!state.data)
    return <EmptyState message="Klik untuk memuat rekomendasi" />;

  const { recommendations, totalExpense, message } = state.data;

  if (message) {
    return <EmptyState message={message} />;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-900/20 border-red-500/50";
      case "medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-500/50";
      default:
        return "text-blue-400 bg-blue-900/20 border-blue-500/50";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <DollarSign size={24} />
        Rekomendasi Penghematan
      </h3>

      <div className="bg-[#2C3E50] rounded-lg p-4">
        <p className="text-gray-400 text-sm">Total Pengeluaran (30 hari)</p>
        <p className="text-white text-2xl font-bold">
          Rp {totalExpense.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-4 ${getPriorityColor(
              rec.priority
            )}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold">{rec.category}</h4>
              <span className="text-sm font-medium">{rec.percentage}%</span>
            </div>
            <p className="text-sm mb-2">
              Rp {rec.amount.toLocaleString("id-ID")}
            </p>
            <p className="text-sm opacity-90">{rec.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostView;
