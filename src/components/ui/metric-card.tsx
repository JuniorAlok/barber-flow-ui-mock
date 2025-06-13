
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  status?: 'positive' | 'negative' | 'neutral' | 'warning';
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  status = 'neutral',
  className,
  variant = 'default',
  loading = false
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'positive':
        return 'border-green-500/20 bg-green-500/5';
      case 'negative':
        return 'border-red-500/20 bg-red-500/5';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/5';
      default:
        return 'border-border/20';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'down':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border/20';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/3"></div>
        </div>
      );
    }

    switch (variant) {
      case 'compact':
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{title}</p>
              <p className="text-lg font-bold">{value}</p>
            </div>
            {Icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        );

      case 'detailed':
        return (
          <>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {title}
                </CardTitle>
                {Icon && (
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-2xl font-bold tracking-tight">
                  {value}
                </div>
                {description && (
                  <p className="text-xs text-muted-foreground">
                    {description}
                  </p>
                )}
                {trend && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'text-xs font-medium border',
                      getTrendColor()
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {getTrendIcon()}
                      <span>{Math.abs(trend.value)}%</span>
                      <span>{trend.label}</span>
                    </div>
                  </Badge>
                )}
              </div>
            </CardContent>
          </>
        );

      default:
        return (
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              {Icon && (
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold tracking-tight">
                {value}
              </p>
              <div className="flex items-center justify-between">
                {description && (
                  <p className="text-xs text-muted-foreground flex-1">
                    {description}
                  </p>
                )}
                {trend && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'text-xs font-medium ml-2',
                      getTrendColor()
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {getTrendIcon()}
                      {Math.abs(trend.value)}%
                    </div>
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        );
    }
  };

  if (variant === 'compact') {
    return (
      <Card className={cn(
        'metric-card hover-lift hover-glow',
        getStatusColor(),
        className
      )}>
        <CardContent className="p-4">
          {renderContent()}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      'metric-card hover-lift hover-glow',
      getStatusColor(),
      className
    )}>
      {renderContent()}
    </Card>
  );
};

interface MetricGridProps {
  metrics: Array<MetricCardProps>;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  loading?: boolean;
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  metrics,
  cols = 4,
  className,
  loading = false
}) => {
  const getGridCols = () => {
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className={cn(
      'grid gap-4 md:gap-6',
      getGridCols(),
      className
    )}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          {...metric}
          loading={loading}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default MetricCard;
