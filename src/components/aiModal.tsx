/**
 * AI Modal Component
 * Main modal for AI features
 */

import { PanelLeftClose, Plus, Send, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useBusinessInsights,
  useCashflowForecast,
  useCostRecommendations,
  useSalesRecommendations,
  useStockForecast,
  useAIChat,
} from "../hooks/useAI";
import * as aiService from "../services/api/ai.service";
import type { AIFeatureType } from "../types/ai.types";

// Import split components
import {
  ChatView,
  InsightsView,
  CashflowView,
  CostView,
  SalesView,
  StockView,
} from "./ai";

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFeature, setActiveFeature] = useState<AIFeatureType>("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [forecastDays, setForecastDays] = useState(7);
  const [chatList, setChatList] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>();

  // Hooks
  const insights = useBusinessInsights();
  const cashflow = useCashflowForecast();
  const costRec = useCostRecommendations();
  const salesRec = useSalesRecommendations();
  const stockForecast = useStockForecast();
  const chat = useAIChat();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      chat.loadHistory();
      loadChatList();
    }
  }, [isOpen]);

  const loadChatList = async () => {
    try {
      const chats = await aiService.getAllChats();
      setChatList(chats);
    } catch (error) {}
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      chat.sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleFeatureChange = (feature: AIFeatureType) => {
    setActiveFeature(feature);

    switch (feature) {
      case "insights":
        if (!insights.data) insights.fetchInsights();
        break;
      case "cashflow":
        if (!cashflow.data) cashflow.fetchForecast(forecastDays);
        break;
      case "cost":
        if (!costRec.data) costRec.fetchRecommendations();
        break;
      case "sales":
        if (!salesRec.data) salesRec.fetchRecommendations();
        break;
      case "stock":
        if (!stockForecast.data) stockForecast.fetchForecast();
        break;
    }
  };

  const handleNewChat = () => {
    chat.startNewChat();
    setSelectedChatId(undefined);
  };

  const handleLoadChat = async (chatId: number) => {
    setSelectedChatId(chatId);
    await chat.loadChatById(chatId);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isAnimating ? "bg-black/50" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#182234] w-full max-w-2xl h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-700">
          {/* Top bar */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <button
                className="text-white cursor-pointer"
                onClick={handleClose}
              >
                <PanelLeftClose />
              </button>
              <span className="text-white font-semibold">AI Assistant</span>
            </div>
            {activeFeature === "chat" && (
              <div className="flex items-center gap-2">
                <select
                  value={selectedChatId || "current"}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "current") {
                      chat.loadHistory();
                      setSelectedChatId(undefined);
                    } else {
                      handleLoadChat(parseInt(value));
                    }
                  }}
                  className="bg-[#2C3E50] text-white text-sm px-2 py-1 rounded border border-gray-600 outline-none cursor-pointer max-w-[150px]"
                >
                  <option value="current">Current</option>
                  {chatList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {new Date(c.created_at).toLocaleDateString("id-ID")}
                    </option>
                  ))}
                </select>
                <button
                  className="text-white cursor-pointer hover:bg-gray-700 p-1.5 rounded transition-colors"
                  onClick={handleNewChat}
                  title="New Chat"
                >
                  <Plus size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Feature Tabs */}
          <div className="flex overflow-x-auto px-2 pb-2 gap-1">
            {[
              { key: "chat", label: "💬 Chat" },
              { key: "insights", label: "📊 Insights" },
              { key: "cashflow", label: "💰 Cashflow" },
              { key: "cost", label: "💸 Biaya" },
              { key: "sales", label: "🚀 Penjualan" },
              { key: "stock", label: "📦 Stok" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleFeatureChange(tab.key as AIFeatureType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFeature === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-[#2C3E50] text-gray-300 hover:bg-[#3D5066]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeFeature === "chat" && <ChatView chat={chat} />}
          {activeFeature === "insights" && <InsightsView state={insights} />}
          {activeFeature === "cashflow" && (
            <CashflowView
              state={cashflow}
              days={forecastDays}
              onDaysChange={setForecastDays}
              onRefresh={() => cashflow.fetchForecast(forecastDays)}
            />
          )}
          {activeFeature === "cost" && <CostView state={costRec} />}
          {activeFeature === "sales" && <SalesView state={salesRec} />}
          {activeFeature === "stock" && <StockView state={stockForecast} />}
        </div>

        {/* Input Area (only for chat) */}
        {activeFeature === "chat" && (
          <div className="p-4 border-t border-gray-700">
            <div className="relative flex items-center bg-[#2C3E50] rounded-lg p-3">
              <textarea
                placeholder="Tanya AI tentang bisnis Anda..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none resize-none min-h-[24px] max-h-[120px]"
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(
                    target.scrollHeight,
                    120
                  )}px`;
                }}
                disabled={chat.loading}
              />
              <button
                className="ml-3 text-white hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={chat.loading || !inputMessage.trim()}
              >
                {chat.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiModal;
