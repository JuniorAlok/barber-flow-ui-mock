
import React from 'react';
import BarberHeader from '@/components/barber/BarberHeader';
import BarberTabs from '@/components/barber/BarberTabs';
import ModernLayout from '@/components/ui/modern-layout';

const BarberDashboard: React.FC = () => {
  return (
    <ModernLayout variant="dashboard">
      <BarberHeader />
      <div className="container-responsive page-padding">
        <BarberTabs />
      </div>
    </ModernLayout>
  );
};

export default BarberDashboard;
