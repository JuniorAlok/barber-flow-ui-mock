
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import HomePage from '@/components/HomePage';
import AdminDashboard from '@/components/AdminDashboard';
import LoginModal from '@/components/LoginModal';
import { MockDataProvider } from '@/contexts/MockDataContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (isAuthenticated && isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="relative">
      <HomePage />
      
      {/* Admin Access Button - Fixed Position */}
      <Button
        className="fixed bottom-4 left-4 z-50 bg-primary hover:bg-primary/90"
        onClick={() => setIsLoginModalOpen(true)}
        size="sm"
      >
        <Shield className="w-4 h-4 mr-2" />
        Admin
      </Button>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <MockDataProvider>
        <AppContent />
      </MockDataProvider>
    </AuthProvider>
  );
};

export default Index;
