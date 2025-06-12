
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'default'
}) => {
  const getConfirmButtonStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md bg-black/90 border-zinc-700 text-white rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-bold text-white">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <p className="text-sm text-gray-400">{message}</p>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="text-gray-400 hover:text-white hover:bg-zinc-800"
          >
            {cancelLabel}
          </Button>
          <Button 
            onClick={onConfirm}
            className={`${getConfirmButtonStyles()} font-medium px-4 py-2 rounded-xl transition-all duration-300`}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
