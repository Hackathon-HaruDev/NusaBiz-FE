/**
 * Product Service
 * API service layer for product operations
 */

import api from "./config";
import type {
  Product,
  ProductListResponse,
  ProductFilters,
  CreateProductDTO,
  UpdateProductDTO,
} from "../../types/product.types";

/**
 * Get business ID from localStorage
 * This should be set after user registers their business
 */
const getBusinessId = (): number => {
  const businessId = localStorage.getItem("business_id");
  if (!businessId) {
    throw new Error(
      "Business ID not found. Please complete business setup first."
    );
  }
  return parseInt(businessId, 10);
};

const BUSINESS_ID = () => getBusinessId(); // Dynamic getter

/**
 * Get all products with optional filters
 */
export const getProducts = async (
  filters?: ProductFilters
): Promise<ProductListResponse> => {
  const params = new URLSearchParams();

  if (filters?.status) params.append("status", filters.status);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  const url = `/businesses/${BUSINESS_ID()}/products${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await api.get<{ data: ProductListResponse }>(url);
  return response.data.data;
};

/**
 * Get product by ID
 */
export const getProductById = async (productId: number): Promise<Product> => {
  const response = await api.get<{ data: Product }>(
    `/businesses/${BUSINESS_ID()}/products/${productId}`
  );
  return response.data.data;
};

/**
 * Create a new product
 */
export const createProduct = async (
  data: CreateProductDTO
): Promise<Product> => {
  const response = await api.post<{ data: Product }>(
    `/businesses/${BUSINESS_ID()}/products`,
    data
  );
  return response.data.data;
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  productId: number,
  data: UpdateProductDTO
): Promise<Product> => {
  const response = await api.put<{ data: Product }>(
    `/businesses/${BUSINESS_ID()}/products/${productId}`,
    data
  );
  return response.data.data;
};

/**
 * Delete a product (soft delete)
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`/businesses/${BUSINESS_ID()}/products/${productId}`);
};

/**
 * Get low stock products
 */
export const getLowStockProducts = async (
  threshold: number = 10
): Promise<Product[]> => {
  const response = await api.get<{ data: Product[] }>(
    `/businesses/${BUSINESS_ID()}/products/low-stock?threshold=${threshold}`
  );
  return response.data.data;
};
