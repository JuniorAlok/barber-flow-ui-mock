
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/data/types';
import { formatCurrency } from '@/utils/formatting';
import { Clock, Star, Scissors } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const { homeContent } = useMockData();
  
  return (
    <section id="services" className="py-8 md:py-20 section-luxury">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-3 py-2 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
            <Scissors className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Nossos Serviços</span>
          </div>
          <h3 className="text-xl md:text-4xl lg:text-5xl font-bold text-luxury mb-2 md:mb-6">
            {homeContent.servicesTitle || 'Experiências Premium'}
          </h3>
          <p className="text-xs md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {homeContent.servicesSubtitle || 'Cada serviço é uma obra de arte, executada com precisão e paixão pelos nossos mestres barbeiros'}
          </p>
        </div>

        {/* Services Grid - Always 3 columns on mobile */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="luxury-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-2 md:p-6">
                {/* Service Icon & Price */}
                <div className="flex flex-col items-center mb-2 md:mb-4">
                  <div className="w-6 h-6 md:w-16 md:h-16 glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-1 md:mb-2">
                    <Scissors className="w-3 h-3 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="glass-effect px-1 py-0.5 md:px-2 md:py-1 rounded-full">
                    <span className="text-xs md:text-sm font-bold text-primary">{formatCurrency(service.price)}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-1 md:space-y-4 text-center">
                  <h4 className="text-xs md:text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-400 leading-relaxed text-xs md:text-sm line-clamp-2">
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex flex-col md:flex-row items-center justify-between pt-1 md:pt-4 border-t border-border/30 gap-1 md:gap-2">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock className="w-2 h-2 md:w-4 md:h-4 text-primary" />
                      <span className="text-xs md:text-sm font-medium">{service.duration} min</span>
                    </div>
                    
                    <div className="flex items-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-2 h-2 md:w-3 md:h-3 text-primary fill-current" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 md:mt-16 animate-fade-in">
          <p className="text-gray-300 mb-2 md:mb-6 text-xs md:text-base px-4">
            Todos os serviços incluem consultoria personalizada e produtos premium
          </p>
          <div className="inline-flex items-center gap-1 md:gap-2 text-primary">
            <Star className="w-3 h-3 md:w-5 md:h-5 fill-current" />
            <span className="font-medium text-xs md:text-base">Garantia de satisfação 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
