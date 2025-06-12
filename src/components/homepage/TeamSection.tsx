
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Scissors, Users } from 'lucide-react';
import { Barber } from '@/data/types';

interface TeamSectionProps {
  barbers: Barber[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ barbers }) => {
  return (
    <section id="team" className="py-16 md:py-20 section-premium">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
            <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">Nossa Equipe</span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-luxury mb-4 md:mb-6">
            Mestres da Arte
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conheça os profissionais que elevaram a barbearia a um novo patamar de excelência
          </p>
        </div>

        {/* Team Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {barbers.map((barber, index) => (
            <Card 
              key={barber.id} 
              className="luxury-card group text-center overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 md:p-8">
                {/* Barber Photo */}
                <div className="relative mx-auto mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto relative">
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
                    <Award className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  </div>
                </div>

                {/* Barber Info */}
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {barber.name}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Scissors className="w-4 h-4" />
                    <span className="text-sm md:text-base">{barber.specialization}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {barber.experience}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 pt-3 md:pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-3 h-3 md:w-4 md:h-4 text-primary fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-primary ml-2">{barber.rating}</span>
                  </div>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-4">
                    {['Corte Clássico', 'Barba', 'Bigode'].map((specialty) => (
                      <span 
                        key={specialty}
                        className="text-xs px-2 py-1 md:px-3 bg-primary/10 text-primary rounded-full border border-primary/20"
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

        {/* Team Stats - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto">
          {[
            { number: '10+', label: 'Anos de Experiência' },
            { number: '5000+', label: 'Clientes Satisfeitos' },
            { number: '100%', label: 'Satisfação Garantida' },
            { number: '24/7', label: 'Atendimento Premium' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center glass-effect p-4 md:p-6 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">{stat.number}</div>
              <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
