
import { Barber } from './types';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    specialization: 'Cortes Clássicos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    experience: '8 anos de experiência',
    rating: 4.9,
    isActive: true,
    phone: '(11) 99999-1111',
    email: 'carlos@iabarber.com',
    commission: 60
  },
  {
    id: '2',
    name: 'Roberto Lima',
    specialization: 'Barbas & Bigodes',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    experience: '12 anos de experiência',
    rating: 4.8,
    isActive: true,
    phone: '(11) 99999-2222',
    email: 'roberto@iabarber.com',
    commission: 65
  },
  {
    id: '3',
    name: 'André Costa',
    specialization: 'Cortes Modernos',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    experience: '6 anos de experiência',
    rating: 4.7,
    isActive: true,
    phone: '(11) 99999-3333',
    email: 'andre@iabarber.com',
    commission: 55
  }
];
