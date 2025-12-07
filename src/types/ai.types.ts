/**
 * AI Types
 * Type definitions for AI features
 */

export interface Message {
  id: number;
  chat_id: number;
  role: "user" | "bot";
  content: string;
  created_at: string;
}

export interface Chat {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ChatInteraction {
  chat: Chat;
  userMessage: Message;
  botResponse: Message;
}

export interface CategoryInsight {
  category: string;
  trend: "increase" | "decrease";
  percentage: number;
  message: string;
}

export interface ProductInsight {
  productName: string;
  contribution: string;
  message: string;
}

export interface MarginInsight {
  currentMargin: number;
  change: number;
  message: string;
}

export interface BusinessInsights {
  categoryInsights: CategoryInsight[];
  productInsights: ProductInsight[];
  marginInsights: MarginInsight;
  generatedAt: string;
}

export interface CashflowForecastDay {
  date: string;
  projectedIncome: number;
  projectedExpense: number;
  projectedBalance: number;
  warning: string | null;
}

export interface CashflowForecast {
  currentBalance: number;
  projectedEndBalance: number;
  forecast: CashflowForecastDay[];
  warnings: string | null;
  summary: string;
}

export interface CostRecommendation {
  category: string;
  amount: number;
  percentage: number;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

export interface CostRecommendations {
  recommendations: CostRecommendation[];
  totalExpense: number;
  message?: string;
}

export interface SalesRecommendation {
  type: "stock_warning" | "promotion_opportunity" | "slow_moving";
  productName: string;
  currentStock?: number;
  margin?: number;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

export interface SalesRecommendations {
  recommendations: SalesRecommendation[];
  message?: string;
}

export interface StockForecast {
  productName: string;
  currentStock: number;
  estimatedDailySales: number;
  daysUntilEmpty: number;
  estimatedEmptyDate: string;
  recommendedRestockQuantity: number;
  priority: "urgent" | "soon" | "normal";
}

export interface StockForecasts {
  forecasts: StockForecast[];
  message?: string;
}

export interface ChatHistory {
  chat?: Chat;
  messages: Message[];
}

export interface ChatRequest {
  message: string;
  chatId?: number;
}

export type AIFeatureType =
  | "insights"
  | "cashflow"
  | "cost"
  | "sales"
  | "stock"
  | "chat";
