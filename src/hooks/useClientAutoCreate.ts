
import { useMockData } from '@/contexts/MockDataContext';
import { Client } from '@/data/types';

export const useClientAutoCreate = () => {
  const { clients, setClients } = useMockData();

  const createClientIfNotExists = (clientData: {
    name: string;
    email: string;
    phone: string;
  }): void => {
    // Check if client already exists
    const existingClient = clients.find(
      client => 
        client.email === clientData.email || 
        client.phone === clientData.phone
    );

    if (existingClient) {
      return; // Client already exists
    }

    // Create new client
    const newClient: Client = {
      id: Date.now().toString(),
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      totalVisits: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      isVip: false
    };

    setClients(prev => [...prev, newClient]);
  };

  return { createClientIfNotExists };
};
