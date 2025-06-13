
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'sidebar' | 'dashboard';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const ModernLayout: React.FC<ModernLayoutProps> = ({
  children,
  className,
  variant = 'default',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const getLayoutVariant = () => {
    switch (variant) {
      case 'centered':
        return 'flex items-center justify-center min-h-screen';
      case 'sidebar':
        return 'flex min-h-screen';
      case 'dashboard':
        return 'min-h-screen bg-background';
      default:
        return 'min-h-screen';
    }
  };

  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case '2xl': return 'max-w-2xl';
      case 'full': return 'w-full';
      default: return 'max-w-7xl';
    }
  };

  const getPadding = () => {
    switch (padding) {
      case 'none': return '';
      case 'sm': return 'p-4';
      case 'lg': return 'p-8 md:p-12';
      default: return 'page-padding';
    }
  };

  if (variant === 'sidebar' || variant === 'dashboard') {
    return (
      <div className={cn(getLayoutVariant(), className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn(getLayoutVariant(), className)}>
      <div className={cn(
        'container mx-auto',
        getMaxWidth(),
        getPadding()
      )}>
        {children}
      </div>
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumb,
  className
}) => {
  return (
    <div className={cn('border-b border-border/50 bg-card/50 backdrop-blur-sm', className)}>
      <div className="container-responsive page-padding">
        {breadcrumb && (
          <div className="mb-4">
            {breadcrumb}
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-luxury">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground text-balance">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'md'
}) => {
  const getSpacing = () => {
    switch (spacing) {
      case 'sm': return 'py-8';
      case 'lg': return 'py-16 md:py-20';
      case 'xl': return 'py-20 md:py-24';
      default: return 'py-12 md:py-16';
    }
  };

  return (
    <section className={cn(getSpacing(), className)}>
      <div className="container-responsive">
        {children}
      </div>
    </section>
  );
};

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  responsive?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  className,
  responsive = true
}) => {
  const getGridCols = () => {
    if (!responsive) {
      return `grid-cols-${cols}`;
    }
    
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      case 12: return 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGap = () => {
    switch (gap) {
      case 'sm': return 'gap-4';
      case 'lg': return 'gap-8';
      case 'xl': return 'gap-12';
      default: return 'gap-6';
    }
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      getGap(),
      className
    )}>
      {children}
    </div>
  );
};

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md',
  className
}) => {
  const getDirection = () => direction === 'col' ? 'flex-col' : 'flex-row';
  const getAlign = () => `items-${align}`;
  const getJustify = () => `justify-${justify}`;
  const getWrap = () => wrap ? 'flex-wrap' : 'flex-nowrap';
  const getGap = () => {
    switch (gap) {
      case 'sm': return 'gap-2';
      case 'lg': return 'gap-6';
      case 'xl': return 'gap-8';
      default: return 'gap-4';
    }
  };

  return (
    <div className={cn(
      'flex',
      getDirection(),
      getAlign(),
      getJustify(),
      getWrap(),
      getGap(),
      className
    )}>
      {children}
    </div>
  );
};

export default ModernLayout;
