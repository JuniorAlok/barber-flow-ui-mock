
import React from 'react';
import { cn } from '@/lib/utils';

interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full",
              i + 1 <= currentStep ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Passo {currentStep} de {totalSteps}
      </p>
    </div>
  );
};

export default BookingProgress;
