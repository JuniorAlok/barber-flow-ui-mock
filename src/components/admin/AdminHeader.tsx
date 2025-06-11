
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold gold-gradient bg-clip-text text-transparent">
          IA Barber Admin
        </h1>
        <Button variant="outline" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
