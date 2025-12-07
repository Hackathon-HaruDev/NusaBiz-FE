import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../functions/fetchProducts";

export const useProducts = (businessId?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchProducts(businessId);
        setProducts(result);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [businessId]);

  return { products, loading };
};
