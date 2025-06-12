
import React from 'react';
import { Scissors, Phone, MapPin, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

interface HomepageFooterProps {
  title: string;
}

const HomepageFooter: React.FC<HomepageFooterProps> = ({ title }) => {
  return (
    <footer className="bg-black border-t border-primary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-luxury">ELITE STUDIO</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Onde a tradição encontra a modernidade. Experimente o mais alto padrão em cuidados masculinos.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, index) => (
                <a 
                  key={index}
                  href="#"
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:border-primary/40 transition-colors duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Links Rápidos</h4>
            <nav className="space-y-3">
              {['Serviços', 'Equipe', 'Sobre', 'Contato', 'Agendamento'].map((link) => (
                <a 
                  key={link}
                  href="#"
                  className="block text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Serviços</h4>
            <nav className="space-y-3">
              {['Corte Clássico', 'Barba & Bigode', 'Tratamentos', 'Styling', 'Consultoria'].map((service) => (
                <a 
                  key={service}
                  href="#"
                  className="block text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  {service}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-gray-300 font-medium">(11) 99999-9999</p>
                  <p className="text-sm text-gray-400">WhatsApp disponível</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-gray-300">Rua da Barbearia, 123</p>
                  <p className="text-sm text-gray-400">São Paulo, SP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <p className="text-gray-300">contato@iabarber.com</p>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-gray-300">Seg-Sáb: 9h às 18h</p>
                  <p className="text-sm text-gray-400">Dom: Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Elite Studio Barber. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomepageFooter;
