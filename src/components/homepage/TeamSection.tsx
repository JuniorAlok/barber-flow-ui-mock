
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Barber } from '@/data/types';

interface TeamSectionProps {
  barbers: Barber[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ barbers }) => {
  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {barbers.map((barber) => (
            <Card key={barber.id} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <img 
                  src={barber.avatarUrl} 
                  alt={barber.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold mb-2">{barber.name}</h4>
                <p className="text-primary font-medium mb-2">{barber.specialization}</p>
                <p className="text-muted-foreground text-sm mb-3">{barber.experience}</p>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-sm font-medium">{barber.rating}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
