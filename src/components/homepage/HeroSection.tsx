
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onBookingOpen: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaText, onBookingOpen }) => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          {title}
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button 
          size="lg" 
          onClick={onBookingOpen}
          className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-pulse"
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
