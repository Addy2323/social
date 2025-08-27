import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface FlashMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function FlashMessage({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: FlashMessageProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';
  const borderColor = isSuccess ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800';
  const textColor = isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';
  const iconColor = isSuccess ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} border rounded-lg p-4 mb-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-center">
        {isSuccess ? (
          <CheckCircle className={`w-5 h-5 ${iconColor} mr-3 flex-shrink-0`} />
        ) : (
          <XCircle className={`w-5 h-5 ${iconColor} mr-3 flex-shrink-0`} />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`${textColor} hover:opacity-75 transition-opacity ml-4 flex-shrink-0`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
