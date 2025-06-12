
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
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-primary/30 rounded-full animate-glow"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full animate-fade-in">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Elite Barbershop Experience</span>
          </div>
          
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-slide-up">
            <span className="block text-white text-shadow-luxury mb-4">ELITE</span>
            <span className="block text-luxury text-shadow-luxury">STUDIO</span>
            <span className="block text-white text-shadow-luxury">BARBER</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light">
            Onde a tradição encontra a excelência. Experimente o mais alto padrão em cuidados masculinos com nossa equipe de mestres barbeiros.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 my-12 animate-scale-in">
            <div className="flex items-center gap-3 text-gray-300">
              <Scissors className="w-6 h-6 text-primary" />
              <span className="font-medium">Técnicas Clássicas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Star className="w-6 h-6 text-primary" />
              <span className="font-medium">Atendimento Premium</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Award className="w-6 h-6 text-primary" />
              <span className="font-medium">Mestres Barbeiros</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="pt-8 animate-fade-in">
            <Button 
              size="lg" 
              onClick={onBookingOpen}
              className="btn-luxury text-lg px-12 py-6 font-bold tracking-wide uppercase hover:scale-105 transition-transform duration-300"
            >
              {ctaText}
            </Button>
          </div>
          
          {/* Appointment note */}
          <p className="text-sm text-gray-400 animate-fade-in">
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
