import { SquarePenIcon, Trash2Icon, Plus, Minus } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { formatNumber } from "../../helpers/formatNumber";
import { useToast } from "../../context/ToastContext";
import APICall from "../../functions/callapi";
import type { Product } from "../../types/product";

interface ProdukCardProps {
  data: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProdukCard: React.FC<ProdukCardProps> = ({ data, onEdit, onDelete }) => {
  const { showToast } = useToast();
  const [currentStock, setCurrentStock] = useState(data.current_stock);
  const [inputValue, setInputValue] = useState(data.current_stock.toString());
  const [isEditing, setIsEditing] = useState(false);

  // Track the original stock and pending changes for debouncing
  const originalStockRef = useRef(data.current_stock);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const baseStock = data.base_stock || 100;
  const percentage = Math.min((currentStock / baseStock) * 100, 100);

  // Sync input value when currentStock changes
  useEffect(() => {
    if (!isEditing) {
      setInputValue(currentStock.toString());
    }
  }, [currentStock, isEditing]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const getStockBarColor = () => {
    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(data);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(data);
    }
  };

  // Debounced API call
  const sendStockUpdate = useCallback(
    async (newStock: number) => {
      const businessId = localStorage.getItem("business_id");
      if (!businessId) {
        showToast("Business ID tidak ditemukan", "error");
        return;
      }

      const change = newStock - originalStockRef.current;
      if (change === 0) return;

      try {
        await APICall(
          `/businesses/${businessId}/products/${data.id}/stock`,
          "PATCH",
          { quantityChange: change }
        );
        // Update original stock ref on success
        originalStockRef.current = newStock;
      } catch (error: any) {
        // Rollback on error
        setCurrentStock(originalStockRef.current);
        setInputValue(originalStockRef.current.toString());
        showToast(error.message || "Gagal mengubah stok", "error");
      }
    },
    [data.id, showToast]
  );

  // Update stock with debouncing
  const updateStockWithDebounce = useCallback(
    (newStock: number) => {
      // Clamp to valid range
      const clampedStock = Math.max(0, Math.min(newStock, baseStock));

      // Optimistic update immediately
      setCurrentStock(clampedStock);
      setInputValue(clampedStock.toString());

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer to send API call after 500ms of no changes
      debounceTimerRef.current = setTimeout(() => {
        sendStockUpdate(clampedStock);
      }, 500);
    },
    [baseStock, sendStockUpdate]
  );

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStock = Math.min(currentStock + 1, baseStock);
    updateStockWithDebounce(newStock);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStock = Math.max(currentStock - 1, 0);
    updateStockWithDebounce(newStock);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputFocus = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);

    let newStock = parseInt(inputValue, 10);

    if (isNaN(newStock) || inputValue === "") {
      setInputValue(currentStock.toString());
      return;
    }

    newStock = Math.max(0, Math.min(newStock, baseStock));

    if (newStock !== currentStock) {
      updateStockWithDebounce(newStock);
    } else {
      setInputValue(newStock.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setInputValue(currentStock.toString());
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  const getStockStatus = () => {
    if (currentStock === 0) return "out";
    if (currentStock < 10) return "low";
    return "active";
  };

  const stockStatus = getStockStatus();

  return (
    <div className="flex flex-col gap-3 p-5 border border-gray-700 rounded-lg hover:shadow-lg transition-all bg-[#1e293b]">
      <div className="flex flex-row gap-3">
        <img
          src={data.image || "/placeholder-product.png"}
          alt={data.name}
          className="w-16 h-16 object-cover rounded-lg shrink-0 bg-gray-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/64x64?text=No+Image";
          }}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-medium text-white truncate">{data.name}</p>
          <p className="text-sm text-gray-400">Maks: {baseStock} Stock</p>

          <div className="bg-gray-600 w-full h-2 rounded mt-1">
            <div
              className={`h-full ${getStockBarColor()} rounded transition-all duration-200`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stock Adjustment Controls */}
      <div className="flex items-center justify-center gap-3 py-2 bg-[#0f172a] rounded-lg">
        <button
          onClick={handleDecrement}
          disabled={currentStock === 0}
          className="p-2.5 bg-red-900/30 hover:bg-red-900/50 active:bg-red-900/70 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors select-none"
          title="Kurangi Stok"
        >
          <Minus
            size={20}
            className={currentStock === 0 ? "text-gray-400" : "text-red-600"}
          />
        </button>

        <div className="flex flex-col items-center">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="w-16 text-center text-2xl font-bold text-white bg-transparent border-b-2 border-transparent hover:border-gray-500 focus:border-blue-500 focus:outline-none transition-colors tabular-nums"
          />
          <span className="text-xs text-gray-400">stok saat ini</span>
        </div>

        <button
          onClick={handleIncrement}
          disabled={currentStock >= baseStock}
          className="p-2.5 bg-green-900/30 hover:bg-green-900/50 active:bg-green-900/70 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors select-none"
          title="Tambah Stok"
        >
          <Plus
            size={20}
            className={
              currentStock >= baseStock ? "text-gray-400" : "text-green-600"
            }
          />
        </button>
      </div>

      <div className="flex flex-row justify-between text-sm">
        <div>
          <p className="text-gray-400">Harga Beli:</p>
          <p className="font-medium text-gray-200">
            Rp. {formatNumber(data.purchase_price || 0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Harga Jual:</p>
          <p className="font-medium text-gray-200">
            Rp. {formatNumber(data.selling_price || 0)}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center justify-between pt-2 border-t border-gray-700">
        <div className="flex-1">
          <span
            className={`text-xs px-2 py-1 rounded-full transition-colors ${
              stockStatus === "active"
                ? "bg-green-900/30 text-green-400"
                : stockStatus === "low"
                ? "bg-yellow-900/30 text-yellow-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {stockStatus === "active"
              ? "Tersedia"
              : stockStatus === "low"
              ? "Stok Rendah"
              : "Habis"}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleEditClick}
            className="p-2 hover:bg-blue-900/30 rounded-lg transition-colors group"
            title="Edit Produk"
          >
            <SquarePenIcon
              size={18}
              className="text-gray-400 group-hover:text-blue-400"
            />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 hover:bg-red-900/30 rounded-lg transition-colors group"
            title="Hapus Produk"
          >
            <Trash2Icon
              size={18}
              className="text-gray-400 group-hover:text-red-400"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdukCard;
