
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TypographyProps> = ({ children, className }) => (
  <h1 className={cn(
    "font-display font-bold text-2xl lg:text-3xl text-foreground mb-4",
    className
  )}>
    {children}
  </h1>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, className }) => (
  <h2 className={cn(
    "font-sans font-semibold text-xl lg:text-2xl text-foreground mb-3",
    className
  )}>
    {children}
  </h2>
);

export const SectionTitle: React.FC<TypographyProps> = ({ children, className }) => (
  <h3 className={cn(
    "font-sans font-medium text-lg lg:text-xl text-foreground mb-2",
    className
  )}>
    {children}
  </h3>
);

export const Body: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={cn(
    "font-sans text-base lg:text-lg text-muted-foreground leading-relaxed",
    className
  )}>
    {children}
  </p>
);

export const Caption: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={cn(
    "font-sans text-sm md:text-base text-muted-foreground font-medium",
    className
  )}>
    {children}
  </span>
);

export const Highlight: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={cn(
    "font-sans text-primary font-semibold",
    className
  )}>
    {children}
  </span>
);

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => (
  <hr className={cn("border-border my-4", className)} />
);
