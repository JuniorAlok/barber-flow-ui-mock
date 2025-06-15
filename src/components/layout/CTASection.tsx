/**
 * Call-to-Action Section Component
 * Contrasting section with accent background and luxury button
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Pronto para transformar sua experiência?",
  subtitle = "Junte-se a centenas de clientes satisfeitos e descubra o que é um atendimento de verdadeira excelência.",
  buttonText = "Começar Agora",
  onButtonClick,
  className
}) => {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`}>
      {/* Background with accent color */}
      <div className="absolute inset-0 bg-accent">
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/95 to-accent/90" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-accent-foreground/20 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-accent-foreground/30 rounded-full animate-bounce" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent-foreground/40 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-foreground/50 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 container-responsive text-center">
        <div
          className="max-w-4xl mx-auto animate-fade-in-up"
        >
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-accent-foreground/10 rounded-full mb-8 animate-scale-in"
            style={{ animationDelay: '200ms' }}
          >
            <Sparkles className="w-8 h-8 text-accent-foreground" />
          </div>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-accent-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            {subtitle}
          </p>

          {/* CTA Button */}
          <div
            className="animate-fade-in-up transition-transform duration-300 hover:scale-105 active:scale-95"
            style={{ animationDelay: '300ms' }}
          >
            <Button
              size="lg"
              onClick={onButtonClick}
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 text-lg px-12 py-6 font-bold tracking-wide uppercase shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Additional info */}
          <p
            className="text-accent-foreground/70 text-sm mt-6 animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            Sem compromisso • Consulta gratuita • Atendimento imediato
          </p>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/20 to-transparent" />
    </section>
  );
};

export default CTASection;
