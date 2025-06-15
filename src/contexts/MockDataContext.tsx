
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { 
  users, services, barbers, bookings, clients, transactions, dashboardMetrics, homeContent,
  User, Service, Barber, Booking, Client, Transaction, DashboardMetrics, HomeContent, ServiceOrder 
} from '@/data/mock';
import { serviceOrders } from '@/data/serviceOrders';

interface MockDataContextType {
  users: User[];
  services: Service[];
  barbers: Barber[];
  bookings: Booking[];
  clients: Client[];
  transactions: Transaction[];
  serviceOrders: ServiceOrder[];
  dashboardMetrics: DashboardMetrics;
  homeContent: HomeContent;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setBarbers: React.Dispatch<React.SetStateAction<Barber[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setServiceOrders: React.Dispatch<React.SetStateAction<ServiceOrder[]>>;
  setDashboardMetrics: React.Dispatch<React.SetStateAction<DashboardMetrics>>;
  setHomeContent: React.Dispatch<React.SetStateAction<HomeContent>>;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mockUsers, setUsers] = useState<User[]>(users);
  const [mockServices, setServices] = useState<Service[]>(services);
  const [mockBarbers, setBarbers] = useState<Barber[]>(barbers);
  const [mockBookings, setBookings] = useState<Booking[]>(bookings);
  const [mockClients, setClients] = useState<Client[]>(clients);
  const [mockTransactions, setTransactions] = useState<Transaction[]>(transactions);
  const [mockServiceOrders, setServiceOrders] = useState<ServiceOrder[]>(serviceOrders);
  const [mockDashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>(dashboardMetrics);
  const [mockHomeContent, setHomeContent] = useState<HomeContent>(homeContent);

  const value = useMemo(() => ({
    users: mockUsers,
    services: mockServices,
    barbers: mockBarbers,
    bookings: mockBookings,
    clients: mockClients,
    transactions: mockTransactions,
    serviceOrders: mockServiceOrders,
    dashboardMetrics: mockDashboardMetrics,
    homeContent: mockHomeContent,
    setUsers,
    setServices,
    setBarbers,
    setBookings,
    setClients,
    setTransactions,
    setServiceOrders,
    setDashboardMetrics,
    setHomeContent,
  }), [
    mockUsers,
    mockServices,
    mockBarbers,
    mockBookings,
    mockClients,
    mockTransactions,
    mockServiceOrders,
    mockDashboardMetrics,
    mockHomeContent,
  ]);

  // Listen for barber registration events from AuthContext
  useEffect(() => {
    const handleBarberRegistration = (event: CustomEvent) => {
      const newBarber = event.detail;
      setBarbers(prev => [...prev, newBarber]);
    };

    window.addEventListener('barberRegistered', handleBarberRegistration as EventListener);
    
    return () => {
      window.removeEventListener('barberRegistered', handleBarberRegistration as EventListener);
    };
  }, []);

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
