
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ClipboardList, BarChart3, UserCog } from 'lucide-react';
import BarberServiceOrders from './BarberServiceOrders';
import BarberBookingManagement from './BarberBookingManagement';
import BarberMetrics from './BarberMetrics';
import BarberProfileSettings from './BarberProfileSettings';

const BarberTabs: React.FC = () => {
  return (
    <Tabs defaultValue="orders" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 glass-effect">
        <TabsTrigger value="orders" className="text-xs md:text-sm">
          <ClipboardList className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Comandas</span>
        </TabsTrigger>
        <TabsTrigger value="bookings" className="text-xs md:text-sm">
          <Calendar className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Agendamentos</span>
        </TabsTrigger>
        <TabsTrigger value="metrics" className="text-xs md:text-sm">
          <BarChart3 className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Métricas</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="text-xs md:text-sm">
          <UserCog className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline">Perfil</span>
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

      <TabsContent value="profile">
        <BarberProfileSettings />
      </TabsContent>
    </Tabs>
  );
};

export default BarberTabs;
