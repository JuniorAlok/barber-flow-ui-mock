
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuccessScreenProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'modal' | 'inline' | 'fullscreen';
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  subtitle,
  action,
  className,
  variant = 'modal'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'inline':
        return 'py-6 px-4 bg-neutral-900/50 rounded-xl';
      case 'fullscreen':
        return 'py-20 px-8 min-h-screen flex flex-col justify-center bg-black/90';
      default:
        return 'py-10 px-6 bg-black/80 rounded-xl shadow-xl';
    }
  };

  return (
    <div className={cn(
      "text-center animate-fade-in",
      getVariantStyles(),
      className
    )}>
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-green-500/20 rounded-full">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      {subtitle && (
        <p className="text-sm text-gray-300 mb-6 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium px-6 py-2 rounded-xl transition-all duration-300"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default SuccessScreen;
