
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  error?: string;
  success?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({
  placeholder,
  value,
  onChange,
  onBlur,
  className,
  error,
  success,
  required,
  type = 'text',
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500';
    if (success) return 'border-green-500 focus:border-green-500';
    return 'border-border focus:border-primary';
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            'transition-all duration-200 rounded-lg',
            'focus:ring-2 focus:ring-primary/20',
            getBorderColor(),
            isFocused && 'shadow-md',
            className
          )}
        />
        
        {(error || success) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error && <AlertCircle className="w-4 h-4 text-red-500" />}
            {success && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
        )}
      </div>

      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'text-sm font-medium',
              error ? 'text-red-500' : 'text-green-500'
            )}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedInput;
