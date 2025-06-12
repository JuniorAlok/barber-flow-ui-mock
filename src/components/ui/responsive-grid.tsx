
import React from 'react';
import { cn } from '@/lib/utils';
import { FadeInCard, StaggeredList } from './motion-components';

interface ResponsiveGridProps {
  children: React.ReactNode[];
  className?: string;
  animated?: boolean;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  children, 
  className,
  animated = true,
  cols = { mobile: 1, tablet: 2, desktop: 3 }
}) => {
  const gridClasses = cn(
    "grid gap-4",
    cols.mobile === 1 && "grid-cols-1",
    cols.mobile === 2 && "grid-cols-2",
    cols.tablet === 1 && "md:grid-cols-1",
    cols.tablet === 2 && "md:grid-cols-2",
    cols.tablet === 3 && "md:grid-cols-3",
    cols.desktop === 1 && "lg:grid-cols-1",
    cols.desktop === 2 && "lg:grid-cols-2",
    cols.desktop === 3 && "lg:grid-cols-3",
    cols.desktop === 4 && "lg:grid-cols-4",
    className
  );

  if (animated) {
    return (
      <StaggeredList className={gridClasses}>
        {children}
      </StaggeredList>
    );
  }

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

interface CardGridProps {
  items: React.ReactNode[];
  className?: string;
  cardClassName?: string;
  animated?: boolean;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export const CardGrid: React.FC<CardGridProps> = ({ 
  items, 
  className,
  cardClassName,
  animated = true,
  cols = { mobile: 1, tablet: 2, desktop: 3 }
}) => {
  return (
    <ResponsiveGrid className={className} animated={animated} cols={cols}>
      {items.map((item, index) => (
        <FadeInCard 
          key={index}
          className={cardClassName}
          delay={animated ? index * 0.1 : 0}
        >
          {item}
        </FadeInCard>
      ))}
    </ResponsiveGrid>
  );
};

export default ResponsiveGrid;
