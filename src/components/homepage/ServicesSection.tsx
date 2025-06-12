
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/data/types';
import { formatCurrency } from '@/utils/formatting';
import { Clock, Star, Scissors } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="services" className="py-16 md:py-20 section-luxury">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
            <Scissors className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">Nossos Serviços</span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury mb-4 md:mb-6">
            Experiências Premium
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cada serviço é uma obra de arte, executada com precisão e paixão pelos nossos mestres barbeiros
          </p>
        </div>

        {/* Services Grid - 3 columns on mobile, 4 on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="luxury-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 md:p-6">
                {/* Service Icon & Price */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Scissors className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="glass-effect px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-primary">{formatCurrency(service.price)}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-lg md:text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{service.duration} min</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-3 h-3 text-primary fill-current" 
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
        <div className="text-center mt-12 md:mt-16 animate-fade-in">
          <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
            Todos os serviços incluem consultoria personalizada e produtos premium
          </p>
          <div className="inline-flex items-center gap-2 text-primary">
            <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            <span className="font-medium text-sm md:text-base">Garantia de satisfação 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
