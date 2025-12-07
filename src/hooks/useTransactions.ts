/**
 * useTransactions Hook
 * Custom React hook for managing transaction data
 */

import { useState, useEffect, useCallback } from "react";
import * as transactionService from "../services/api/transaction.service";
import type {
  Transaction,
  TransactionTotals,
  TransactionFilters,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "../types/transaction.types";

interface UseTransactionsReturn {
  transactions: Transaction[];
  totals: TransactionTotals | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
  fetchTotals: (dateRange?: {
    startDate: string;
    endDate: string;
  }) => Promise<void>;
  createTransaction: (
    data: CreateTransactionDTO
  ) => Promise<Transaction | null>;
  updateTransaction: (
    id: number,
    data: UpdateTransactionDTO
  ) => Promise<Transaction | null>;
  deleteTransaction: (id: number) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

export const useTransactions = (
  initialFilters?: TransactionFilters
): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState<TransactionTotals | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false,
  });

  // Fetch transactions with filters
  const fetchTransactions = useCallback(
    async (filters?: TransactionFilters) => {
      setLoading(true);
      setError(null);
      try {
        const data = await transactionService.getTransactions(filters);
        setTransactions(data.transactions);
        setPagination(data.pagination);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch transactions");
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch transaction totals
  const fetchTotals = useCallback(
    async (dateRange?: { startDate: string; endDate: string }) => {
      try {
        const data = await transactionService.getTransactionTotals(dateRange);
        setTotals(data);
      } catch (err: any) {
        console.error("Error fetching totals:", err);
        // Don't set error for totals to avoid blocking the UI
      }
    },
    []
  );

  // Create new transaction
  const createTransaction = useCallback(
    async (data: CreateTransactionDTO): Promise<Transaction | null> => {
      setLoading(true);
      setError(null);
      try {
        const newTransaction = await transactionService.createTransaction(data);
        await refreshData();
        return newTransaction;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to create transaction");
        console.error("Error creating transaction:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update existing transaction
  const updateTransaction = useCallback(
    async (
      id: number,
      data: UpdateTransactionDTO
    ): Promise<Transaction | null> => {
      setLoading(true);
      setError(null);
      try {
        const updated = await transactionService.updateTransaction(id, data);
        await refreshData();
        return updated;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to update transaction");
        console.error("Error updating transaction:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete transaction
  const deleteTransaction = useCallback(
    async (id: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await transactionService.deleteTransaction(id);
        await refreshData();
        return true;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete transaction");
        console.error("Error deleting transaction:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Refresh all data
  const refreshData = useCallback(async () => {
    await Promise.all([fetchTransactions(initialFilters), fetchTotals()]);
  }, [fetchTransactions, fetchTotals, initialFilters]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, []);

  return {
    transactions,
    totals,
    loading,
    error,
    pagination,
    fetchTransactions,
    fetchTotals,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refreshData,
  };
};
