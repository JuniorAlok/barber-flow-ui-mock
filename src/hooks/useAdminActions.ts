
import { useMockData } from '@/contexts/MockDataContext';
import { Service, Barber, Booking } from '@/data/mock';
import { toast } from '@/hooks/use-toast';

export const useAdminActions = () => {
  const { setServices, setBarbers, setBookings } = useMockData();

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString()
    };
    
    setServices(prev => [...prev, newService]);
    toast({
      title: "Serviço adicionado",
      description: "O novo serviço foi adicionado com sucesso.",
    });
  };

  const updateService = (serviceId: string, updates: Partial<Service>) => {
    setServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, ...updates }
          : service
      )
    );
    toast({
      title: "Serviço atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso.",
    });
  };

  const addBarber = (barber: Omit<Barber, 'id'>) => {
    const newBarber: Barber = {
      ...barber,
      id: Date.now().toString()
    };
    
    setBarbers(prev => [...prev, newBarber]);
    toast({
      title: "Barbeiro adicionado",
      description: "O novo barbeiro foi adicionado com sucesso.",
    });
  };

  const updateBarber = (barberId: string, updates: Partial<Barber>) => {
    setBarbers(prev => 
      prev.map(barber => 
        barber.id === barberId 
          ? { ...barber, ...updates }
          : barber
      )
    );
    toast({
      title: "Barbeiro atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const deleteBarber = (barberId: string) => {
    setBarbers(prev => prev.filter(barber => barber.id !== barberId));
    toast({
      title: "Barbeiro removido",
      description: "O barbeiro foi removido com sucesso.",
    });
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status }
          : booking
      )
    );
    toast({
      title: "Status atualizado",
      description: "O status do agendamento foi alterado com sucesso.",
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso.",
    });
  };

  return {
    addService,
    updateService,
    deleteService,
    addBarber,
    updateBarber,
    deleteBarber,
    updateBookingStatus,
    deleteBooking,
  };
};
