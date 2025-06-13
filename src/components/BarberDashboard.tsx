
import React from 'react';
import BarberHeader from '@/components/barber/BarberHeader';
import BarberTabs from '@/components/barber/BarberTabs';

const BarberDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <BarberHeader />
      <div className="container-responsive page-padding">
        <BarberTabs />
      </div>
    </div>
  );
};

export default BarberDashboard;
