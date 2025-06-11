
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useMockData } from '@/contexts/MockDataContext';
import { formatCurrency } from '@/utils/formatting';

const DashboardCharts: React.FC = () => {
  const { bookings, services, barbers, transactions } = useMockData();

  // Dados para gráfico de receita mensal
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 2800, bookings: 45 },
    { month: 'Fev', revenue: 3200, bookings: 52 },
    { month: 'Mar', revenue: 2900, bookings: 48 },
    { month: 'Abr', revenue: 3500, bookings: 58 },
    { month: 'Mai', revenue: 3100, bookings: 51 },
    { month: 'Jun', revenue: 3600, bookings: 62 },
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
      commission: revenue * (barber.commission / 100)
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Cores para o gráfico de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Receita Mensal */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Receita e Agendamentos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  typeof name === 'string' && name === 'revenue' ? formatCurrency(Number(value)) : value,
                  typeof name === 'string' && name === 'revenue' ? 'Receita' : 'Agendamentos'
                ]}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="revenue" />
              <Bar yAxisId="right" dataKey="bookings" fill="#82ca9d" name="bookings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Serviços Populares */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Serviços Mais Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicePopularityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {servicePopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Performance dos Barbeiros */}
      <Card className="glass-effect lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance dos Barbeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barberPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  typeof name === 'string' && (name === 'revenue' || name === 'commission') ? formatCurrency(Number(value)) : value,
                  typeof name === 'string' ? (
                    name === 'revenue' ? 'Receita Total' : 
                    name === 'commission' ? 'Comissão' : 'Agendamentos'
                  ) : 'Valor'
                ]}
              />
              <Bar dataKey="revenue" fill="#8884d8" name="revenue" />
              <Bar dataKey="commission" fill="#82ca9d" name="commission" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
