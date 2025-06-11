
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LogOut, Calendar, Users, Scissors, Settings, Trash2, Edit, Plus, DollarSign, BarChart3, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import DashboardMetrics from '@/components/DashboardMetrics';
import FinanceModule from '@/components/FinanceModule';
import ClientManagement from '@/components/ClientManagement';
import InlineEdit from '@/components/InlineEdit';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { bookings, setBookings, services, setServices, barbers, setBarbers, homeContent, setHomeContent } = useMockData();
  const [editingContent, setEditingContent] = useState(homeContent);

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus as any }
          : booking
      )
    );
    toast({
      title: "Status atualizado",
      description: "O status do agendamento foi alterado com sucesso.",
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso.",
    });
  };

  const saveHomeContent = () => {
    setHomeContent(editingContent);
    toast({
      title: "Configurações salvas",
      description: "As alterações da página inicial foram salvas com sucesso.",
    });
  };

  const toggleServiceStatus = (serviceId: string, isActive: boolean) => {
    setServices(prev => prev.map(service =>
      service.id === serviceId ? { ...service, isActive } : service
    ));
    toast({
      title: isActive ? "Serviço ativado" : "Serviço desativado",
      description: `O serviço foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`
    });
  };

  const toggleBarberStatus = (barberId: string, isActive: boolean) => {
    setBarbers(prev => prev.map(barber =>
      barber.id === barberId ? { ...barber, isActive } : barber
    ));
    toast({
      title: isActive ? "Barbeiro ativado" : "Barbeiro desativado",
      description: `O barbeiro foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`
    });
  };

  const updateServiceField = (serviceId: string, field: string, value: any) => {
    setServices(prev => prev.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
    toast({
      title: "Serviço atualizado",
      description: "As informações do serviço foram atualizadas."
    });
  };

  const updateBarberField = (barberId: string, field: string, value: any) => {
    setBarbers(prev => prev.map(barber =>
      barber.id === barberId ? { ...barber, [field]: value } : barber
    ));
    toast({
      title: "Barbeiro atualizado",
      description: "As informações do barbeiro foram atualizadas."
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente" },
      confirmed: { variant: "default" as const, label: "Confirmado" },
      done: { variant: "outline" as const, label: "Concluído" },
      cancelled: { variant: "destructive" as const, label: "Cancelado" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço não encontrado';
  };

  const getBarberName = (barberId: string) => {
    return barbers.find(b => b.id === barberId)?.name || 'Barbeiro não encontrado';
  };

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    todayBookings: bookings.filter(b => b.date === format(new Date(), 'yyyy-MM-dd')).length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold gold-gradient bg-clip-text text-transparent">
            IA Barber Admin
          </h1>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 glass-effect">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="finances">
              <DollarSign className="w-4 h-4 mr-2" />
              Finanças
            </TabsTrigger>
            <TabsTrigger value="clients">
              <UserCheck className="w-4 h-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="services">
              <Scissors className="w-4 h-4 mr-2" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="barbers">
              <Users className="w-4 h-4 mr-2" />
              Barbeiros
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <DashboardMetrics />
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Gerenciar Agendamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Barbeiro</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.clientName}</div>
                            <div className="text-sm text-muted-foreground">{booking.clientPhone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getServiceName(booking.serviceId)}</TableCell>
                        <TableCell>{getBarberName(booking.barberId)}</TableCell>
                        <TableCell>
                          {format(new Date(booking.date), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateBookingStatus(booking.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="confirmed">Confirmar</SelectItem>
                                <SelectItem value="done">Concluído</SelectItem>
                                <SelectItem value="cancelled">Cancelar</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteBooking(booking.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances">
            <FinanceModule />
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients">
            <ClientManagement />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Gerenciar Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="p-4 border border-border rounded-lg glass-effect">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={service.imageUrl} 
                            alt={service.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <InlineEdit
                              value={service.title}
                              onSave={(value) => updateServiceField(service.id, 'title', value)}
                              className="text-lg font-semibold"
                            />
                            <InlineEdit
                              value={service.description}
                              onSave={(value) => updateServiceField(service.id, 'description', value)}
                              type="textarea"
                              className="text-sm text-muted-foreground mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">Duração:</span>
                              <InlineEdit
                                value={service.duration}
                                onSave={(value) => updateServiceField(service.id, 'duration', Number(value))}
                                type="number"
                                className="font-medium"
                              />
                              <span className="text-sm">min</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm">Preço: R$</span>
                              <InlineEdit
                                value={service.price}
                                onSave={(value) => updateServiceField(service.id, 'price', Number(value))}
                                type="number"
                                className="font-medium text-primary"
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={service.isActive}
                              onCheckedChange={(checked) => toggleServiceStatus(service.id, checked)}
                            />
                            <span className="text-sm">
                              {service.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Barbers Tab */}
          <TabsContent value="barbers">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Gerenciar Barbeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {barbers.map((barber) => (
                    <div key={barber.id} className="p-4 border border-border rounded-lg glass-effect">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={barber.avatarUrl} 
                            alt={barber.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <InlineEdit
                              value={barber.name}
                              onSave={(value) => updateBarberField(barber.id, 'name', value)}
                              className="text-lg font-semibold"
                            />
                            <InlineEdit
                              value={barber.specialization}
                              onSave={(value) => updateBarberField(barber.id, 'specialization', value)}
                              className="text-sm text-muted-foreground"
                            />
                            <div className="flex items-center space-x-4 mt-2">
                              <InlineEdit
                                value={barber.phone}
                                onSave={(value) => updateBarberField(barber.id, 'phone', value)}
                                className="text-sm"
                              />
                              <InlineEdit
                                value={barber.email}
                                onSave={(value) => updateBarberField(barber.id, 'email', value)}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">Comissão:</span>
                              <InlineEdit
                                value={barber.commission}
                                onSave={(value) => updateBarberField(barber.id, 'commission', Number(value))}
                                type="number"
                                className="font-medium"
                              />
                              <span className="text-sm">%</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              ⭐ {barber.rating} | {barber.experience}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={barber.isActive}
                              onCheckedChange={(checked) => toggleBarberStatus(barber.id, checked)}
                            />
                            <span className="text-sm">
                              {barber.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
