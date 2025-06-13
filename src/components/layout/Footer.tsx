
/**
 * Footer Component
 * Responsive footer with links, social icons, and proper contrast
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Sobre', href: '/about' },
      { label: 'Serviços', href: '/services' },
      { label: 'Contato', href: '/contact' },
    ],
    support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Suporte', href: '/support' },
      { label: 'Política de Privacidade', href: '/privacy' },
    ],
    contact: [
      { icon: Phone, label: '(11) 99999-9999', href: 'tel:+5511999999999' },
      { icon: Mail, label: 'contato@elitestudio.com', href: 'mailto:contato@elitestudio.com' },
      { icon: MapPin, label: 'São Paulo, SP', href: '#' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-luxury mb-4">
              Elite Studio
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              A melhor experiência em barbearia com tecnologia moderna e 
              atendimento de excelência. Transformando o cuidado masculino 
              em arte.
            </p>
            <div className="flex gap-4">
              {/* Social Icons would go here */}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Contato</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                {footerLinks.contact.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    <contact.icon className="w-4 h-4" />
                    <span className="text-sm">{contact.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © {currentYear} Elite Studio. Feito com 
            <Heart className="w-4 h-4 text-red-500" />
            em São Paulo.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
