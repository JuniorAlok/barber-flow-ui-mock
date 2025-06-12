
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
    <section id="services" className="py-20 section-luxury">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-6">
            <Scissors className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">Nossos Serviços</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-luxury mb-6">
            Experiências Premium
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cada serviço é uma obra de arte, executada com precisão e paixão pelos nossos mestres barbeiros
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="luxury-card group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  {service.imageUrl ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Scissors className="w-12 h-12 text-primary" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 glass-effect px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-primary">{formatCurrency(service.price)}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
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
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-gray-300 mb-6">
            Todos os serviços incluem consultoria personalizada e produtos premium
          </p>
          <div className="inline-flex items-center gap-2 text-primary">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-medium">Garantia de satisfação 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
