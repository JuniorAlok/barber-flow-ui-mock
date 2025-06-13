
import React from 'react';
import BarberHeader from '@/components/barber/BarberHeader';
import BarberTabs from '@/components/barber/BarberTabs';

const BarberDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <BarberHeader />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <BarberTabs />
      </div>
    </div>
  );
};

export default BarberDashboard;
