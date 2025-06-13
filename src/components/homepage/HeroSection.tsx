
import React from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Star, Award } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onBookingOpen: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onBookingOpen
}) => {
  const { homeContent } = useMockData();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with modern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{
            backgroundImage: homeContent.heroImageUrl 
              ? `url('${homeContent.heroImageUrl}')` 
              : "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920')"
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      
      {/* Modern decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse hidden md:block" />
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-primary/30 rounded-full animate-glow hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping hidden lg:block" />
      
      {/* Content */}
      <div className="relative z-10 container-responsive text-center">
        <div className="max-w-4xl mx-auto mobile-spacing">
          {/* Modern badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 md:px-6 md:py-3 rounded-full animate-fade-in mb-6">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">
              Elite Barbershop Experience
            </span>
          </div>
          
          {/* Enhanced title with better responsiveness */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-slide-up mb-6">
            <span className="block text-foreground text-shadow-luxury mb-2 md:mb-4">
              {title.split(' ')[0]}
            </span>
            <span className="block text-luxury text-shadow-luxury mb-2 md:mb-4">
              {title.split(' ').slice(1, 2).join(' ')}
            </span>
            <span className="block text-foreground text-shadow-luxury">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in font-light mb-8">
            {subtitle}
          </p>
          
          {/* Modern features with better layout */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8 mb-8 animate-scale-in">
            {homeContent.heroFeature1 && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Scissors className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="font-medium text-sm md:text-base">
                  {homeContent.heroFeature1}
                </span>
              </div>
            )}
            {homeContent.heroFeature2 && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="font-medium text-sm md:text-base">
                  {homeContent.heroFeature2}
                </span>
              </div>
            )}
            {homeContent.heroFeature3 && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="font-medium text-sm md:text-base">
                  {homeContent.heroFeature3}
                </span>
              </div>
            )}
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="mb-6 animate-fade-in">
            <Button 
              size="lg" 
              onClick={onBookingOpen} 
              className="btn-luxury text-sm md:text-lg px-8 md:px-12 py-4 md:py-6 font-bold tracking-wide uppercase hover-lift hover-glow w-full sm:w-auto"
            >
              {ctaText}
            </Button>
          </div>
          
          {/* Enhanced appointment note */}
          <p className="text-xs md:text-sm text-muted-foreground animate-fade-in">
            Agendamentos disponíveis hoje • Consultoria gratuita
          </p>
        </div>
      </div>
      
      {/* Modern bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
