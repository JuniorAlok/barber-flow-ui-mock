
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

  // WhatsApp number (cleaned for URL)
  const whatsappNumber = homeContent.contactPhone.replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de agendar um horário na Elite Studio Barber.');
  const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-12 md:py-20 section-premium">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Entre em Contato</span>
          </div>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-luxury mb-3 md:mb-6">
            Agende Sua Experiência
          </h3>
          <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Reserve seu horário e descubra por que somos a escolha dos homens mais exigentes
          </p>
        </div>

        {/* Contact Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-16">
          {contactInfo.map((info, index) => (
            <Card 
              key={index}
              className="luxury-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 md:p-8 text-center">
                <div className="mb-3 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                </div>
                
                <h4 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {info.title}
                </h4>
                
                <p className="text-gray-300 font-medium mb-1 md:mb-2 leading-relaxed text-xs md:text-base">
                  {info.content}
                </p>
                
                <p className="text-xs md:text-sm text-gray-400">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section with WhatsApp */}
        <div className="text-center glass-effect-strong p-6 md:p-12 rounded-2xl max-w-4xl mx-auto animate-fade-in">
          <h4 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            Pronto para uma experiência única?
          </h4>
          <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Junte-se aos milhares de clientes que escolheram a excelência. 
            Agende agora e ganhe 20% de desconto na primeira visita.
          </p>
          
          <div className="flex flex-col gap-4 justify-center items-center">
            <a 
              href={`tel:${homeContent.contactPhone}`}
              className="btn-luxury inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base w-full md:w-auto justify-center"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Agendar Agora
            </a>
            
            <div className="flex flex-col sm:flex-row gap-2 items-center text-sm md:text-base">
              <span className="text-gray-300">ou converse conosco no</span>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-8 md:mt-16 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-primary">4.9</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-sm md:text-base">★</span>
                ))}
              </div>
            </div>
            <div className="text-xs md:text-sm text-center">
              Avaliação média de <span className="text-primary font-semibold">+500 clientes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
