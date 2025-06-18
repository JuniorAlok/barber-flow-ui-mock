
import React, { memo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useMockData } from '@/contexts/MockDataContext';
import { formatCurrency } from '@/utils/formatting';
import { Users, DollarSign, Calendar } from 'lucide-react';
import { SectionTitle, Caption } from '@/components/ui/typography';
import { Booking } from '@/data/types';

interface DashboardChartsProps {
  bookings: Booking[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ bookings }) => {
  const { services, barbers, transactions } = useMockData();

  // Dados para gráfico de receita mensal
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 2800, bookings: 45, growth: 8.2 },
    { month: 'Fev', revenue: 3200, bookings: 52, growth: 14.3 },
    { month: 'Mar', revenue: 2900, bookings: 48, growth: -9.4 },
    { month: 'Abr', revenue: 3500, bookings: 58, growth: 20.7 },
    { month: 'Mai', revenue: 3100, bookings: 51, growth: -11.4 },
    { month: 'Jun', revenue: 3600, bookings: 62, growth: 16.1 },
  ];

  // Dados para gráfico de serviços mais populares
  const servicePopularityData = services.map(service => {
    const serviceBookings = bookings.filter(b => b.serviceId === service.id);
    return {
      name: service.title,
      value: serviceBookings.length,
      revenue: serviceBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
    };
  }).sort((a, b) => b.value - a.value);

  // Dados para gráfico de performance dos barbeiros
  const barberPerformanceData = barbers.map(barber => {
    const barberBookings = bookings.filter(b => b.barberId === barber.id);
    const revenue = barberBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    return {
      name: barber.name,
      bookings: barberBookings.length,
      revenue: revenue,
      commission: revenue * (barber.commission / 100),
      rating: barber.rating
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Cores modernas para os gráficos
  const COLORS = [ '#A9A9A9', '#808080', '#696969', '#A9A9A9', '#808080', '#696969' ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-4 shadow-lg">
          <Caption as="p" className="font-medium text-foreground mb-2">{label}</Caption>
          {payload.map((entry: any, index: number) => (
            <Caption as="p" key={index} className="text-foreground">
              {entry.name === 'revenue' || entry.name === 'commission' 
                ? `${entry.name === 'revenue' ? 'Receita' : 'Comissão'}: ${formatCurrency(entry.value)}`
                : `${entry.name === 'bookings' ? 'Agendamentos' : entry.name}: ${entry.value}`
              }
            </Caption>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Gráfico de Receita Mensal com Área */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg border">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <SectionTitle as="div" className="!mb-0">Receita e Agendamentos</SectionTitle>
              <Caption as="p" className="!text-sm !font-normal">Evolução mensal</Caption>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#FFFFFF" fill="rgba(255,255,255,0.1)" />
              <Area yAxisId="right" type="monotone" dataKey="bookings" stroke="#808080" fill="rgba(128,128,128,0.1)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Serviços Populares Aprimorado */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg border">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <SectionTitle as="div" className="!mb-0">Serviços Mais Populares</SectionTitle>
              <Caption as="p" className="!text-sm !font-normal">Distribuição de procura</Caption>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicePopularityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="rgba(255,255,255,0.1)"
              >
                {servicePopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Performance dos Barbeiros */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg border">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <SectionTitle as="div" className="!mb-0">Performance dos Barbeiros</SectionTitle>
              <Caption as="p" className="!text-sm !font-normal">Receita e comissões por profissional</Caption>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barberPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="rgba(255,255,255,0.2)" name="revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="commission" fill="rgba(128,128,128,0.2)" name="commission" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(DashboardCharts);
