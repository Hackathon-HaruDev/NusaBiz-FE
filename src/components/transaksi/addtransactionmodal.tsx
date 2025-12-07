import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api/product.service";
import {
  recordSale,
  createTransaction,
} from "../../services/api/transaction.service";
import Alert, { type AlertType } from "../ui/Alert";
import type { Product } from "../../types/product.types";
import type {
  RecordSaleDTO,
  CreateTransactionDTO,
  TransactionType,
} from "../../types/transaction.types";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Callback to refresh transaction list
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      fetchProducts();
      setDate(new Date().toISOString().split("T")[0]);
      setAlertState(null);
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await getProducts();
      setProducts(response.products);
    } catch (error) {
      setAlertState({
        type: "error",
        message: "Gagal memuat daftar produk. Silakan coba lagi.",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatRupiah = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleTotalChange = (value: string) => {
    const formatted = formatRupiah(value);
    setTotal(formatted);
  };

  const clearForm = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setTotal("");
    setTransactionType("");
    setCategory("");
    setDescription("");
    setSelectedProductId("");
    setQuantity("");
  };

  const validateForm = (): boolean => {
    if (!date) {
      setAlertState({ type: "error", message: "Tanggal harus diisi!" });
      return false;
    }
    if (!transactionType) {
      setAlertState({
        type: "error",
        message: "Tipe transaksi harus dipilih!",
      });
      return false;
    }
    if (!category) {
      setAlertState({ type: "error", message: "Kategori harus diisi!" });
      return false;
    }
    if (!total || parseFloat(total.replace(/\./g, "")) <= 0) {
      setAlertState({
        type: "error",
        message: "Total harus diisi dengan nilai lebih dari 0!",
      });
      return false;
    }

    if (showProductFields) {
      if (!selectedProductId) {
        setAlertState({ type: "error", message: "Produk harus dipilih!" });
        return false;
      }
      if (!quantity || parseInt(quantity) <= 0) {
        setAlertState({ type: "error", message: "Jumlah produk harus diisi!" });
        return false;
      }
      if (parseInt(quantity) > maxQuantity) {
        setAlertState({
          type: "error",
          message: `Jumlah tidak boleh melebihi stok (${maxQuantity})!`,
        });
        return false;
      }
    }

    setAlertState(null);
    return true;
  };

  const submitTransaction = async () => {
    const totalAmount = parseFloat(total.replace(/\./g, ""));

    try {
      if (showProductFields && selectedProductId) {
        const saleData: RecordSaleDTO = {
          products: [
            {
              productId: parseInt(selectedProductId),
              quantity: parseInt(quantity),
              sellingPrice: totalAmount / parseInt(quantity),
            },
          ],
          description: description || undefined,
        };

        await recordSale(saleData);
      } else {
        const typeMapping: { [key: string]: TransactionType } = {
          pemasukan: "Income",
          pengeluaran: "Expense",
        };

        const transactionData: CreateTransactionDTO = {
          type: typeMapping[transactionType.toLowerCase()],
          category: category,
          amount: totalAmount,
          description: description || undefined,
        };

        await createTransaction(transactionData);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await submitTransaction();
      clearForm();
      if (onSuccess) onSuccess();
      setAlertState({
        type: "success",
        message:
          "Transaksi berhasil ditambahkan! Silakan input transaksi berikutnya.",
      });
    } catch (error: any) {
      setAlertState({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Gagal menambahkan transaksi. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await submitTransaction();
      if (onSuccess) onSuccess();
      // For save & close, we might not need to show alert in modal,
      // but maybe invalid input triggered validation error before.
      // Since we close immediately, we can use window.alert just for this final success
      // OR rely on parent/toast.
      // But user asked to use component. Since we close, the component won't be seen.
      // Let's keep it simple: just close. Parent will handle refresh.
      handleClose();
    } catch (error: any) {
      setAlertState({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Gagal menyimpan transaksi. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showProductFields =
    transactionType.toLowerCase() === "pemasukan" &&
    category.toLowerCase() === "penjualan produk";

  const selectedProduct = products.find(
    (p) => p.id.toString() === selectedProductId
  );

  const maxQuantity = selectedProduct?.current_stock || 0;

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
          {alertState && (
            <Alert
              type={alertState.type}
              message={alertState.message}
              onClose={() => setAlertState(null)}
            />
          )}
          <div className="space-y-4">
            {/* Tanggal */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Tipe Transaksi & Kategori */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Tipe Transaksi
                </label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
            {showProductFields && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Produk
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => {
                      setSelectedProductId(e.target.value);
                      setQuantity("");
                    }}
                    className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    disabled={loadingProducts}
                  >
                    <option value="">
                      {loadingProducts ? "Loading..." : "Pilih produk"}
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (Stok: {product.current_stock})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Jumlah Produk
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value <= maxQuantity) {
                        setQuantity(e.target.value);
                      }
                    }}
                    max={maxQuantity}
                    className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder={
                      selectedProductId
                        ? `Max: ${maxQuantity}`
                        : "Pilih produk dulu"
                    }
                    disabled={!selectedProductId}
                  />
                  {selectedProductId &&
                    quantity &&
                    parseInt(quantity) > maxQuantity && (
                      <p className="text-red-400 text-xs mt-1">
                        Jumlah tidak boleh melebihi stok ({maxQuantity})
                      </p>
                    )}
                </div>
              </div>
            )}

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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Masukkan deskripsi transaksi (optional)"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`flex-1 font-medium py-3 rounded-lg transition-colors ${
              isSubmitting
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className={`flex-1 font-medium py-3 rounded-lg transition-colors ${
              isSubmitting
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
            }`}
          >
            {isSubmitting ? "Menyimpan..." : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
