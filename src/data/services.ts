
import { Service } from './types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Corte Clássico',
    description: 'Corte tradicional masculino com acabamento impecável',
    duration: 30,
    price: 35,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
    isActive: true
  },
  {
    id: '2',
    title: 'Barba + Bigode',
    description: 'Aparar e modelar barba com cuidado especial',
    duration: 45,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    isActive: true
  },
  {
    id: '3',
    title: 'Combo Completo',
    description: 'Corte + barba + acabamento premium',
    duration: 60,
    price: 55,
    imageUrl: 'https://images.unsplash.com/photo-1559824208-7c67da3cb3ef?w=400',
    isActive: true
  },
  {
    id: '4',
    title: 'Corte Infantil',
    description: 'Corte especial para crianças até 12 anos',
    duration: 25,
    price: 28,
    imageUrl: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=400',
    isActive: true
  }
];
