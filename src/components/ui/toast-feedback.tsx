
import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastFeedbackProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 4000
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white border-green-500';
      case 'error':
        return 'bg-red-600 text-white border-red-500';
      case 'warning':
        return 'bg-yellow-500 text-black border-yellow-400';
    }
  };

  return (
    <div className={cn(
      "rounded-xl px-4 py-3 shadow-lg text-sm font-medium flex items-center gap-2 border animate-fade-in",
      getStyles()
    )}>
      {getIcon()}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ToastFeedback;
