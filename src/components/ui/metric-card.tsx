
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
  style?: React.CSSProperties;
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
  loading = false,
  style
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'positive':
        return 'border-green-500/20 bg-green-50 dark:bg-green-950/20';
      case 'negative':
        return 'border-red-500/20 bg-red-50 dark:bg-red-950/20';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-50 dark:bg-yellow-950/20';
      default:
        return '';
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
        return 'text-green-600 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-950/50 dark:border-green-800';
      case 'down':
        return 'text-red-600 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-950/50 dark:border-red-800';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (loading) {
    return (
      <Card className={cn("animate-pulse", getStatusColor(), className)}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      getStatusColor(),
      className
    )} style={style}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          {Icon && (
            <div className="p-2 rounded-lg bg-accent/10">
              <Icon className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight">
            {value}
          </p>
          
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            
            {trend && (
              <Badge 
                variant="outline" 
                className={cn("text-xs", getTrendColor())}
              >
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
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
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className={cn(
      'grid gap-4',
      getGridCols(),
      className
    )}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          {...metric}
          loading={loading}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};

export default MetricCard;
