
import { Transaction } from './types';

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Serviços',
    amount: 35,
    description: 'Corte Clássico - João Silva',
    date: '2024-12-20',
    bookingId: '1',
    barberId: '1'
  },
  {
    id: '2',
    type: 'income',
    category: 'Serviços',
    amount: 25,
    description: 'Barba + Bigode - Maria Oliveira',
    date: '2024-12-19',
    bookingId: '3',
    barberId: '3'
  },
  {
    id: '3',
    type: 'expense',
    category: 'Produtos',
    amount: 150,
    description: 'Compra de produtos para cabelo',
    date: '2024-12-18'
  },
  {
    id: '4',
    type: 'expense',
    category: 'Equipamentos',
    amount: 89,
    description: 'Manutenção da máquina de corte',
    date: '2024-12-17'
  }
];
