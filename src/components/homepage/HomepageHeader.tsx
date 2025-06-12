
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, UserCog, Menu, X, Phone, MapPin } from 'lucide-react';

interface HomepageHeaderProps {
  title: string;
  ctaText: string;
  onBookingOpen: () => void;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ title, ctaText, onBookingOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#services', label: 'Serviços' },
    { href: '#team', label: 'Equipe' },
    { href: '#about', label: 'Sobre' },
    { href: '#contact', label: 'Contato' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black/90 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Rua da Barbearia, 123 - São Paulo, SP</span>
              </div>
            </div>
            <div className="text-primary font-medium">
              Seg-Sáb: 9h às 18h
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-effect-strong shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-luxury tracking-wide">
                ELITE STUDIO
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="text-foreground hover-gold font-medium tracking-wide transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                onClick={onBookingOpen}
                className="hidden md:flex btn-luxury"
              >
                {ctaText}
              </Button>
              
              {/* Admin/Barber Buttons */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/admin/login">
                  <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
                    <Shield className="w-4 h-4 mr-1" />
                    Admin
                  </Button>
                </Link>
                <Link to="/barber/login">
                  <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
                    <UserCog className="w-4 h-4 mr-1" />
                    Barbeiro
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-effect-strong border-t border-primary/20">
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    className="block text-foreground hover-gold font-medium py-2 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-primary/20 space-y-3">
                  <Button 
                    onClick={() => {
                      onBookingOpen();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-luxury"
                  >
                    {ctaText}
                  </Button>
                  <div className="flex space-x-2">
                    <Link to="/admin/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-primary/30">
                        <Shield className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    </Link>
                    <Link to="/barber/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-primary/30">
                        <UserCog className="w-4 h-4 mr-1" />
                        Barbeiro
                      </Button>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HomepageHeader;
