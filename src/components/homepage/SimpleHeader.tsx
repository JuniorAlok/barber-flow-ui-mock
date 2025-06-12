
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const SimpleHeader: React.FC = () => {
  return (
    <div className="bg-black/90 border-b border-primary/20 py-2 md:py-3 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Rua da Barbearia, 123 - São Paulo, SP</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary font-medium">
            <Clock className="w-4 h-4" />
            <span>Seg-Sáb: 9h às 18h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
