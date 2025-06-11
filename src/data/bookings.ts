
import { Booking } from './types';

export const bookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    serviceId: '1',
    barberId: '1',
    date: '2024-12-20',
    time: '10:00',
    status: 'confirmed',
    clientName: 'João Silva',
    clientEmail: 'joao@teste.com',
    clientPhone: '(11) 99999-9999',
    notes: 'Primeira vez na barbearia',
    totalAmount: 35
  },
  {
    id: '2',
    userId: '2',
    serviceId: '3',
    barberId: '2',
    date: '2024-12-21',
    time: '14:30',
    status: 'pending',
    clientName: 'Pedro Santos',
    clientEmail: 'pedro@teste.com',
    clientPhone: '(11) 88888-8888',
    totalAmount: 55
  },
  {
    id: '3',
    userId: '2',
    serviceId: '2',
    barberId: '3',
    date: '2024-12-19',
    time: '16:00',
    status: 'done',
    clientName: 'Maria Oliveira',
    clientEmail: 'maria@teste.com',
    clientPhone: '(11) 77777-7777',
    totalAmount: 25
  },
  {
    id: '4',
    userId: '2',
    serviceId: '4',
    barberId: '1',
    date: '2024-12-22',
    time: '09:00',
    status: 'confirmed',
    clientName: 'Lucas Silva',
    clientEmail: 'lucas@teste.com',
    clientPhone: '(11) 66666-6666',
    totalAmount: 28
  },
  {
    id: '5',
    userId: '2',
    serviceId: '1',
    barberId: '2',
    date: '2024-12-18',
    time: '11:30',
    status: 'cancelled',
    clientName: 'Bruno Costa',
    clientEmail: 'bruno@teste.com',
    clientPhone: '(11) 55555-5555',
    totalAmount: 35
  }
];
