
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Scissors, DollarSign, BarChart3, UserCheck, Settings } from 'lucide-react';
import DashboardMetrics from '@/components/DashboardMetrics';
import FinanceModule from '@/components/FinanceModule';
import ClientManagement from '@/components/ClientManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import ServiceManagement from '@/components/admin/ServiceManagement';
import BarberManagement from '@/components/admin/BarberManagement';
import ConfigurationManagement from '@/components/admin/ConfigurationManagement';

const AdminTabs: React.FC = () => {
  return (
    <Tabs defaultValue="dashboard" className="space-y-6">
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

      <TabsContent value="dashboard">
        <DashboardMetrics />
      </TabsContent>

      <TabsContent value="bookings">
        <BookingManagement />
      </TabsContent>

      <TabsContent value="finances">
        <FinanceModule />
      </TabsContent>

      <TabsContent value="clients">
        <ClientManagement />
      </TabsContent>

      <TabsContent value="services">
        <ServiceManagement />
      </TabsContent>

      <TabsContent value="barbers">
        <BarberManagement />
      </TabsContent>

      <TabsContent value="configurations">
        <ConfigurationManagement />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
