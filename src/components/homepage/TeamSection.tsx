
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Scissors, Users } from 'lucide-react';
import { Barber } from '@/data/types';
import { useMockData } from '@/contexts/MockDataContext';

interface TeamSectionProps {
  barbers: Barber[];
  title?: string;
  subtitle?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ barbers, title, subtitle }) => {
  const { homeContent } = useMockData();
  
  return (
    <section id="team" className="py-8 md:py-20 section-premium">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-3 py-2 md:px-4 md:py-2 rounded-full mb-3 md:mb-4">
            <Users className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Nossa Equipe</span>
          </div>
          <h3 className="text-xl md:text-4xl lg:text-5xl font-bold text-luxury mb-2 md:mb-6">
            {title || homeContent.teamTitle || 'Mestres da Arte'}
          </h3>
          <p className="text-xs md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {subtitle || homeContent.teamSubtitle || 'Conheça os profissionais que elevaram a barbearia a um novo patamar de excelência'}
          </p>
        </div>

        {/* Team Grid - Same pattern as services: 3 columns on mobile */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 max-w-6xl mx-auto">
          {barbers.map((barber, index) => (
            <Card 
              key={barber.id} 
              className="luxury-card group text-center overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-2 md:p-8">
                {/* Barber Photo */}
                <div className="relative mx-auto mb-2 md:mb-6">
                  <div className="w-12 h-12 md:w-32 md:h-32 mx-auto relative">
                    <img 
                      src={barber.avatarUrl} 
                      alt={barber.name}
                      className="w-full h-full rounded-full object-cover border-1 md:border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  
                  {/* Award Badge */}
                  <div className="absolute -top-0.5 -right-0.5 md:-top-2 md:-right-2 glass-effect p-0.5 md:p-2 rounded-full">
                    <Award className="w-2 h-2 md:w-4 md:h-4 text-primary" />
                  </div>
                </div>

                {/* Barber Info */}
                <div className="space-y-1 md:space-y-4">
                  <h4 className="text-xs md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                    {barber.name}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-primary font-medium">
                    <Scissors className="w-2 h-2 md:w-4 md:h-4" />
                    <span className="text-xs md:text-base">{barber.specialization}</span>
                  </div>
                  
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {barber.experience}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 md:gap-2 pt-1 md:pt-4 border-t border-border/30">
                    <div className="flex items-center gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-2 h-2 md:w-4 md:h-4 text-primary fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-bold text-primary ml-1">{barber.rating}</span>
                  </div>
                  
                  {/* Specialties - Hidden on mobile to save space */}
                  <div className="hidden md:flex flex-wrap justify-center gap-2 mt-4">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 mt-6 md:mt-16 max-w-4xl mx-auto">
          {[
            { number: '10+', label: 'Anos de Experiência' },
            { number: '5000+', label: 'Clientes Satisfeitos' },
            { number: '100%', label: 'Satisfação Garantida' },
            { number: '24/7', label: 'Atendimento Premium' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center glass-effect p-2 md:p-6 rounded-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-lg md:text-3xl font-bold text-primary mb-1 md:mb-2">{stat.number}</div>
              <div className="text-xs md:text-sm text-gray-300 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
