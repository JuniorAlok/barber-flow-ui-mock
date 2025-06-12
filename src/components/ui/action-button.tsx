
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  label: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  loading = false,
  success = false,
  error = false,
  label,
  loadingLabel = 'Processando...',
  successLabel,
  errorLabel,
  onClick,
  disabled = false,
  className,
  variant = 'default',
  size = 'default'
}) => {
  const getButtonState = () => {
    if (loading) {
      return {
        label: loadingLabel,
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        className: 'bg-yellow-600 hover:bg-yellow-700 text-white cursor-not-allowed'
      };
    }
    if (success) {
      return {
        label: successLabel || label,
        icon: <CheckCircle className="w-4 h-4" />,
        className: 'bg-green-600 hover:bg-green-700 text-white'
      };
    }
    if (error) {
      return {
        label: errorLabel || label,
        icon: <AlertCircle className="w-4 h-4" />,
        className: 'bg-red-600 hover:bg-red-700 text-white'
      };
    }
    return {
      label,
      icon: null,
      className: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
    };
  };

  const buttonState = getButtonState();
  const isDisabled = loading || disabled;

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant={loading || success || error ? undefined : variant}
      size={size}
      className={cn(
        loading || success || error ? buttonState.className : '',
        'font-medium rounded-xl transition-all duration-300 flex items-center gap-2',
        className
      )}
    >
      {buttonState.icon}
      {buttonState.label}
    </Button>
  );
};

export default ActionButton;
