
import { User } from './types';

export const users: User[] = [
  {
    id: '1',
    email: 'admin@iabarber.com',
    password: 'Admin123!',
    role: 'admin',
    name: 'Administrador'
  },
  {
    id: '2',
    email: 'cliente@teste.com',
    password: 'Cliente123!',
    role: 'user',
    name: 'João Silva'
  }
];
