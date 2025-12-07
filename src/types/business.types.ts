/**
 * Business Types
 * Type definitions for business-related data
 */

export interface Business {
  id: number;
  user_id: string;
  business_name: string;
  category: string | null;
  location: string | null;
  current_balance: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// API Request DTOs
export interface CreateBusinessDTO {
  business_name: string;
  category?: string;
  location?: string;
  current_balance?: number;
}

export interface UpdateBusinessDTO {
  business_name?: string;
  category?: string;
  location?: string;
  current_balance?: number;
}

// Business Overview
export interface BusinessOverview {
  business: Business;
  totalProducts: number;
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
  lowStockProducts: number;
}

// Balance Summary
export interface BalanceSummary {
  currentBalance: number;
  totalIncome: number;
  totalExpense: number;
  netIncome: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}
