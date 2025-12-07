/**
 * Transaction Service
 * API service layer for transaction operations
 */

import api from "./config";
import type {
  Transaction,
  TransactionWithDetails,
  CreateTransactionDTO,
  UpdateTransactionDTO,
  RecordSaleDTO,
  RecordPurchaseDTO,
  TransactionTotals,
  TransactionListResponse,
  TransactionFilters,
} from "../../types/transaction.types";

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
 * Get all transactions with optional filters
 */
export const getTransactions = async (
  filters?: TransactionFilters
): Promise<TransactionListResponse> => {
  const params = new URLSearchParams();

  if (filters?.type) params.append("type", filters.type);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  const url = `/businesses/${BUSINESS_ID()}/transactions${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await api.get<{ data: TransactionListResponse }>(url);
  return response.data.data;
};

/**
 * Get transaction by ID with details
 */
export const getTransactionById = async (
  transactionId: number
): Promise<TransactionWithDetails> => {
  const response = await api.get<{ data: TransactionWithDetails }>(
    `/businesses/${BUSINESS_ID()}/transactions/${transactionId}`
  );
  return response.data.data;
};

/**
 * Create a new transaction
 */
export const createTransaction = async (
  data: CreateTransactionDTO
): Promise<Transaction> => {
  const response = await api.post<{ data: Transaction }>(
    `/businesses/${BUSINESS_ID()}/transactions`,
    data
  );
  return response.data.data;
};

/**
 * Update an existing transaction
 */
export const updateTransaction = async (
  transactionId: number,
  data: UpdateTransactionDTO
): Promise<Transaction> => {
  const response = await api.put<{ data: Transaction }>(
    `/businesses/${BUSINESS_ID()}/transactions/${transactionId}`,
    data
  );
  return response.data.data;
};

/**
 * Cancel a transaction
 */
export const cancelTransaction = async (
  transactionId: number
): Promise<Transaction> => {
  const response = await api.put<{ data: Transaction }>(
    `/businesses/${BUSINESS_ID()}/transactions/${transactionId}/cancel`
  );
  return response.data.data;
};

/**
 * Delete a transaction (soft delete)
 */
export const deleteTransaction = async (
  transactionId: number
): Promise<void> => {
  await api.delete(
    `/businesses/${BUSINESS_ID()}/transactions/${transactionId}`
  );
};

/**
 * Record a product sale
 */
export const recordSale = async (
  data: RecordSaleDTO
): Promise<TransactionWithDetails> => {
  const response = await api.post<{ data: TransactionWithDetails }>(
    `/businesses/${BUSINESS_ID()}/transactions/sales`,
    data
  );
  return response.data.data;
};

/**
 * Record a stock purchase
 */
export const recordPurchase = async (
  data: RecordPurchaseDTO
): Promise<TransactionWithDetails> => {
  const response = await api.post<{ data: TransactionWithDetails }>(
    `/businesses/${BUSINESS_ID()}/transactions/purchases`,
    data
  );
  return response.data.data;
};

/**
 * Get transaction totals (income, expense, net)
 */
export const getTransactionTotals = async (dateRange?: {
  startDate: string;
  endDate: string;
}): Promise<TransactionTotals> => {
  const params = new URLSearchParams();

  if (dateRange?.startDate) params.append("startDate", dateRange.startDate);
  if (dateRange?.endDate) params.append("endDate", dateRange.endDate);

  const queryString = params.toString();
  const url = `/businesses/${BUSINESS_ID()}/transactions/totals${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await api.get<{ data: TransactionTotals }>(url);
  return response.data.data;
};
