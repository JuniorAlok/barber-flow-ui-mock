
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Sparkles, Timer } from 'lucide-react';
import ModernCard from './modern-card';

interface EnhancedLoadingProps {
  variant?: 'default' | 'luxury' | 'minimal' | 'card' | 'inline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  subtext?: string;
  progress?: number;
  className?: string;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = 'default',
  size = 'md',
  text,
  subtext,
  progress,
  className,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getSpacingStyles = () => {
    switch (size) {
      case 'sm': return 'space-y-2';
      case 'lg': return 'space-y-4';
      case 'xl': return 'space-y-6';
      default: return 'space-y-3';
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
      
      case 'minimal':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        );
      
      default:
        return <Loader2 className={cn(getSizeStyles(), 'animate-spin text-primary')} />;
    }
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center', getSpacingStyles(), className)}>
      {renderLoader()}
      
      {text && (
        <div className="text-center space-y-1">
          <p className={cn(
            'font-medium animate-pulse',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
            variant === 'luxury' ? 'text-yellow-600 dark:text-yellow-400' : 'text-foreground'
          )}>
            {text}
          </p>
          
          {subtext && (
            <p className="text-sm text-muted-foreground">
              {subtext}
            </p>
          )}
        </div>
      )}
      
      {progress !== undefined && (
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <ModernCard
        variant="glass"
        className={cn('animate-pulse', className)}
      >
        <div className="p-8">
          {content}
        </div>
      </ModernCard>
    );
  }

  return content;
};

// Skeleton Components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30', className)}>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-8 bg-muted rounded w-1/2"></div>
      <div className="h-3 bg-muted rounded w-2/3"></div>
    </div>
  </div>
);

export const SkeletonMetric: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse p-6 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 border border-border/30', className)}>
    <div className="flex items-center justify-between mb-4">
      <div className="h-4 bg-muted rounded w-20"></div>
      <div className="w-8 h-8 bg-muted rounded-lg"></div>
    </div>
    <div className="h-8 bg-muted rounded w-16 mb-2"></div>
    <div className="h-3 bg-muted rounded w-24"></div>
  </div>
);

// Loading Screen Component
export const LoadingScreen: React.FC<{
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'luxury';
}> = ({ 
  title = 'Carregando...', 
  subtitle = 'Aguarde um momento',
  variant = 'default'
}) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-8 max-w-md mx-auto px-6">
      <div className="animate-fade-in">
        <EnhancedLoading
          variant={variant}
          size="xl"
          text={title}
          subtext={subtitle}
        />
      </div>
      
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default EnhancedLoading;
