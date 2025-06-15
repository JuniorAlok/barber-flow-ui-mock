
/**
 * Hero Section Component
 * Full-width, full-height hero with gradient background and responsive text
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Elite Studio Dashboard",
  subtitle = "Gerencie sua barbearia com tecnologia de ponta e design moderno",
  ctaText = "Começar Agora",
  onCtaClick
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-accent/20 rounded-full animate-pulse hidden md:block" />
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-accent/30 rounded-full animate-bounce hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 container-responsive text-center">
        <div
          className="max-w-4xl mx-auto space-y-8 animate-fade-in"
          style={{ animationDuration: '800ms' }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full animate-scale-in"
            style={{ animationDelay: '200ms' }}
          >
            <Star className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              Elite Barbershop Experience
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-responsive-xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <span className="block text-luxury mb-4">
              {title.split(' ')[0]}
            </span>
            <span className="block text-accent mb-4">
              {title.split(' ')[1]}
            </span>
            <span className="block text-foreground">
              {title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-responsive-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            {subtitle}
          </p>

          {/* CTA Button */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="btn-luxury text-lg px-12 py-6 font-bold tracking-wide uppercase hover-lift hover-glow"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div
            className="flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-in"
            style={{ animationDelay: '600ms' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Agendamentos Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Dashboard Completo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">Gestão Financeira</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
