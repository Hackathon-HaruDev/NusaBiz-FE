import { useState, useMemo } from "react";
import { Funnel, Search, Download, Plus, Trash2, Pencil } from "lucide-react";
import AddTransactionModal from "./addtransactionmodal";
import FilterModal from "./filtermodal";
import { useTransactions } from "../../hooks/useTransactions";
import {
  formatDate,
  getTransactionTypeLabel,
  getStatusLabel,
  formatTransactionAmount,
  getTransactionTypeBadgeColor,
  getStatusBadgeColor,
  filterTransactionsByQuery,
} from "../../utils/transaction.utils";
import type { TransactionType } from "../../types/transaction.types";

const Table: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tipeFilter, setTipeFilter] = useState<string>("Tipe Transaksi");
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Fetch transactions from backend
  const { transactions: rawTransactions, loading } = useTransactions();

  // Filter transactions based on search and type filter
  const transactions = useMemo(() => {
    let filtered = rawTransactions;

    // Apply type filter
    if (tipeFilter !== "Tipe Transaksi") {
      const typeValue: TransactionType =
        tipeFilter === "Pemasukan" ? "Income" : "Expense";
      filtered = filtered.filter((t) => t.type === typeValue);
    }

    // Apply search filter
    filtered = filterTransactionsByQuery(filtered, searchQuery);

    return filtered;
  }, [rawTransactions, tipeFilter, searchQuery]);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === transactions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(transactions.map((t) => t.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-6">
      {/* Search and Actions Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          className="px-3 sm:px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px] sm:min-w-[180px]"
          value={tipeFilter}
          onChange={(e) => setTipeFilter(e.target.value)}
        >
          <option>Tipe Transaksi</option>
          <option>Pemasukan</option>
          <option>Pengeluaran</option>
        </select>

        {/* Filter Icon Button */}
        <button
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Funnel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* Download Button */}
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* Add Transaction Button */}
        <button
          className="px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          onClick={() => {
            setIsAddTransactionModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            Tambah Transaksi
          </span>
        </button>

        {/* Edit Button */}
        <button
          disabled={selectedRows.length === 0}
          className={`p-2 border rounded-lg transition-colors ${
            selectedRows.length === 0
              ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
              : "border-gray-200 hover:bg-blue-50 hover:border-blue-300"
          }`}
        >
          <Pencil
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              selectedRows.length === 0 ? "text-gray-400" : "text-blue-600"
            }`}
          />
        </button>

        {/* Delete Button */}
        <button
          disabled={selectedRows.length === 0}
          className={`p-2 border rounded-lg transition-colors ${
            selectedRows.length === 0
              ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
              : "border-gray-200 hover:bg-red-50 hover:border-red-300"
          }`}
        >
          <Trash2
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              selectedRows.length === 0 ? "text-gray-400" : "text-red-600"
            }`}
          />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  checked={selectedRows.length === transactions.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Tanggal
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Tipe Transaksi
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Kategori
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Jumlah
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  </td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  Tidak ada transaksi
                </td>
              </tr>
            ) : (
              // Transaction rows
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      checked={selectedRows.includes(transaction.id)}
                      onChange={() => toggleRowSelection(transaction.id)}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {formatDate(transaction.transaction_date)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTransactionTypeBadgeColor(
                        transaction.type
                      )}`}
                    >
                      {getTransactionTypeLabel(transaction.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.category || "-"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        transaction.status
                      )}`}
                    >
                      {getStatusLabel(transaction.status)}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 text-sm font-medium ${
                      transaction.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatTransactionAmount(
                      transaction.amount,
                      transaction.type
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.description || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => {
          setIsFilterModalOpen(false);
        }}
      />
      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => {
          setIsAddTransactionModalOpen(false);
        }}
      />
    </div>
  );
};

export default Table;
