export interface Product {
  id: number;
  business_id: number;
  name: string;
  base_stock: number;
  current_stock: number;
  purchase_price: number;
  selling_price: number;
  stock_status: string;
  deskripsi?: string;
  image?: string;
}