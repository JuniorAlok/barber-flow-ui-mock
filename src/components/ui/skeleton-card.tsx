
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  lines?: number;
  className?: string;
  showHeader?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  lines = 3,
  className,
  showHeader = true,
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-3 space-y-2';
      case 'detailed':
        return 'p-6 space-y-4';
      default:
        return 'p-4 space-y-2';
    }
  };

  const getLineWidths = () => {
    switch (variant) {
      case 'compact':
        return ['w-2/3', 'w-1/2'];
      case 'detailed':
        return ['w-3/4', 'w-full', 'w-2/3', 'w-1/2'];
      default:
        return ['w-3/4', 'w-1/2', 'w-full'];
    }
  };

  const lineWidths = getLineWidths();

  return (
    <div className={cn(
      "bg-neutral-800 rounded-xl animate-pulse",
      getVariantStyles(),
      className
    )}>
      {showHeader && (
        <div className="flex items-center space-x-2 mb-3">
          <Skeleton className="h-8 w-8 rounded-full bg-neutral-700" />
          <Skeleton className="h-4 w-32 bg-neutral-700" />
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: Math.min(lines, lineWidths.length) }).map((_, index) => (
          <Skeleton 
            key={index}
            className={cn("h-4 bg-neutral-700", lineWidths[index])} 
          />
        ))}
      </div>
      
      {variant === 'detailed' && (
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-3 w-20 bg-neutral-700" />
          <Skeleton className="h-6 w-16 bg-neutral-700 rounded" />
        </div>
      )}
    </div>
  );
};

export default SkeletonCard;
