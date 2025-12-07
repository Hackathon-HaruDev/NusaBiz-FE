import { X, Upload, ImagePlus, Trash2, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useToast } from "../../context/ToastContext";
import APICall from "../../functions/callapi";
import type { Product } from "../../types/product";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product: Product | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}) => {
  const { showToast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [namaProduk, setNamaProduk] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [hargaBeli, setHargaBeli] = useState("");
  const [stok, setStok] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form when product changes
  useEffect(() => {
    if (isOpen && product) {
      setIsAnimating(true);
      setNamaProduk(product.name || "");
      setHargaJual(
        product.selling_price
          ? formatRupiah(product.selling_price.toString())
          : ""
      );
      setHargaBeli(
        product.purchase_price
          ? formatRupiah(product.purchase_price.toString())
          : ""
      );
      setStok(product.current_stock?.toString() || "");
      setImagePreview(product.image || null);
      setImageFile(null);
    }
  }, [isOpen, product]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setNamaProduk("");
    setHargaJual("");
    setHargaBeli("");
    setStok("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size > 5 * 1024 * 1024) {
          showToast("Ukuran gambar maksimal 5MB", "error");
          return;
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        showToast("File harus berupa gambar (PNG, JPG, JPEG)", "error");
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleImageChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleImageChange(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatRupiah = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseRupiah = (value: string): number => {
    return parseInt(value.replace(/\./g, ""), 10) || 0;
  };

  const handleHargaChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const formatted = formatRupiah(value);
    setter(formatted);
  };

  const handleSubmit = async () => {
    if (!product) return;

    if (!namaProduk.trim()) {
      showToast("Nama produk wajib diisi", "error");
      return;
    }

    const businessId = localStorage.getItem("business_id");
    if (!businessId) {
      showToast("Business ID tidak ditemukan. Silakan login ulang.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", namaProduk.trim());

      if (hargaBeli) {
        formData.append("purchase_price", parseRupiah(hargaBeli).toString());
      }

      if (hargaJual) {
        formData.append("selling_price", parseRupiah(hargaJual).toString());
      }

      // Note: base_stock update if needed
      if (stok) {
        formData.append("base_stock", stok);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await APICall(
        `/businesses/${businessId}/products/${product.id}`,
        "PUT",
        formData,
        true
      );

      showToast("Produk berhasil diperbarui!", "success");

      if (onSuccess) {
        onSuccess();
      }

      handleClose();
    } catch (error: any) {
      showToast(error.message || "Gagal memperbarui produk", "error");
    } finally {
      setIsSubmitting(false);
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
        className={`bg-[#1a2332] w-full max-w-md rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out max-h-[90vh] ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Edit Produk</h2>
            <p className="text-sm text-gray-400 mt-1">Perbarui data produk</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Upload Foto Produk */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Foto Produk
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                className="hidden"
              />
              {!imagePreview ? (
                <div
                  onClick={handleUploadClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-gray-500 bg-[#2C3E50]/50"
                  }`}
                >
                  <ImagePlus size={40} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400 text-center">
                    <span className="text-blue-400 font-medium">
                      Klik untuk upload
                    </span>{" "}
                    atau drag & drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[#2C3E50]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-colors"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="absolute bottom-2 right-2 p-2 bg-blue-500/80 hover:bg-blue-600 rounded-full transition-colors"
                  >
                    <Upload size={16} className="text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Nama Produk */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Nama Produk <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Masukkan nama produk"
              />
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

            {/* Base Stok */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Base Stok
              </label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                className="w-full bg-[#2C3E50] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 bg-transparent border border-gray-600 hover:border-gray-500 disabled:border-gray-700 disabled:text-gray-500 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
