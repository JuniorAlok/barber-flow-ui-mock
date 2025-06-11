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
  isActive: boolean;
}

export interface Barber {
  id: string;
  name: string;
  specialization: string;
  avatarUrl: string;
  experience: string;
  rating: number;
  isActive: boolean;
  phone: string;
  email: string;
  commission: number;
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
  totalAmount: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  birthday?: string;
  notes?: string;
  isVip: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  bookingId?: string;
  barberId?: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBookings: number;
  monthlyBookings: number;
  totalClients: number;
  monthlyClients: number;
  averageTicket: number;
  topService: string;
  topBarber: string;
  revenueGrowth: number;
  bookingGrowth: number;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  ctaText: string;
  aboutTitle: string;
  aboutDescription: string;
  heroImageUrl: string;
  contactPhone: string;
  contactAddress: string;
  contactEmail: string;
  workingHours: string;
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

export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 12500,
  monthlyRevenue: 3200,
  totalBookings: 245,
  monthlyBookings: 68,
  totalClients: 89,
  monthlyClients: 12,
  averageTicket: 47,
  topService: 'Combo Completo',
  topBarber: 'Carlos Santos',
  revenueGrowth: 15.2,
  bookingGrowth: 8.5
};

export const homeContent: HomeContent = {
  title: 'IA Barber Studio',
  subtitle: 'Tradição e modernidade em cada corte',
  ctaText: 'Agende Agora',
  aboutTitle: 'Sobre Nós',
  aboutDescription: 'Com mais de 10 anos de experiência, nossa barbearia combina técnicas tradicionais com as tendências mais modernas. Nossa equipe de profissionais qualificados está pronta para oferecer o melhor atendimento.',
  heroImageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
  contactPhone: '(11) 99999-9999',
  contactAddress: 'Rua da Barbearia, 123 - São Paulo, SP',
  contactEmail: 'contato@iabarber.com',
  workingHours: 'Seg-Sáb: 9h às 18h | Dom: Fechado'
};

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];
