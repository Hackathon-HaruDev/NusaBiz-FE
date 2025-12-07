import type { Product } from "../types/product";

export const sortProducts = (products: Product[], sortBy: string) => {
const sorted = [...products];

switch (sortBy) {
case "stok-tertinggi":
return sorted.sort((a, b) => b.current_stock - a.current_stock);

case "stok-terendah":
  return sorted.sort((a, b) => a.current_stock - b.current_stock);

case "harga-tertinggi":
  return sorted.sort((a, b) => (b.selling_price ?? 0) - (a.selling_price ?? 0));

case "harga-terendah":
  return sorted.sort((a, b) => (a.selling_price ?? 0) - (b.selling_price ?? 0));

default:
  return sorted;


}
};