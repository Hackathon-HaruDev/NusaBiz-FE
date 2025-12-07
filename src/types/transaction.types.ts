/**
 * Transaction Types
 * Type definitions for transaction-related data
 */

export type TransactionType = "Income" | "Expense";
export type TransactionStatus = "pending" | "complete" | "cancel";

export interface Transaction {
  id: number;
  business_id: number;
  transaction_date: string;
  type: TransactionType;
  category: string | null;
  amount: number;
  description: string | null;
  status: TransactionStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TransactionDetailJoined {
  id: number;
  transaction_id: number;
  product_id: number;
  quantity: number;
  unit_price_at_transaction: number;
  Products?: {
    id: number;
    name: string;
  };
}

export interface TransactionWithDetails extends Transaction {
  TransactionDetails: TransactionDetailJoined[];
}

// API Request DTOs
export interface CreateTransactionDTO {
  type: TransactionType;
  category?: string;
  amount: number;
  description?: string;
  status?: TransactionStatus;
}

export interface UpdateTransactionDTO {
  description?: string;
  status?: TransactionStatus;
  date?: string;
  amount?: number;
  category?: string;
}

export interface RecordSaleDTO {
  products: {
    productId: number;
    quantity: number;
    sellingPrice: number;
  }[];
  description?: string;
}

export interface RecordPurchaseDTO {
  products: {
    productId: number;
    quantity: number;
    purchasePrice: number;
  }[];
  description?: string;
}

// API Response Types
export interface TransactionTotals {
  income: number;
  expense: number;
  net: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface TransactionListResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Filter Options
export interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}
