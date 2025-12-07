import { useCallback, useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../functions/fetchProducts";

export const useProducts = (businessId?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!businessId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await fetchProducts(businessId);
      setProducts(result);
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(() => {
    load();
  }, [load]);

  return { products, loading, refetch };
};
