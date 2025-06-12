
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { formatPhoneNumber, createPhoneLink } from '@/utils/formatting';

const SimpleHeader: React.FC = () => {
  const { homeContent } = useMockData();
  
  return (
    <div className="bg-black/90 border-b border-primary/20 py-2 md:py-4 sticky top-0 z-40">
      <div className="container mx-auto px-3 md:px-4">
        {/* Mobile: Stacked layout */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center text-xs md:text-sm">
          {/* Contact Info */}
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6 text-gray-300">
            <a 
              href={createPhoneLink(homeContent.contactPhone)}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
              <span className="font-medium">{formatPhoneNumber(homeContent.contactPhone)}</span>
            </a>
            <div className="flex items-center gap-2 md:hidden">
              <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-xs truncate">{homeContent.contactAddress}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{homeContent.contactAddress}</span>
            </div>
          </div>
          
          {/* Working Hours */}
          <div className="flex items-center justify-between md:justify-end gap-2 text-primary font-medium">
            <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm">{homeContent.workingHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
