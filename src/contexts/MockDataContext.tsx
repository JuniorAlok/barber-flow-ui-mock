
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { users, services, barbers, bookings, homeContent, User, Service, Barber, Booking, HomeContent } from '@/data/mock';

interface MockDataContextType {
  users: User[];
  services: Service[];
  barbers: Barber[];
  bookings: Booking[];
  homeContent: HomeContent;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setBarbers: React.Dispatch<React.SetStateAction<Barber[]>>;
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  setHomeContent: React.Dispatch<React.SetStateAction<HomeContent>>;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mockUsers, setUsers] = useState<User[]>(users);
  const [mockServices, setServices] = useState<Service[]>(services);
  const [mockBarbers, setBarbers] = useState<Barber[]>(barbers);
  const [mockBookings, setBookings] = useState<Booking[]>(bookings);
  const [mockHomeContent, setHomeContent] = useState<HomeContent>(homeContent);

  return (
    <MockDataContext.Provider value={{
      users: mockUsers,
      services: mockServices,
      barbers: mockBarbers,
      bookings: mockBookings,
      homeContent: mockHomeContent,
      setUsers,
      setServices,
      setBarbers,
      setBookings,
      setHomeContent,
    }}>
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
