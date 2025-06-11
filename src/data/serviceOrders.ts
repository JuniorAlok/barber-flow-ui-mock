
import { ServiceOrder } from './types';

export const serviceOrders: ServiceOrder[] = [
  {
    id: '1',
    bookingId: '1',
    barberId: '1',
    serviceId: '1',
    clientName: 'João Silva',
    serviceName: 'Corte Clássico',
    estimatedDuration: 30,
    status: 'waiting',
    amount: 35,
    date: '2024-12-20',
    scheduledTime: '10:00'
  },
  {
    id: '2',
    bookingId: '4',
    barberId: '1',
    serviceId: '4',
    clientName: 'Lucas Silva',
    serviceName: 'Sobrancelha',
    estimatedDuration: 15,
    status: 'waiting',
    amount: 28,
    date: '2024-12-22',
    scheduledTime: '09:00'
  },
  {
    id: '3',
    bookingId: '3',
    barberId: '3',
    serviceId: '2',
    clientName: 'Maria Oliveira',
    serviceName: 'Barba + Bigode',
    estimatedDuration: 25,
    status: 'completed',
    startTime: '16:00',
    endTime: '16:22',
    actualDuration: 22,
    paymentMethod: 'pix',
    amount: 25,
    date: '2024-12-19',
    scheduledTime: '16:00'
  }
];
