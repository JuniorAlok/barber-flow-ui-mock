
import React from 'react';
import ToastFeedback from './toast-feedback';
import { useToastFeedback } from '@/hooks/useToastFeedback';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastFeedback();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastFeedback
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
