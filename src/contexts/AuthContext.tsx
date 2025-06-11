
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/data/mock';
import { useMockData } from './MockDataContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBarber: boolean;
  registerBarber: (barberData: any) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use useEffect to safely access the context after mounting
  const [barbers, setBarbers] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      const mockData = useMockData();
      setBarbers(mockData.barbers);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error accessing mock data:', error);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === 'admin@iabarber.com' && password === 'Admin123!') {
      setUser({
        id: '1',
        email: 'admin@iabarber.com',
        password: 'Admin123!',
        role: 'admin',
        name: 'Administrador'
      });
      return true;
    }

    // Barber login
    const barber = barbers.find(b => b.email === email && b.password === password);
    if (barber) {
      setUser({
        id: barber.id,
        email: barber.email,
        password: barber.password!,
        role: 'barber',
        name: barber.name
      });
      return true;
    }

    return false;
  };

  const registerBarber = (barberData: any): boolean => {
    try {
      const mockData = useMockData();
      const newBarber = {
        id: (barbers.length + 1).toString(),
        name: barberData.name,
        email: barberData.email,
        password: barberData.password,
        phone: barberData.phone,
        specialization: barberData.specialization || 'Generalista',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        experience: '0 anos de experiência',
        rating: 5.0,
        isActive: true,
        commission: 50
      };

      mockData.setBarbers(prev => [...prev, newBarber]);
      setBarbers(prev => [...prev, newBarber]);
      
      // Auto login after registration
      setUser({
        id: newBarber.id,
        email: newBarber.email,
        password: newBarber.password,
        role: 'barber',
        name: newBarber.name
      });

      return true;
    } catch (error) {
      console.error('Erro ao registrar barbeiro:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isBarber = user?.role === 'barber';

  // Don't render children until context is properly initialized
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isBarber,
      registerBarber,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
