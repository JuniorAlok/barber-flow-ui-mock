
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';
import { HomeContent } from '@/data/types';

interface ContactSectionProps {
  homeContent: HomeContent;
}

const ContactSection: React.FC<ContactSectionProps> = ({ homeContent }) => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: homeContent.contactPhone,
      description: 'Ligue para agendar',
      action: `tel:${homeContent.contactPhone}`
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: homeContent.contactAddress,
      description: 'Venha nos visitar',
      action: '#'
    },
    {
      icon: Mail,
      title: 'Email',
      content: homeContent.contactEmail,
      description: 'Envie uma mensagem',
      action: `mailto:${homeContent.contactEmail}`
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: homeContent.workingHours,
      description: 'Estamos abertos',
      action: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 section-premium">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-6">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">Entre em Contato</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-luxury mb-6">
            Agende Sua Experiência
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Reserve seu horário e descubra por que somos a escolha dos homens mais exigentes
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={index}
              className="luxury-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {info.title}
                </h4>
                
                <p className="text-gray-300 font-medium mb-2 leading-relaxed">
                  {info.content}
                </p>
                
                <p className="text-sm text-gray-400">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center glass-effect-strong p-12 rounded-2xl max-w-4xl mx-auto animate-fade-in">
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto para uma experiência única?
          </h4>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se aos milhares de clientes que escolheram a excelência. 
            Agende agora e ganhe 20% de desconto na primeira visita.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={`tel:${homeContent.contactPhone}`}
              className="btn-luxury inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Ligar Agora
            </a>
            <a 
              href={`mailto:${homeContent.contactEmail}`}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
            >
              Ou envie um email →
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">4.9</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
            </div>
            <div className="text-sm">
              Avaliação média de <span className="text-primary font-semibold">+500 clientes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
