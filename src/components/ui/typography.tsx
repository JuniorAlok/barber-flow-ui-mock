
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Title: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h1' 
}) => (
  <Component className={cn(
    'text-4xl md:text-5xl lg:text-6xl font-bold text-luxury tracking-tight leading-tight mb-4',
    className
  )}>
    {children}
  </Component>
);

export const SectionTitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h2' 
}) => (
  <Component className={cn(
    'text-2xl md:text-3xl font-bold text-foreground tracking-wide leading-tight mb-4',
    className
  )}>
    {children}
  </Component>
);

export const Subtitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h3' 
}) => (
  <Component className={cn(
    'text-xl md:text-2xl font-semibold text-foreground leading-tight mb-3',
    className
  )}>
    {children}
  </Component>
);

export const Body: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'p' 
}) => (
  <Component className={cn(
    'text-base md:text-lg text-muted-foreground leading-relaxed mb-4',
    className
  )}>
    {children}
  </Component>
);

export const Caption: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'span' 
}) => (
  <Component className={cn(
    'text-sm text-muted-foreground font-medium',
    className
  )}>
    {children}
  </Component>
);

export const Highlight: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'span' 
}) => (
  <Component className={cn(
    'text-luxury font-semibold',
    className
  )}>
    {children}
  </Component>
);

export const LuxuryHeading: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  as: Component = 'h1' 
}) => (
  <Component className={cn(
    'heading-luxury animate-glow',
    className
  )}>
    {children}
  </Component>
);
