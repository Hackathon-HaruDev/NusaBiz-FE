/**
 * Chat View Component
 */

import { useEffect, useRef } from "react";
import { MessageSquare, AlertCircle } from "lucide-react";
import type { useAIChat } from "../../hooks/useAI";

interface ChatViewProps {
  chat: ReturnType<typeof useAIChat>;
}

const ChatView: React.FC<ChatViewProps> = ({ chat }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  if (chat.messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <MessageSquare size={64} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">Mulai percakapan dengan AI</p>
        <p className="text-sm mt-2 text-center max-w-md">
          Tanyakan tentang keuangan, produk, atau minta saran untuk bisnis Anda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chat.messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-[#2C3E50] text-gray-300"
            } text-sm rounded-lg px-4 py-3 max-w-[85%] leading-relaxed whitespace-pre-wrap`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {chat.error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
          <AlertCircle size={20} />
          <span className="text-sm">{chat.error}</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatView;
