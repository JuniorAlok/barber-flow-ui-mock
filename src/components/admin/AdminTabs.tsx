
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Scissors, DollarSign, BarChart3, UserCheck, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardMetrics from '@/components/DashboardMetrics';
import FinanceModule from '@/components/FinanceModule';
import ClientManagement from '@/components/ClientManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import BarberManagement from '@/components/admin/BarberManagement';
import ConfigurationManagement from '@/components/admin/ConfigurationManagement';
import BottomNavigation from '@/components/ui/bottom-navigation';
import { PageTransition } from '@/components/ui/motion-components';

const AdminTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useIsMobile();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {!isMobile && (
          <TabsList className="grid w-full grid-cols-7 glass-effect">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="finances">
              <DollarSign className="w-4 h-4 mr-2" />
              Finanças
            </TabsTrigger>
            <TabsTrigger value="clients">
              <UserCheck className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="services">
              <Scissors className="w-4 h-4 mr-2" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="barbers">
              <Users className="w-4 h-4 mr-2" />
              Barbeiros
            </TabsTrigger>
            <TabsTrigger value="configurations">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>
        )}

        <div className={isMobile ? "pb-20" : ""}>
          <TabsContent value="dashboard">
            <PageTransition>
              <DashboardMetrics />
            </PageTransition>
          </TabsContent>

          <TabsContent value="bookings">
            <PageTransition>
              <BookingManagement />
            </PageTransition>
          </TabsContent>

          <TabsContent value="finances">
            <PageTransition>
              <FinanceModule />
            </PageTransition>
          </TabsContent>

          <TabsContent value="clients">
            <PageTransition>
              <ClientManagement />
            </PageTransition>
          </TabsContent>

          <TabsContent value="services">
            <PageTransition>
              <ServiceManagement />
            </PageTransition>
          </TabsContent>

          <TabsContent value="barbers">
            <PageTransition>
              <BarberManagement />
            </PageTransition>
          </TabsContent>

          <TabsContent value="configurations">
            <PageTransition>
              <ConfigurationManagement />
            </PageTransition>
          </TabsContent>
        </div>
      </Tabs>

      {isMobile && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
      )}
    </>
  );
};

export default AdminTabs;
