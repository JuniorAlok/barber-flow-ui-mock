
import React, { forwardRef, useState, useEffect } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { formatPhoneNumber, validatePhoneNumber } from '@/utils/phoneUtils';

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  autoFormat?: boolean;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = '', onChange, onValidationChange, autoFormat = true, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState(value);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const formatted = autoFormat ? formatPhoneNumber(value) : value;
      setFormattedValue(formatted);
      
      const valid = validatePhoneNumber(value);
      setIsValid(valid);
      onValidationChange?.(valid);
    }, [value, autoFormat, onValidationChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = autoFormat ? formatPhoneNumber(rawValue) : rawValue;
      
      setFormattedValue(formatted);
      onChange?.(rawValue);
      
      const valid = validatePhoneNumber(rawValue);
      setIsValid(valid);
      onValidationChange?.(valid);
    };

    return (
      <Input
        ref={ref}
        type="tel"
        value={formattedValue}
        onChange={handleChange}
        className={cn(
          className,
          !isValid && formattedValue && "border-destructive focus-visible:ring-destructive"
        )}
        placeholder="(11) 99999-9999"
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
