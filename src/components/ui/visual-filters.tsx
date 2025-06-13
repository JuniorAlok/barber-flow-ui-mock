
import React from 'react';
import { cn } from '@/lib/utils';

export type FilterType = 
  | 'none'
  | 'blur-sm'
  | 'blur-md'
  | 'blur-lg'
  | 'brightness-75'
  | 'brightness-125'
  | 'contrast-125'
  | 'saturate-150'
  | 'sepia'
  | 'grayscale'
  | 'invert'
  | 'hue-rotate-90'
  | 'hue-rotate-180';

interface VisualFiltersProps {
  children: React.ReactNode;
  filter?: FilterType;
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

export const VisualFilters: React.FC<VisualFiltersProps> = ({
  children,
  filter = 'none',
  intensity = 'medium',
  className
}) => {
  const getFilterClass = () => {
    if (filter === 'none') return '';
    
    const baseFilter = `filter-${filter}`;
    
    // For intensity-based filters
    if (filter.includes('brightness') || filter.includes('contrast') || filter.includes('saturate')) {
      switch (intensity) {
        case 'light': return `${baseFilter}-light`;
        case 'strong': return `${baseFilter}-strong`;
        default: return baseFilter;
      }
    }
    
    return baseFilter;
  };

  return (
    <div className={cn(getFilterClass(), className)}>
      {children}
    </div>
  );
};

interface FilterPreviewProps {
  title: string;
  filter: FilterType;
  children: React.ReactNode;
}

export const FilterPreview: React.FC<FilterPreviewProps> = ({
  title,
  filter,
  children
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <VisualFilters filter={filter} className="rounded-lg overflow-hidden">
        {children}
      </VisualFilters>
    </div>
  );
};

export default VisualFilters;
