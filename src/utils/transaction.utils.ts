/**
 * Transaction Utilities
 * Helper functions for transaction data formatting and manipulation
 */

import type { Transaction, TransactionType } from "../types/transaction.types";

/**
 * Format currency to Indonesian Rupiah format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format amount with prefix based on transaction type
 */
export const formatTransactionAmount = (
  amount: number,
  type: TransactionType
): string => {
  const prefix = type === "Income" ? "+ " : "- ";
  return `${prefix}Rp ${formatCurrency(amount)}`;
};

/**
 * Format date to Indonesian format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
};

/**
 * Format date to short format (DD/MM/YYYY)
 */
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Convert transaction type to Indonesian
 */
export const getTransactionTypeLabel = (type: TransactionType): string => {
  return type === "Income" ? "Pemasukan" : "Pengeluaran";
};

/**
 * Convert status to Indonesian
 */
export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Pending",
    complete: "Sukses",
    cancel: "Dibatalkan",
  };
  return statusMap[status] || status;
};

/**
 * Get color class for transaction type
 */
export const getTransactionTypeColor = (type: TransactionType): string => {
  return type === "Income" ? "text-[#35A042]" : "text-[#FF5500]";
};

/**
 * Get badge color for transaction type
 */
export const getTransactionTypeBadgeColor = (type: TransactionType): string => {
  return type === "Income"
    ? "bg-emerald-600 text-white"
    : "bg-red-600 text-white";
};

/**
 * Get badge color for status
 */
export const getStatusBadgeColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    complete: "bg-green-100 text-green-700",
    cancel: "bg-red-100 text-red-700",
  };
  return colorMap[status] || "bg-gray-100 text-gray-700";
};

/**
 * Calculate total by transaction type
 */
export const calculateTotalByType = (
  transactions: Transaction[],
  type: TransactionType
): number => {
  return transactions
    .filter((t) => t.type === type && t.status === "complete")
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate net balance (income - expense)
 */
export const calculateNetBalance = (transactions: Transaction[]): number => {
  const income = calculateTotalByType(transactions, "Income");
  const expense = calculateTotalByType(transactions, "Expense");
  return income - expense;
};

/**
 * Parse currency input string to number
 */
export const parseCurrency = (value: string): number => {
  // Remove 'Rp', spaces, dots, and other non-numeric characters
  const cleaned = value
    .replace(/[^0-9,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return parseFloat(cleaned) || 0;
};

/**
 * Format input value as currency while typing
 */
export const formatCurrencyInput = (value: string): string => {
  const num = parseCurrency(value);
  if (isNaN(num) || num === 0) return "";
  return formatCurrency(num);
};

/**
 * Get current date in ISO format (YYYY-MM-DD)
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Get date range for current month
 */
export const getCurrentMonthRange = (): {
  startDate: string;
  endDate: string;
} => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1).toISOString().split("T")[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

  return { startDate, endDate };
};

/**
 * Filter transactions by search query
 */
export const filterTransactionsByQuery = (
  transactions: Transaction[],
  query: string
): Transaction[] => {
  if (!query.trim()) return transactions;

  const lowerQuery = query.toLowerCase();
  return transactions.filter((t) => {
    const category = (t.category || "").toLowerCase();
    const description = (t.description || "").toLowerCase();
    const type = getTransactionTypeLabel(t.type).toLowerCase();
    const amount = formatCurrency(t.amount);

    return (
      category.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      type.includes(lowerQuery) ||
      amount.includes(lowerQuery)
    );
  });
};
