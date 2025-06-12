
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const SimpleHeader: React.FC = () => {
  return (
    <div className="bg-black/90 border-b border-primary/20 py-3 md:py-4 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Mobile: 2 columns layout */}
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:justify-between md:items-center text-xs md:text-sm">
          {/* Left column - Contact Info */}
          <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
              <span className="truncate">(11) 99999-9999</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Rua da Barbearia, 123 - São Paulo, SP</span>
            </div>
          </div>
          
          {/* Right column - Working Hours */}
          <div className="flex items-center justify-end gap-2 text-primary font-medium">
            <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">Seg-Sáb: 9h às 18h</span>
          </div>
        </div>
        
        {/* Mobile: Address row */}
        <div className="md:hidden mt-2 flex items-center gap-2 text-gray-300 text-xs">
          <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
          <span className="truncate">Rua da Barbearia, 123 - São Paulo, SP</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
