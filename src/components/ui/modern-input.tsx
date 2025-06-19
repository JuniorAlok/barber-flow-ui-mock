
import React, { useState, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'luxury' | 'glass';
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
  ({ 
    label, 
    error, 
    success, 
    helper, 
    icon, 
    variant = 'default',
    className, 
    type,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'luxury':
          return 'bg-gradient-to-r from-background/90 to-background/95 border-2 border-border/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10';
        case 'glass':
          return 'bg-background/60 backdrop-blur-md border border-border/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20';
        default:
          return 'bg-background border border-border focus:border-primary';
      }
    };

    const getStatusIcon = () => {
      if (error) return <AlertCircle className="w-4 h-4 text-red-500" />;
      if (success) return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      return null;
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label className="text-sm font-medium text-foreground">
            {label}
          </Label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          
          <Input
            ref={ref}
            type={inputType}
            className={cn(
              'transition-all duration-200 rounded-xl h-12',
              getVariantStyles(),
              icon && 'pl-10',
              (isPassword || error || success) && 'pr-10',
              isFocused && 'shadow-lg transform scale-[1.01]',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {getStatusIcon()}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
        
        {(error || success || helper) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-red-500 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{error}</span>
              </p>
            )}
            {success && (
              <p className="text-sm text-green-500 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{success}</span>
              </p>
            )}
            {helper && !error && !success && (
              <p className="text-sm text-muted-foreground">{helper}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;
