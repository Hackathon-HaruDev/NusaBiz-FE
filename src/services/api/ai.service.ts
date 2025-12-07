/**
 * AI Service
 * API service layer for AI features
 */

import api from "./config";
import type {
  BusinessInsights,
  CashflowForecast,
  CostRecommendations,
  SalesRecommendations,
  StockForecasts,
  ChatInteraction,
  ChatHistory,
  ChatRequest,
} from "../../types/ai.types";

/**
 * Get business ID from localStorage
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

const BUSINESS_ID = () => getBusinessId();

/**
 * Helper: Map backend message to frontend format
 * Backend uses 'sender' with 'User'/'Bot', frontend uses 'role' with 'user'/'bot'
 */
const mapMessage = (message: any): any => {
  return {
    ...message,
    role: message.sender === "User" ? "user" : "bot",
  };
};

/**
 * Helper: Map chat interaction from backend
 */
const mapChatInteraction = (interaction: any): ChatInteraction => {
  return {
    chat: interaction.chat,
    userMessage: mapMessage(interaction.userMessage),
    botResponse: mapMessage(interaction.botResponse),
  };
};

/**
 * Helper: Map chat history from backend
 */
const mapChatHistory = (history: any): ChatHistory => {
  return {
    chat: history.chat,
    messages: (history.messages || []).map(mapMessage),
  };
};

/**
 * Get automatic business insights
 */
export const getBusinessInsights = async (): Promise<BusinessInsights> => {
  const response = await api.get<{ data: BusinessInsights }>(
    `/businesses/${BUSINESS_ID()}/ai/insights`
  );
  return response.data.data;
};

/**
 * Get cashflow forecast
 * @param days Number of days to forecast (default: 7)
 */
export const getCashflowForecast = async (
  days: number = 7
): Promise<CashflowForecast> => {
  const response = await api.get<{ data: CashflowForecast }>(
    `/businesses/${BUSINESS_ID()}/ai/cashflow-forecast?days=${days}`
  );
  return response.data.data;
};

/**
 * Get cost saving recommendations
 */
export const getCostRecommendations =
  async (): Promise<CostRecommendations> => {
    const response = await api.get<{ data: CostRecommendations }>(
      `/businesses/${BUSINESS_ID()}/ai/cost-recommendations`
    );
    return response.data.data;
  };

/**
 * Get sales recommendations
 */
export const getSalesRecommendations =
  async (): Promise<SalesRecommendations> => {
    const response = await api.get<{ data: SalesRecommendations }>(
      `/businesses/${BUSINESS_ID()}/ai/sales-recommendations`
    );
    return response.data.data;
  };

/**
 * Get stock forecast
 */
export const getStockForecast = async (): Promise<StockForecasts> => {
  const response = await api.get<{ data: StockForecasts }>(
    `/businesses/${BUSINESS_ID()}/ai/stock-forecast`
  );
  return response.data.data;
};

/**
 * Send message to AI chatbot
 */
export const sendChatMessage = async (
  request: ChatRequest
): Promise<ChatInteraction> => {
  const response = await api.post<{ data: any }>(
    `/businesses/${BUSINESS_ID()}/ai/chat`,
    request
  );
  return mapChatInteraction(response.data.data);
};

/**
 * Get chat history
 * @param limit Number of messages to retrieve (default: 50)
 */
export const getChatHistory = async (
  limit: number = 50
): Promise<ChatHistory> => {
  const response = await api.get<{ data: any }>(
    `/businesses/${BUSINESS_ID()}/ai/chat/history?limit=${limit}`
  );
  return mapChatHistory(response.data.data);
};

/**
 * Get all chat sessions
 */
export const getAllChats = async (): Promise<any[]> => {
  const response = await api.get<{ data: any[] }>(
    `/businesses/${BUSINESS_ID()}/ai/chats`
  );
  return response.data.data || [];
};

/**
 * Get specific chat by ID with messages
 */
export const getChatById = async (chatId: number): Promise<ChatHistory> => {
  const response = await api.get<{ data: any }>(
    `/businesses/${BUSINESS_ID()}/ai/chats/${chatId}`
  );
  return mapChatHistory(response.data.data);
};
