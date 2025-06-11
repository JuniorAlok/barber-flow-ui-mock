
import { useMemo } from 'react';
import { useMockData } from '@/contexts/MockDataContext';
import { Client } from '@/data/types';

export const useClientSearch = (searchTerm: string) => {
  const { clients } = useMockData();

  const searchResults = useMemo(() => {
    if (searchTerm.length < 4) {
      return [];
    }

    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  return searchResults;
};
