import { PanelLeftClose, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
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
        className={`bg-[#182234] w-full max-w-sm h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center p-4">
          <button className="text-white cursor-pointer" onClick={handleClose}>
            <PanelLeftClose />
          </button>
          <select
            name=""
            id=""
            className="ml-5 bg-transparent text-white border-none outline-none cursor-pointer"
          >
            <option value="" className="bg-[#182234]">
              New Analysis
            </option>
          </select>
          <button className="absolute right-4 text-white cursor-pointer">
            <Plus />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-[#4A5F7F] text-white text-sm rounded-lg px-4 py-2 max-w-[80%]">
              dont hope ill make something good
            </div>
          </div>

          {/* AI Response */}
          <div className="flex justify-start">
            <div className="bg-[#2C3E50] text-gray-300 text-sm rounded-lg px-4 py-3 max-w-[85%] leading-relaxed">
              Donec non ex velit. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Curabitur eu
              non sem a ipsum pretium rutrum, et blandit dui iaculis. Duis vel
              feugiat nunc, non scelerisque justo. In eget ex duis odio, aliquet
              bibendum. Duis posuere posuere tempor eget. Donec gravida, odio
              sit amet dictum maximus, urna mi porta arcu, et faucibus lacus
              arcu non ligula. Quisque rhoncus odio malesuada, venenatis vitae
              commodo non, scelerisque neque.
            </div>
          </div>
        </div>

        {/* Textarea Input at Bottom */}
        <div className="p-4 border-t border-gray-700">
          <div className="relative flex items-center bg-[#2C3E50] rounded-lg p-3">
            <textarea
              placeholder="Analisis Bisnisku..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none resize-none min-h-[24px] max-h-[120px]"
              rows={3}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
            <button className="ml-3 text-white hover:text-blue-400 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AiModal;
