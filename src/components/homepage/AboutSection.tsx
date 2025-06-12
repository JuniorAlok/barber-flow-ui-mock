
import React from 'react';
import { Award, Shield, Star, Clock } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';

interface AboutSectionProps {
  title: string;
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, description }) => {
  const { homeContent } = useMockData();
  
  return (
    <section id="about" className="py-12 md:py-20 section-luxury">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-4 md:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-effect px-3 py-2 md:px-6 md:py-3 rounded-full mb-3 md:mb-6">
              <Award className="w-3 h-3 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">Nossa História</span>
            </div>
            
            <h3 className="text-2xl md:text-4xl md:text-5xl font-bold text-luxury leading-tight">
              {title}
            </h3>
            
            <p className="text-sm md:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-3 md:space-y-6 pt-3 md:pt-6">
              {homeContent.aboutFeature1Title && (
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="glass-effect p-1.5 md:p-3 rounded-lg">
                    <Shield className="w-3 h-3 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                      {homeContent.aboutFeature1Title}
                    </h4>
                    <p className="text-xs md:text-base text-gray-400">
                      {homeContent.aboutFeature1Description}
                    </p>
                  </div>
                </div>
              )}
              
              {homeContent.aboutFeature2Title && (
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="glass-effect p-1.5 md:p-3 rounded-lg">
                    <Star className="w-3 h-3 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                      {homeContent.aboutFeature2Title}
                    </h4>
                    <p className="text-xs md:text-base text-gray-400">
                      {homeContent.aboutFeature2Description}
                    </p>
                  </div>
                </div>
              )}
              
              {homeContent.aboutFeature3Title && (
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="glass-effect p-1.5 md:p-3 rounded-lg">
                    <Clock className="w-3 h-3 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                      {homeContent.aboutFeature3Title}
                    </h4>
                    <p className="text-xs md:text-base text-gray-400">
                      {homeContent.aboutFeature3Description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="relative animate-scale-in">
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="space-y-3 md:space-y-6">
                <div className="luxury-card p-4 md:p-8 text-center">
                  <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">10+</div>
                  <div className="text-xs md:text-sm text-gray-300">Anos de Tradição</div>
                </div>
                <div className="luxury-card p-4 md:p-8 text-center">
                  <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">100%</div>
                  <div className="text-xs md:text-sm text-gray-300">Satisfação</div>
                </div>
              </div>
              <div className="space-y-3 md:space-y-6 pt-6 md:pt-12">
                <div className="luxury-card p-4 md:p-8 text-center">
                  <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">5000+</div>
                  <div className="text-xs md:text-sm text-gray-300">Clientes</div>
                </div>
                <div className="luxury-card p-4 md:p-8 text-center">
                  <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">24/7</div>
                  <div className="text-xs md:text-sm text-gray-300">Atendimento</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 w-8 h-8 md:w-16 md:h-16 border border-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 bg-primary/20 rounded-full animate-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
