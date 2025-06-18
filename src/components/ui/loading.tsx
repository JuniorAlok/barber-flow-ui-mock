
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  className,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3',
      className
    )}>
      <Loader2 className={cn(
        'animate-spin text-primary',
        sizeClasses[size]
      )} />
      {text && (
        <p className={cn(
          'text-muted-foreground font-medium animate-pulse',
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export const PageLoading: React.FC<{ text?: string }> = ({ 
  text = 'Carregando...' 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loading size="lg" text={text} />
  </div>
);

export const SkeletonLoader: React.FC<{ 
  lines?: number; 
  className?: string;
  height?: string;
}> = ({ 
  lines = 3, 
  className,
  height = 'h-4'
}) => (
  <div className={cn('space-y-3 animate-pulse', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={cn(
          'bg-muted rounded-lg',
          height,
          i === lines - 1 && 'w-3/4'
        )}
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('luxury-card p-6 animate-pulse', className)}>
    <div className="space-y-4">
      <div className="h-6 bg-muted rounded-lg w-2/3" />
      <div className="h-8 bg-muted rounded-lg w-1/2" />
      <div className="h-4 bg-muted rounded-lg w-1/3" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ 
  rows?: number; 
  cols?: number; 
  className?: string;
}> = ({ 
  rows = 5, 
  cols = 4, 
  className 
}) => (
  <div className={cn('space-y-2 animate-pulse', className)}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded w-3/4" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: cols }).map((_, colIndex) => (
          <div
            key={colIndex}
            className="h-4 bg-muted/50 rounded"
            style={{
              width: colIndex === 0 ? '90%' : '70%'
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Loading;
