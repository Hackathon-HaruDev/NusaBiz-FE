/**
 * Product Types
 * Type definitions for product-related data
 */

export type StockStatus = "active" | "inactive" | "low" | "out";

export interface Product {
  id: number;
  business_id: number;
  name: string;
  current_stock: number;
  purchase_price: number | null;
  selling_price: number | null;
  stock_status: StockStatus;
  image: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// API Request DTOs
export interface CreateProductDTO {
  business_id: number;
  name: string;
  current_stock?: number;
  purchase_price?: number;
  selling_price?: number;
  stock_status?: StockStatus;
  image?: string;
}

export interface UpdateProductDTO {
  name?: string;
  current_stock?: number;
  purchase_price?: number;
  selling_price?: number;
  stock_status?: StockStatus;
  image?: string;
}

// API Response Types
export interface ProductListResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Filter Options
export interface ProductFilters {
  status?: StockStatus;
  search?: string;
  limit?: number;
  offset?: number;
}
