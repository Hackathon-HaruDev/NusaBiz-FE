import React, { useState, useEffect } from "react";
import ProdukCard from "../components/produk/card";
import { PlusIcon } from "lucide-react";
import AiButton from "../components/aiButton";
import DropDown from "../components/dropdown";
import { useProducts } from "../hooks/useProduct";
import { sortProducts } from "../helpers/sortProducts";
import AiModal from "../components/aiModal";
import AddProductModal from "../components/produk/addproductmodal";
import EditProductModal from "../components/produk/editproductmodal";
import DeleteProductModal from "../components/produk/deleteproductmodal";
import type { Product } from "../types/product";

const Produk: React.FC = () => {
  const [businessId, setBusinessId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const storedBusinessId = localStorage.getItem("business_id");
    if (storedBusinessId) {
      setBusinessId(parseInt(storedBusinessId, 10));
    }
  }, []);

  const {
    products,
    loading: productLoading,
    refetch,
  } = useProducts(businessId);

  const [sortby, setSortBy] = useState("stok-terbanyak");
  const sortedProducts = sortProducts(products, sortby);

  // Modal states
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const dropdown = [
    { id: "stok-tertinggi", nama: "Stok Tertinggi" },
    { id: "stok-terendah", nama: "Stok Terendah" },
    { id: "harga-tertinggi", nama: "Harga Tertinggi" },
    { id: "harga-terendah", nama: "Harga Terendah" },
  ];

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
  };

  if (productLoading) {
    return (
      <div className="p-5 flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <p className="text-2xl font-bold">Produk</p>

      <div className="flex flex-row justify-between items-center">
        <DropDown
          title="Urutkan Berdasarkan"
          data={dropdown}
          onChange={setSortBy}
        />
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => setIsAddProductModalOpen(true)}
        >
          <PlusIcon size={20} />
          Tambah Produk
        </button>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <PlusIcon size={40} className="text-gray-400" />
          </div>
          <p className="text-lg font-medium">Belum ada produk</p>
          <p className="text-sm">
            Klik tombol "Tambah Produk" untuk menambahkan produk pertama Anda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((data, index) => (
            <div key={data.id || index}>
              <ProdukCard
                data={data}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSuccess={refetch}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={refetch}
        product={selectedProduct}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteProductModalOpen}
        onClose={handleCloseDeleteModal}
        onSuccess={refetch}
        product={selectedProduct}
      />

      {/* AI Button & Modal */}
      <AiButton onClick={() => setIsAIModalOpen(true)} />
      <AiModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
};

export default Produk;
