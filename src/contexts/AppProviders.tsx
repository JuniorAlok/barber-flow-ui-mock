
import React, { ReactNode } from 'react';
import { MockDataProvider } from './MockDataContext';
import { AuthProvider } from './AuthContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MockDataProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </MockDataProvider>
  );
};
