import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-50 animate-bounce transition-all duration-300">
      <div className={`px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 border ${
        type === 'success' 
          ? 'bg-mds-dark text-white border-mds-accent' 
          : 'bg-white text-mds-charcoal border-mds-border'
      }`}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-sm font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss message"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
