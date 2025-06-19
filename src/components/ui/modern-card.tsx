
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'luxury' | 'glass' | 'gradient' | 'minimal';
  hover?: boolean;
  glow?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  hover = true,
  glow = false,
  className,
  headerClassName,
  contentClassName,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'luxury':
        return 'bg-gradient-to-br from-card via-card/95 to-card/80 border-2 border-border/30 shadow-2xl';
      case 'glass':
        return 'bg-background/60 backdrop-blur-xl border border-border/40 shadow-xl';
      case 'gradient':
        return 'bg-gradient-to-br from-primary/5 via-card to-secondary/5 border border-border/50 shadow-lg';
      case 'minimal':
        return 'bg-card/50 border border-border/20 shadow-sm';
      default:
        return 'bg-card border border-border shadow-md';
    }
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all duration-300',
        getVariantStyles(),
        hover && 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]',
        glow && 'hover:ring-2 hover:ring-primary/20',
        'animate-fade-in',
        className
      )}
    >
      {(title || subtitle || icon) && (
        <CardHeader className={cn('pb-4', headerClassName)}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                {icon}
              </div>
            )}
            <div className="flex-1">
              {title && (
                <CardTitle className="text-lg font-bold text-foreground mb-1">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      
      <CardContent className={cn('relative z-10', contentClassName)}>
        {children}
      </CardContent>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
    </Card>
  );
};

export default ModernCard;
