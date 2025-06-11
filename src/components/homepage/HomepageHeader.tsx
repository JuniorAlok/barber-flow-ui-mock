
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, UserCog } from 'lucide-react';

interface HomepageHeaderProps {
  title: string;
  ctaText: string;
  onBookingOpen: () => void;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ title, ctaText, onBookingOpen }) => {
  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">Serviços</a>
          <a href="#team" className="text-foreground hover:text-primary transition-colors">Equipe</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">Sobre</a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contato</a>
        </nav>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={onBookingOpen}
            className="bg-primary hover:bg-primary/90"
          >
            {ctaText}
          </Button>
          <div className="flex space-x-1">
            <Link to="/admin/login">
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </Link>
            <Link to="/barber/login">
              <Button variant="outline" size="sm">
                <UserCog className="w-4 h-4 mr-1" />
                Barbeiro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomepageHeader;
