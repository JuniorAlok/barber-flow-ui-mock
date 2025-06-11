
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ClipboardList, BarChart3 } from 'lucide-react';
import BarberServiceOrders from './BarberServiceOrders';
import BarberBookingManagement from './BarberBookingManagement';
import BarberMetrics from './BarberMetrics';

const BarberTabs: React.FC = () => {
  return (
    <Tabs defaultValue="orders" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 glass-effect">
        <TabsTrigger value="orders">
          <ClipboardList className="w-4 h-4 mr-2" />
          Comandas
        </TabsTrigger>
        <TabsTrigger value="bookings">
          <Calendar className="w-4 h-4 mr-2" />
          Agendamentos
        </TabsTrigger>
        <TabsTrigger value="metrics">
          <BarChart3 className="w-4 h-4 mr-2" />
          Métricas
        </TabsTrigger>
      </TabsList>

      <TabsContent value="orders">
        <BarberServiceOrders />
      </TabsContent>

      <TabsContent value="bookings">
        <BarberBookingManagement />
      </TabsContent>

      <TabsContent value="metrics">
        <BarberMetrics />
      </TabsContent>
    </Tabs>
  );
};

export default BarberTabs;
