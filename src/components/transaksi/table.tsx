import { useState, useMemo } from "react";
import { Funnel, Search, Download, Plus, Trash2, Pencil } from "lucide-react";
import * as XLSX from "xlsx";
import AddTransactionModal from "./addtransactionmodal";
import FilterModal, { type FilterValues } from "./filtermodal";
import EditTransactionModal from "./edittransactionmodal";
import ConfirmationModal from "../common/ConfirmationModal";
import * as transactionService from "../../services/api/transaction.service";
import {
  formatDate,
  getTransactionTypeLabel,
  getStatusLabel,
  formatTransactionAmount,
  getTransactionTypeBadgeColor,
  getStatusBadgeColor,
  filterTransactionsByQuery,
} from "../../utils/transaction.utils";
import type {
  TransactionType,
  Transaction,
} from "../../types/transaction.types";

interface TableProps {
  transactions: Transaction[];
  loading: boolean;
  onRefresh: () => void;
}

const Table: React.FC<TableProps> = ({
  transactions: rawTransactions,
  loading,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tipeFilter, setTipeFilter] = useState<string>("Tipe Transaksi");
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);

  const transactions = useMemo(() => {
    let filtered = rawTransactions;

    if (tipeFilter !== "Tipe Transaksi") {
      const typeValue: TransactionType =
        tipeFilter === "Pemasukan" ? "Income" : "Expense";
      filtered = filtered.filter((t) => t.type === typeValue);
    }

    if (activeFilters) {
      if (activeFilters.startDate) {
        filtered = filtered.filter(
          (t) => t.transaction_date >= activeFilters.startDate
        );
      }
      if (activeFilters.endDate) {
        filtered = filtered.filter(
          (t) => t.transaction_date.split("T")[0] <= activeFilters.endDate
        );
      }

      if (activeFilters.tipeTransaksi) {
        const typeValue: TransactionType =
          activeFilters.tipeTransaksi === "pemasukan" ? "Income" : "Expense";
        filtered = filtered.filter((t) => t.type === typeValue);
      }

      if (activeFilters.kategori) {
        filtered = filtered.filter((t) =>
          t.category
            ?.toLowerCase()
            .includes(activeFilters.kategori.toLowerCase())
        );
      }

      if (activeFilters.minAmount) {
        const min = parseInt(activeFilters.minAmount.replace(/\./g, ""));
        filtered = filtered.filter((t) => t.amount >= min);
      }
      if (activeFilters.maxAmount) {
        const max = parseInt(activeFilters.maxAmount.replace(/\./g, ""));
        filtered = filtered.filter((t) => t.amount <= max);
      }
    }

    filtered = filterTransactionsByQuery(filtered, searchQuery);

    return filtered;
  }, [rawTransactions, tipeFilter, searchQuery, activeFilters]);

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

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;

    try {
      setIsDeleting(true);

      await Promise.all(
        selectedRows.map((id) => transactionService.deleteTransaction(id))
      );

      setSelectedRows([]);
      setIsDeleteModalOpen(false);

      onRefresh();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportExcel = () => {
    if (transactions.length === 0) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    // Prepare data for Excel
    const excelData = transactions.map((transaction) => ({
      Tanggal: formatDate(transaction.transaction_date),
      "Tipe Transaksi": getTransactionTypeLabel(transaction.type),
      Kategori: transaction.category || "-",
      Jumlah: transaction.amount,
      "Jumlah (Format)": formatTransactionAmount(
        transaction.amount,
        transaction.type
      ),
      Deskripsi: transaction.description || "-",
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Tanggal
      { wch: 15 }, // Tipe Transaksi
      { wch: 20 }, // Kategori
      { wch: 15 }, // Jumlah
      { wch: 20 }, // Jumlah (Format)
      { wch: 40 }, // Deskripsi
    ];
    ws["!cols"] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transaksi");

    // Generate filename with current date
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
    const filename = `Transaksi_${dateStr}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="bg-[#1e293b] rounded-lg shadow-sm border border-gray-700 p-3 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-600 bg-[#0f172a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="px-3 sm:px-4 py-2 text-sm border border-gray-600 bg-[#0f172a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px] sm:min-w-[180px]"
          value={tipeFilter}
          onChange={(e) => setTipeFilter(e.target.value)}
        >
          <option>Tipe Transaksi</option>
          <option>Pemasukan</option>
          <option>Pengeluaran</option>
        </select>

        <button
          className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Funnel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>

        <button
          className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={handleExportExcel}
          title="Download Excel"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </button>

        <button
          className="px-3 sm:px-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-white"
          onClick={() => {
            setIsAddTransactionModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            Tambah Transaksi
          </span>
        </button>

        <button
          disabled={selectedRows.length !== 1}
          onClick={() => {
            const tx = transactions.find((t) => t.id === selectedRows[0]);
            if (tx) {
              setTransactionToEdit(tx);
              setIsEditModalOpen(true);
            }
          }}
          className={`p-2 border rounded-lg transition-colors ${
            selectedRows.length !== 1
              ? "border-gray-600 bg-gray-800 cursor-not-allowed opacity-50"
              : "border-gray-600 hover:bg-blue-900/30 hover:border-blue-500"
          }`}
        >
          <Pencil
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              selectedRows.length !== 1 ? "text-gray-400" : "text-blue-600"
            }`}
          />
        </button>

        <button
          disabled={selectedRows.length === 0}
          onClick={() => setIsDeleteModalOpen(true)}
          className={`p-2 border rounded-lg transition-colors ${
            selectedRows.length === 0
              ? "border-gray-600 bg-gray-800 cursor-not-allowed opacity-50"
              : "border-gray-600 hover:bg-red-900/30 hover:border-red-500"
          }`}
        >
          <Trash2
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              selectedRows.length === 0 ? "text-gray-400" : "text-red-600"
            }`}
          />
        </button>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-500 cursor-pointer"
                  checked={
                    transactions.length > 0 &&
                    selectedRows.length === transactions.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Tanggal
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Tipe Transaksi
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Kategori
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Jumlah
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  <td className="py-3 px-4">
                    <div className="w-4 h-4 bg-gray-600 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-600 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 w-24 bg-gray-600 animate-pulse rounded-full"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-600 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-600 animate-pulse rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-600 animate-pulse rounded"></div>
                  </td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  Tidak ada transaksi
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-500 cursor-pointer"
                      checked={selectedRows.includes(transaction.id)}
                      onChange={() => toggleRowSelection(transaction.id)}
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-200">
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
                  <td className="py-3 px-4 text-sm text-gray-200">
                    {transaction.category || "-"}
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
                  <td className="py-3 px-4 text-sm text-gray-200">
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
        onApply={setActiveFilters}
      />
      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => {
          setIsAddTransactionModalOpen(false);
        }}
        onSuccess={onRefresh}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Transaksi"
        message={`Apakah Anda yakin ingin menghapus ${selectedRows.length} transaksi yang dipilih? Data yang dihapus tidak dapat dikembalikan.`}
        confirmLabel="Hapus Transaksi"
        isLoading={isDeleting}
      />

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTransactionToEdit(null);
        }}
        onSuccess={onRefresh}
        transaction={transactionToEdit}
      />
    </div>
  );
};

export default Table;
