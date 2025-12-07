import { useState, useEffect, useCallback } from "react";
import * as transactionService from "../services/api/transaction.service";
import * as businessService from "../services/api/business.service";
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
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchTotals = useCallback(
    async (dateRange?: { startDate: string; endDate: string }) => {
      try {
        const businessIdStr = localStorage.getItem("business_id");
        if (!businessIdStr) return;

        const businessId = parseInt(businessIdStr, 10);

        const data = await businessService.getBalanceSummary(
          businessId,
          dateRange
        );

        setTotals({
          income: data.totalIncome,
          expense: data.totalExpense,
          net: data.currentBalance,
          dateRange: data.dateRange,
        });
      } catch (err: any) {}
    },
    []
  );

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
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refreshData = useCallback(async () => {
    await Promise.all([fetchTransactions(initialFilters), fetchTotals()]);
  }, [fetchTransactions, fetchTotals, initialFilters]);

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
