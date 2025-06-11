
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/data/types';
import { formatCurrency } from '@/utils/formatting';

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {service.imageUrl && (
                  <img 
                    src={service.imageUrl} 
                    alt={service.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{service.duration} min</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(service.price)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
