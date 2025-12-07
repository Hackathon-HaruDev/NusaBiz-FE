import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hargaJual, setHargaJual] = useState("");
  const [hargaBeli, setHargaBeli] = useState("");

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

  const handleHargaChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const formatted = formatRupiah(value);
    setter(formatted);
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
            <h2 className="text-xl font-semibold text-white">Tambah Produk</h2>
            <p className="text-sm text-gray-400 mt-1">
              Isi data data produk di bawah
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
            {/* Nama Produk */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Masukkan nama produk"
              />
            </div>

            {/* Kategori - Input with Datalist */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Kategori
              </label>
              <input
                type="text"
                list="kategori-options"
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Pilih atau ketik kategori"
              />
              <datalist id="kategori-options">
                <option value="Makanan" />
                <option value="Minuman" />
                <option value="Elektronik" />
                <option value="Fashion" />
                <option value="Lainnya" />
              </datalist>
            </div>

            {/* Harga Jual & Harga Beli */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Harga Jual
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={hargaJual}
                    onChange={(e) =>
                      handleHargaChange(e.target.value, setHargaJual)
                    }
                    className="w-full bg-[#2C3E50] text-white rounded-lg pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Harga Beli
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={hargaBeli}
                    onChange={(e) =>
                      handleHargaChange(e.target.value, setHargaBeli)
                    }
                    className="w-full bg-[#2C3E50] text-white rounded-lg pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Stok */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Stok</label>
              <input
                type="number"
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Deskripsi
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Masukkan deskripsi produk (optional)"
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
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
