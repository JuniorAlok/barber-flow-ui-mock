
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Scissors, Users } from 'lucide-react';
import { Barber } from '@/data/types';

interface TeamSectionProps {
  barbers: Barber[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ barbers }) => {
  return (
    <section id="team" className="py-20 section-premium">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-6">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">Nossa Equipe</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-luxury mb-6">
            Mestres da Arte
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conheça os profissionais que elevaram a barbearia a um novo patamar de excelência
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {barbers.map((barber, index) => (
            <Card 
              key={barber.id} 
              className="luxury-card group text-center overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                {/* Barber Photo */}
                <div className="relative mx-auto mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <img 
                      src={barber.avatarUrl} 
                      alt={barber.name}
                      className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  
                  {/* Award Badge */}
                  <div className="absolute -top-2 -right-2 glass-effect p-2 rounded-full">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Barber Info */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {barber.name}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Scissors className="w-4 h-4" />
                    <span>{barber.specialization}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {barber.experience}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-primary fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-primary ml-2">{barber.rating}</span>
                  </div>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Corte Clássico', 'Barba', 'Bigode'].map((specialty) => (
                      <span 
                        key={specialty}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { number: '10+', label: 'Anos de Experiência' },
            { number: '5000+', label: 'Clientes Satisfeitos' },
            { number: '100%', label: 'Satisfação Garantida' },
            { number: '24/7', label: 'Atendimento Premium' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center glass-effect p-6 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
