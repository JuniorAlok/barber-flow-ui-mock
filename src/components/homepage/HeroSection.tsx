
import React from 'react';
import { Button } from '@/components/ui/button';
import { Scissors, Star, Award } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onBookingOpen: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaText, onBookingOpen }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse hidden md:block"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-primary/30 rounded-full animate-glow hidden lg:block"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping hidden lg:block"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full animate-fade-in">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Elite Barbershop Experience</span>
          </div>
          
          {/* Main title - Improved responsiveness */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight animate-slide-up">
            <span className="block text-white text-shadow-luxury mb-2 md:mb-4">ELITE</span>
            <span className="block text-luxury text-shadow-luxury">STUDIO</span>
            <span className="block text-white text-shadow-luxury">BARBER</span>
          </h1>
          
          {/* Subtitle - Better responsive sizing */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light px-4">
            Onde a tradição encontra a excelência. Experimente o mais alto padrão em cuidados masculinos com nossa equipe de mestres barbeiros.
          </p>
          
          {/* Features - Responsive layout */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8 my-8 md:my-12 animate-scale-in">
            <div className="flex items-center gap-3 text-gray-300">
              <Scissors className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-medium text-sm md:text-base">Técnicas Clássicas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-medium text-sm md:text-base">Atendimento Premium</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-medium text-sm md:text-base">Mestres Barbeiros</span>
            </div>
          </div>
          
          {/* CTA Button - Responsive sizing */}
          <div className="pt-4 md:pt-8 animate-fade-in">
            <Button 
              size="lg" 
              onClick={onBookingOpen}
              className="btn-luxury text-base md:text-lg px-8 md:px-12 py-4 md:py-6 font-bold tracking-wide uppercase hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              {ctaText}
            </Button>
          </div>
          
          {/* Appointment note */}
          <p className="text-xs md:text-sm text-gray-400 animate-fade-in">
            Agendamentos disponíveis hoje • Consultoria gratuita
          </p>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
