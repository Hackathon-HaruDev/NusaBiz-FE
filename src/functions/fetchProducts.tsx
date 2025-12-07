import type { Product } from "../types/product";

export const fetchProducts = async (businessId: number): Promise<Product[]> => {
  try {
    const token = localStorage.getItem("userToken");

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/businesses/${businessId}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error?.message || "Gagal mengambil produk");
    }

    return result.data.products;
  } catch (err) {
    return [];
  }
};
