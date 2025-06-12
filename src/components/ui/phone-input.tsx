
import React, { forwardRef, useState, useEffect } from 'react';
import { Input } from './input';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { formatPhoneNumber, validatePhoneNumber, createWhatsAppLink, createPhoneLink } from '@/utils/phoneUtils';
import { Phone, MessageCircle } from 'lucide-react';

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  autoFormat?: boolean;
  showActions?: boolean;
  whatsappMessage?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ 
    className, 
    value = '', 
    onChange, 
    onValidationChange, 
    autoFormat = true, 
    showActions = false,
    whatsappMessage,
    ...props 
  }, ref) => {
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

    const handlePhoneCall = () => {
      if (isValid && value) {
        window.open(createPhoneLink(value), '_self');
      }
    };

    const handleWhatsApp = () => {
      if (isValid && value) {
        window.open(createWhatsAppLink(value, whatsappMessage), '_blank');
      }
    };

    return (
      <div className="space-y-2">
        <div className="relative">
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
        </div>
        
        {showActions && isValid && value && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePhoneCall}
              className="flex-1"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
