
import React from 'react';
import BarberHeader from '@/components/barber/BarberHeader';
import BarberTabs from '@/components/barber/BarberTabs';

const BarberDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <BarberHeader />
      <div className="container mx-auto p-3 md:p-6 max-w-7xl">
        <BarberTabs />
      </div>
    </div>
  );
};

export default BarberDashboard;
