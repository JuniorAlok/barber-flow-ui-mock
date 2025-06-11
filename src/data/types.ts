
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
