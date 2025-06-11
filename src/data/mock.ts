
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  imageUrl?: string;
}

export interface Barber {
  id: string;
  name: string;
  specialization: string;
  avatarUrl: string;
  experience: string;
  rating: number;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'done' | 'cancelled';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  ctaText: string;
  aboutTitle: string;
  aboutDescription: string;
  heroImageUrl: string;
}

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

export const services: Service[] = [
  {
    id: '1',
    title: 'Corte Clássico',
    description: 'Corte tradicional masculino com acabamento impecável',
    duration: 30,
    price: 35,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'
  },
  {
    id: '2',
    title: 'Barba + Bigode',
    description: 'Aparar e modelar barba com cuidado especial',
    duration: 45,
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400'
  },
  {
    id: '3',
    title: 'Combo Completo',
    description: 'Corte + barba + acabamento premium',
    duration: 60,
    price: 55,
    imageUrl: 'https://images.unsplash.com/photo-1559824208-7c67da3cb3ef?w=400'
  },
  {
    id: '4',
    title: 'Corte Infantil',
    description: 'Corte especial para crianças até 12 anos',
    duration: 25,
    price: 28,
    imageUrl: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=400'
  }
];

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    specialization: 'Cortes Clássicos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    experience: '8 anos de experiência',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Roberto Lima',
    specialization: 'Barbas & Bigodes',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    experience: '12 anos de experiência',
    rating: 4.8
  },
  {
    id: '3',
    name: 'André Costa',
    specialization: 'Cortes Modernos',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    experience: '6 anos de experiência',
    rating: 4.7
  }
];

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
    notes: 'Primeira vez na barbearia'
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
    clientPhone: '(11) 88888-8888'
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
    clientPhone: '(11) 77777-7777'
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
    clientPhone: '(11) 66666-6666'
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
    clientPhone: '(11) 55555-5555'
  }
];

export const homeContent: HomeContent = {
  title: 'IA Barber Studio',
  subtitle: 'Tradição e modernidade em cada corte',
  ctaText: 'Agende Agora',
  aboutTitle: 'Sobre Nós',
  aboutDescription: 'Com mais de 10 anos de experiência, nossa barbearia combina técnicas tradicionais com as tendências mais modernas. Nossa equipe de profissionais qualificados está pronta para oferecer o melhor atendimento.',
  heroImageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800'
};

// Time slots disponíveis
export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];
