import React from 'react';
import { cn } from '@/lib/utils';

interface FadeInCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInCard: React.FC<FadeInCardProps> = ({ 
  children, 
  className,
  delay = 0 
}) => (
  <div
    className={cn("rounded-2xl shadow-lg bg-neutral-900 p-6 animate-fade-in", className)}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn("animate-fade-in", className)}>
    {children}
  </div>
);

interface SlideInFromRightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SlideInFromRight: React.FC<SlideInFromRightProps> = ({ 
  children, 
  className,
  delay = 0 
}) => (
  <div
    className={cn("animate-slide-right", className)}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

interface ScaleOnHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const ScaleOnHover: React.FC<ScaleOnHoverProps> = ({ 
  children, 
  className,
  scale = 1.02 
}) => (
  <div
    className={cn("transition-transform duration-200 hover:scale-[var(--scale)]", className)}
    style={{ '--scale': scale } as React.CSSProperties}
  >
    {children}
  </div>
);

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({ 
  children, 
  className,
  staggerDelay = 0.1 
}) => (
  <div className={className}>
    {children.map((child, index) => (
      <div
        key={index}
        className="animate-fade-in-up"
        style={{ animationDelay: `${index * staggerDelay * 1000}ms` }}
      >
        {child}
      </div>
    ))}
  </div>
);

// Simple AnimatedPresence replacement
export const AnimatedPresence: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};
