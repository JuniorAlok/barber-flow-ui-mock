
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, UserCog } from 'lucide-react';

const FloatingLoginIcons: React.FC = () => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      <Link to="/admin/login">
        <Button 
          size="sm" 
          className="glass-effect-strong border border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300 w-12 h-12 p-0 rounded-full"
          title="Acesso Admin"
        >
          <Shield className="w-5 h-5 text-primary" />
        </Button>
      </Link>
      
      <Link to="/barber/login">
        <Button 
          size="sm" 
          className="glass-effect-strong border border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300 w-12 h-12 p-0 rounded-full"
          title="Acesso Barbeiro"
        >
          <UserCog className="w-5 h-5 text-primary" />
        </Button>
      </Link>
    </div>
  );
};

export default FloatingLoginIcons;
