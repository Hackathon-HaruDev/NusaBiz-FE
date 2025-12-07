/**
 * Cashflow View Component
 */

import { DollarSign, AlertTriangle } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "./AIStates";
import type { useCashflowForecast } from "../../hooks/useAI";

interface CashflowViewProps {
  state: ReturnType<typeof useCashflowForecast>;
  days: number;
  onDaysChange: (days: number) => void;
  onRefresh: () => void;
}

const CashflowView: React.FC<CashflowViewProps> = ({
  state,
  days,
  onDaysChange,
  onRefresh,
}) => {
  if (state.loading) return <LoadingState />;
  if (state.error) return <ErrorState message={state.error} />;
  if (!state.data) return <EmptyState message="Pilih periode forecast" />;

  const { currentBalance, projectedEndBalance, forecast, warnings, summary } =
    state.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <DollarSign size={24} />
          Prediksi Arus Kas
        </h3>
        <select
          value={days}
          onChange={(e) => {
            const newDays = parseInt(e.target.value);
            onDaysChange(newDays);
            onRefresh();
          }}
          className="bg-[#2C3E50] text-white px-3 py-1 rounded-lg text-sm border border-gray-600"
        >
          <option value="7">7 Hari</option>
          <option value="14">14 Hari</option>
          <option value="30">30 Hari</option>
        </select>
      </div>

      {/* Summary */}
      <div className="bg-[#2C3E50] rounded-lg p-4">
        <p className="text-lg text-white font-medium">{summary}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-400 text-sm">Saldo Saat Ini</p>
            <p className="text-white text-xl font-bold">
              Rp {currentBalance.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Proyeksi Akhir</p>
            <p
              className={`text-xl font-bold ${
                projectedEndBalance >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              Rp {projectedEndBalance.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <p className="text-red-300 text-sm">{warnings}</p>
        </div>
      )}

      {/* Forecast Table */}
      <div className="bg-[#2C3E50] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a2332] text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-right">Pemasukan</th>
                <th className="px-4 py-3 text-right">Pengeluaran</th>
                <th className="px-4 py-3 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {forecast.map((day, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-700 ${
                    day.warning ? "bg-red-900/10" : ""
                  }`}
                >
                  <td className="px-4 py-3">{day.date}</td>
                  <td className="px-4 py-3 text-right text-green-400">
                    +Rp {day.projectedIncome.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3 text-right text-red-400">
                    -Rp {day.projectedExpense.toLocaleString("id-ID")}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      day.projectedBalance >= 0 ? "text-white" : "text-red-400"
                    }`}
                  >
                    Rp {day.projectedBalance.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashflowView;
