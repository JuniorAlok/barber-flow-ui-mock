
import React from 'react';
import { Award, Shield, Star, Clock } from 'lucide-react';

interface AboutSectionProps {
  title: string;
  description: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, description }) => {
  return (
    <section id="about" className="py-20 section-luxury">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-6">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Nossa História</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-luxury leading-tight">
              {title}
            </h3>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-6 pt-6">
              <div className="flex items-start gap-4">
                <div className="glass-effect p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Tradição e Qualidade</h4>
                  <p className="text-gray-400">Técnicas clássicas preservadas através das gerações, combinadas com as mais modernas tendências.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="glass-effect p-3 rounded-lg">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Excelência em Atendimento</h4>
                  <p className="text-gray-400">Cada cliente recebe atenção personalizada e cuidados premium em um ambiente sofisticado.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="glass-effect p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Compromisso com o Tempo</h4>
                  <p className="text-gray-400">Respeitamos o seu tempo com agendamentos pontuais e serviços executados com precisão.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Elements */}
          <div className="relative animate-scale-in">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="luxury-card p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-gray-300">Anos de Tradição</div>
                </div>
                <div className="luxury-card p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-gray-300">Satisfação</div>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="luxury-card p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-sm text-gray-300">Clientes</div>
                </div>
                <div className="luxury-card p-8 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-gray-300">Atendimento</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border border-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/20 rounded-full animate-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
