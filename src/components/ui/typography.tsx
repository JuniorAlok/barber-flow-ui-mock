
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Title: React.FC<TypographyProps> = ({ children, className, as: Component = 'h1', ...props }) => (
  <Component
    className={cn(
      "font-display font-bold text-2xl lg:text-3xl text-foreground mb-4",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, className, as: Component = 'h2', ...props }) => (
  <Component
    className={cn(
      "font-sans font-semibold text-xl lg:text-2xl text-foreground mb-3",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const SectionTitle: React.FC<TypographyProps> = ({ children, className, as: Component = 'h3', ...props }) => (
  <Component
    className={cn(
      "font-sans font-medium text-lg lg:text-xl text-foreground mb-2",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Body: React.FC<TypographyProps> = ({ children, className, as: Component = 'p', ...props }) => (
  <Component
    className={cn(
      "font-sans text-base lg:text-lg text-muted-foreground leading-relaxed",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Caption: React.FC<TypographyProps> = ({ children, className, as: Component = 'span', ...props }) => (
  <Component
    className={cn(
      "font-sans text-sm md:text-base text-muted-foreground font-medium",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Highlight: React.FC<TypographyProps> = ({ children, className, as: Component = 'span', ...props }) => (
  <Component
    className={cn(
      "font-sans text-primary font-semibold",
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => (
  <hr className={cn("border-border my-4", className)} />
);
