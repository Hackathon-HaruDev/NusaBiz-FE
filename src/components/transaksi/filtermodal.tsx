import { X, Filter } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterValues) => void;
}

export interface FilterValues {
  startDate: string;
  endDate: string;
  tipeTransaksi: string;
  kategori: string;
  minAmount: string;
  maxAmount: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    startDate: "",
    endDate: "",
    tipeTransaksi: "",
    kategori: "",
    minAmount: "",
    maxAmount: "",
  });

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
      tipeTransaksi: "",
      kategori: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  const handleApply = () => {
    if (onApply) {
      onApply(filters);
    }
    handleClose();
  };

  const formatRupiah = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (
    value: string,
    field: "minAmount" | "maxAmount"
  ) => {
    const formatted = formatRupiah(value);
    setFilters({ ...filters, [field]: formatted });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#1a2332] w-full max-w-sm rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">Filter</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <div className="space-y-3">
            {/* Periode Tanggal */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Dari Tanggal
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="w-full bg-[#2C3E50] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all scheme-dark"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Sampai Tanggal
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="w-full bg-[#2C3E50] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all scheme-dark"
              />
            </div>

            {/* Tipe Transaksi */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Tipe Transaksi
              </label>
              <select
                value={filters.tipeTransaksi}
                onChange={(e) =>
                  setFilters({ ...filters, tipeTransaksi: e.target.value })
                }
                className="w-full bg-[#2C3E50] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Semua</option>
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Kategori
              </label>
              <input
                type="text"
                list="kategori-filter"
                value={filters.kategori}
                onChange={(e) =>
                  setFilters({ ...filters, kategori: e.target.value })
                }
                className="w-full bg-[#2C3E50] text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Semua kategori"
              />
              <datalist id="kategori-filter">
                <option value="Penjualan Produk" />
                <option value="Biaya Operasional" />
                <option value="Gaji Karyawan" />
                <option value="Lainnya" />
              </datalist>
            </div>

            {/* Range Nominal */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Minimal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  Rp
                </span>
                <input
                  type="text"
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleAmountChange(e.target.value, "minAmount")
                  }
                  className="w-full bg-[#2C3E50] text-white text-sm rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Maksimal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  Rp
                </span>
                <input
                  type="text"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleAmountChange(e.target.value, "maxAmount")
                  }
                  className="w-full bg-[#2C3E50] text-white text-sm rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
