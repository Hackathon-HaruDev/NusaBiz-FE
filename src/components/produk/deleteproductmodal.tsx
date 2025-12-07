import { X, AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import APICall from "../../functions/callapi";
import type { Product } from "../../types/product";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product: Product | null;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}) => {
  const { showToast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isDeleting) return;
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleDelete = async () => {
    if (!product) return;

    const businessId = localStorage.getItem("business_id");
    if (!businessId) {
      showToast("Business ID tidak ditemukan. Silakan login ulang.", "error");
      return;
    }

    setIsDeleting(true);

    try {
      await APICall(
        `/businesses/${businessId}/products/${product.id}`,
        "DELETE"
      );

      showToast("Produk berhasil dihapus!", "success");

      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: any) {
      showToast(error.message || "Gagal menghapus produk", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#1a2332] w-full max-w-md rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-full">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Hapus Produk</h2>
              <p className="text-sm text-gray-400 mt-1">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <p className="text-red-300 text-sm">
              Anda akan menghapus produk ini secara permanen. Data produk tidak
              dapat dikembalikan setelah dihapus.
            </p>
          </div>

          <div className="bg-[#2C3E50] rounded-lg p-4 flex items-center gap-4">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{product.name}</p>
              <p className="text-gray-400 text-sm">
                Stok: {product.current_stock} | Harga Jual: Rp{" "}
                {product.selling_price?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus Produk"
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="flex-1 bg-transparent border border-gray-600 hover:border-gray-500 disabled:border-gray-700 disabled:text-gray-500 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
