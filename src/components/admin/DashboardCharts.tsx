
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { useMockData } from '@/contexts/MockDataContext';
import { formatCurrency } from '@/utils/formatting';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const DashboardCharts: React.FC = () => {
  const { bookings, services, barbers, transactions } = useMockData();

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
  const COLORS = [
    '#FFD700', // Primary gold
    '#4F46E5', // Indigo
    '#06B6D4', // Cyan
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#F97316'  // Orange
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect rounded-lg p-4 border border-primary/20 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'revenue' || entry.name === 'commission' 
                ? `${entry.name === 'revenue' ? 'Receita' : 'Comissão'}: ${formatCurrency(entry.value)}`
                : `${entry.name === 'bookings' ? 'Agendamentos' : entry.name}: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Gráfico de Receita Mensal com Área */}
      <Card className="chart-container border-0 hover-lift">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Receita e Agendamentos</CardTitle>
              <p className="text-sm text-muted-foreground">Evolução mensal</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                yAxisId="left"
                type="monotone"
                dataKey="revenue" 
                stroke="#FFD700"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#revenueGradient)" 
              />
              <Area 
                yAxisId="right"
                type="monotone"
                dataKey="bookings" 
                stroke="#4F46E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#bookingsGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Serviços Populares Aprimorado */}
      <Card className="chart-container border-0 hover-lift">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5">
              <Calendar className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Serviços Mais Populares</CardTitle>
              <p className="text-sm text-muted-foreground">Distribuição de procura</p>
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
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Performance dos Barbeiros */}
      <Card className="chart-container border-0 hover-lift lg:col-span-2">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
              <Users className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Performance dos Barbeiros</CardTitle>
              <p className="text-sm text-muted-foreground">Receita e comissões por profissional</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barberPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="commissionBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="url(#revenueBarGradient)" 
                name="revenue"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="commission" 
                fill="url(#commissionBarGradient)" 
                name="commission"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
