export type Transaction = {
  id: number;
  business_id: number;
  transaction_date: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
  description?: string;
};
