import { SparklesIcon } from "lucide-react";
import React from "react";
interface AiButtonProps {
    onClick: () => void;
    isLeft?: boolean
}

const AiButton: React.FC<AiButtonProps> = ({ onClick,isLeft }) => {
  return (
    <div className={`bg-[#192335] fixed bottom-0 z-20 ${isLeft ? "left-0" : "right-0"} m-5 hover:scale-130 transition-all scale-125 p-3 rounded-full text-[linear-gradient(90deg,#BC00F5_6%,#FFFFFF_96%)]`} onClick={onClick}>
      <div
        
        className="
                w-6 h-6 
                bg-[linear-gradient(90deg,#BC00F5_6%,#FFFFFF_96%)]
                mask-[url('/images/sparkles.svg')]
                mask-center mask-no-repeat mask-contain
                "
      ></div>
    </div>
  );
};

export default AiButton;
