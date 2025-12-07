/**
 * AI Hooks
 * Custom React hooks for AI features
 */

import { useState, useCallback } from "react";
import * as aiService from "../services/api/ai.service";
import type {
  BusinessInsights,
  CashflowForecast,
  CostRecommendations,
  SalesRecommendations,
  StockForecasts,
  ChatInteraction,
  ChatHistory,
  Message,
} from "../types/ai.types";

interface UseAIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for business insights
 */
export const useBusinessInsights = () => {
  const [state, setState] = useState<UseAIState<BusinessInsights>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchInsights = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await aiService.getBusinessInsights();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || "Failed to fetch insights",
      });
    }
  }, []);

  return { ...state, fetchInsights };
};

/**
 * Hook for cashflow forecast
 */
export const useCashflowForecast = () => {
  const [state, setState] = useState<UseAIState<CashflowForecast>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchForecast = useCallback(async (days: number = 7) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await aiService.getCashflowForecast(days);
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || "Failed to fetch forecast",
      });
    }
  }, []);

  return { ...state, fetchForecast };
};

/**
 * Hook for cost recommendations
 */
export const useCostRecommendations = () => {
  const [state, setState] = useState<UseAIState<CostRecommendations>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchRecommendations = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await aiService.getCostRecommendations();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || "Failed to fetch recommendations",
      });
    }
  }, []);

  return { ...state, fetchRecommendations };
};

/**
 * Hook for sales recommendations
 */
export const useSalesRecommendations = () => {
  const [state, setState] = useState<UseAIState<SalesRecommendations>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchRecommendations = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await aiService.getSalesRecommendations();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || "Failed to fetch recommendations",
      });
    }
  }, []);

  return { ...state, fetchRecommendations };
};

/**
 * Hook for stock forecast
 */
export const useStockForecast = () => {
  const [state, setState] = useState<UseAIState<StockForecasts>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchForecast = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await aiService.getStockForecast();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || "Failed to fetch forecast",
      });
    }
  }, []);

  return { ...state, fetchForecast };
};

/**
 * Hook for AI chat
 */
export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const history = await aiService.getChatHistory();
      if (history.chat) {
        setChatId(history.chat.id);
        setMessages(history.messages);
      }
    } catch (error: any) {
      setError(error.message || "Failed to load chat history");
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Add user message immediately for better UX
      const userMessage: Message = {
        id: Date.now(),
        chat_id: chatId || 0,
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      setError(null);

      try {
        const interaction = await aiService.sendChatMessage({
          message,
          chatId,
        });

        // Just add the bot response, keep the temporary user message
        setMessages((prev) => [...prev, interaction.botResponse]);

        // Update chat ID if it's a new chat
        if (!chatId && interaction.chat) {
          setChatId(interaction.chat.id);
        }
      } catch (error: any) {
        // Remove the temporary user message on error
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        setError(error.message || "Failed to send message");
      } finally {
        setLoading(false);
      }
    },
    [chatId]
  );

  const startNewChat = useCallback(() => {
    setChatId(undefined);
    setMessages([]);
    setError(null);
  }, []);

  const loadChatById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const history = await aiService.getChatById(id);
      setChatId(id);
      setMessages(history.messages);
    } catch (error: any) {
      setError(error.message || "Failed to load chat");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    loadHistory,
    startNewChat,
    loadChatById,
  };
};
