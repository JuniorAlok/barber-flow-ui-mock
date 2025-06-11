
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/data/mock';
import { barbers } from '@/data/barbers';

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

  const login = (email: string, password: string): boolean => {
    console.log('AuthContext: Login attempt for email:', email);
    
    // Admin login
    if (email === 'admin@iabarber.com' && password === 'Admin123!') {
      const adminUser = {
        id: '1',
        email: 'admin@iabarber.com',
        password: 'Admin123!',
        role: 'admin' as const,
        name: 'Administrador'
      };
      setUser(adminUser);
      console.log('AuthContext: Admin login successful:', adminUser);
      return true;
    }

    // Barber login - check against static barbers data
    console.log('AuthContext: Checking barbers data for login:', barbers.length, 'barbers available');
    const barber = barbers.find(b => b.email === email && b.password === password);
    if (barber) {
      const barberUser = {
        id: barber.id,
        email: barber.email,
        password: barber.password!,
        role: 'barber' as const,
        name: barber.name
      };
      setUser(barberUser);
      console.log('AuthContext: Barber login successful:', barberUser);
      return true;
    }

    console.log('AuthContext: Login failed for email:', email);
    console.log('AuthContext: Available barber emails:', barbers.map(b => b.email));
    return false;
  };

  const registerBarber = (barberData: any): boolean => {
    try {
      console.log('AuthContext: Registering barber:', barberData);
      
      // For now, we'll handle barber registration through events
      // This will be improved when we add proper state management
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

      // Emit custom event for barber registration
      window.dispatchEvent(new CustomEvent('barberRegistered', { detail: newBarber }));
      
      // Auto login after registration
      const barberUser = {
        id: newBarber.id,
        email: newBarber.email,
        password: newBarber.password,
        role: 'barber' as const,
        name: newBarber.name
      };
      setUser(barberUser);
      console.log('AuthContext: Barber registration and login successful:', barberUser);

      return true;
    } catch (error) {
      console.error('AuthContext: Error registering barber:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out user:', user);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isBarber = user?.role === 'barber';

  console.log('AuthContext: Current auth state:', { 
    user: user?.email, 
    role: user?.role,
    isAuthenticated, 
    isAdmin, 
    isBarber 
  });

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
