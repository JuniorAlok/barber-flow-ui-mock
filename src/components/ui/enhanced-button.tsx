import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  successMessage?: string;
  errorMessage?: string;
  loadingText?: string;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  successMessage,
  errorMessage,
  loadingText = 'Processando...',
}) => {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    if (!onClick || state === 'loading') return;

    setState('loading');
    
    try {
      await onClick();
      if (successMessage) {
        setState('success');
        toast.success(successMessage);
        setTimeout(() => setState('idle'), 2000);
      } else {
        setState('idle');
      }
    } catch (error) {
      setState('error');
      if (errorMessage) {
        toast.error(errorMessage);
      }
      setTimeout(() => setState('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    switch (state) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            {loadingText}
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Sucesso!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Erro
          </>
        );
      default:
        return children;
    }
  };

  const getButtonVariant = () => {
    if (state === 'success') return 'default';
    if (state === 'error') return 'destructive';
    return variant;
  };

  return (
    <Button
      variant={getButtonVariant()}
      size={size}
      onClick={handleClick}
      disabled={disabled || state === 'loading'}
      className={cn(
        'transition-all duration-200 font-semibold rounded-xl',
        'hover:scale-105 active:scale-95',
        state === 'success' && 'bg-green-600 hover:bg-green-700',
        state === 'error' && 'bg-red-600 hover:bg-red-700',
        className
      )}
    >
      {getButtonContent()}
    </Button>
  );
};

export default EnhancedButton;
