
import { Client } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@teste.com',
    phone: '(11) 99999-9999',
    totalVisits: 15,
    totalSpent: 525,
    lastVisit: '2024-12-20',
    birthday: '1985-03-15',
    isVip: true,
    notes: 'Cliente preferencial, sempre pontual'
  },
  {
    id: '2',
    name: 'Pedro Santos',
    email: 'pedro@teste.com',
    phone: '(11) 88888-8888',
    totalVisits: 8,
    totalSpent: 280,
    lastVisit: '2024-12-18',
    isVip: false
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@teste.com',
    phone: '(11) 77777-7777',
    totalVisits: 12,
    totalSpent: 360,
    lastVisit: '2024-12-19',
    isVip: true
  }
];
