import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordObscureProps {
    isVisible: boolean;
    toggleFunction: () => void;
}

const PasswordObscure: React.FC<PasswordObscureProps> = ({ isVisible, toggleFunction }) => (
    <button 
        type="button" 
        onClick={toggleFunction}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
        aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
        {isVisible ? (
            <EyeOff className="w-5 h-5" />
        ) : (
            <Eye className="w-5 h-5" />
        )}
    </button>
);

export default PasswordObscure;