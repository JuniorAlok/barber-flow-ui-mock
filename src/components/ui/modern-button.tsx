
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'luxury' | 'glass' | 'gradient' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  loading?: boolean;
  success?: boolean;
  pulse?: boolean;
  glow?: boolean;
  asChild?: boolean;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  success = false,
  pulse = false,
  glow = false,
  className,
  disabled,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'luxury':
        return 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold shadow-xl hover:shadow-2xl border-0';
      case 'glass':
        return 'bg-background/60 backdrop-blur-md border border-border/50 hover:bg-background/80 hover:border-border/70 text-foreground shadow-lg hover:shadow-xl';
      case 'gradient':
        return 'bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl border-0';
      case 'outline':
        return 'border-2 border-primary/50 bg-transparent hover:bg-primary/10 hover:border-primary text-primary shadow-md hover:shadow-lg';
      case 'ghost':
        return 'bg-transparent hover:bg-accent/50 text-foreground shadow-none hover:shadow-md';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-4 text-sm rounded-lg';
      case 'lg':
        return 'h-12 px-8 text-base rounded-xl';
      case 'xl':
        return 'h-14 px-10 text-lg rounded-xl';
      default:
        return 'h-10 px-6 text-sm rounded-xl';
    }
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300 font-semibold',
        'transform hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-primary/20',
        getVariantStyles(),
        getSizeStyles(),
        success && 'bg-green-600 hover:bg-green-700 text-white',
        pulse && 'animate-pulse',
        glow && 'animate-glow',
        isPressed && 'scale-95',
        (loading || disabled) && 'pointer-events-none opacity-70',
        className
      )}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{children}</span>
      </div>
      
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </Button>
  );
};

export default ModernButton;
