
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Sparkles } from 'lucide-react';

interface ModernLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'luxury' | 'minimal' | 'pulse';
  text?: string;
  className?: string;
}

const ModernLoading: React.FC<ModernLoadingProps> = ({
  size = 'md',
  variant = 'default',
  text,
  className,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'luxury':
        return 'text-yellow-500';
      case 'minimal':
        return 'text-muted-foreground';
      case 'pulse':
        return 'text-primary animate-pulse';
      default:
        return 'text-primary';
    }
  };

  const renderLoader = () => {
    switch (variant) {
      case 'luxury':
        return (
          <div className="relative">
            <Sparkles className={cn(getSizeStyles(), 'animate-spin text-yellow-500')} />
            <div className="absolute inset-0 animate-ping">
              <Sparkles className={cn(getSizeStyles(), 'text-yellow-400 opacity-75')} />
            </div>
          </div>
        );
      case 'pulse':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        );
      default:
        return <Loader2 className={cn(getSizeStyles(), 'animate-spin', getVariantStyles())} />;
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      {renderLoader()}
      {text && (
        <p className={cn(
          'text-sm font-medium animate-pulse',
          variant === 'luxury' ? 'text-yellow-600' : 'text-muted-foreground'
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

export default ModernLoading;
