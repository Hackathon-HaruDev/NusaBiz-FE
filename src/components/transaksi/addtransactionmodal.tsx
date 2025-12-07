import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [total, setTotal] = useState("");

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

  const formatRupiah = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");
    // Format with thousand separator
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleTotalChange = (value: string) => {
    const formatted = formatRupiah(value);
    setTotal(formatted);
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
        className={`bg-[#1a2332] w-full max-w-md rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out max-h-[90vh] ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Tambah Transaksi
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Isi data data transaksi di bawah
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Tanggal */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Tipe Transaksi & Kategori */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Tipe Transaksi
                </label>
                <select className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option value="">Pilih tipe</option>
                  <option value="pemasukan">Pemasukan</option>
                  <option value="pengeluaran">Pengeluaran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  list="kategori-transaksi"
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Pilih kategori"
                />
                <datalist id="kategori-transaksi">
                  <option value="Penjualan Produk" />
                  <option value="Biaya Operasional" />
                  <option value="Gaji Karyawan" />
                  <option value="Lainnya" />
                </datalist>
              </div>
            </div>

            {/* Produk & Jumlah Produk */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Produk
                </label>
                <input
                  type="text"
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Nama produk"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Jumlah Produk
                </label>
                <input
                  type="number"
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Total */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Total</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  Rp
                </span>
                <input
                  type="text"
                  value={total}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="w-full bg-[#2C3E50] text-white rounded-lg pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Deskripsi
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Masukkan deskripsi transaksi (optional)"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
            Simpan
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
