
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
import { LogOut, Calendar, Users, Scissors, Settings, Trash2, Edit, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { bookings, setBookings, services, barbers, homeContent, setHomeContent } = useMockData();
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
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <Button variant="secondary" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmedBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayBookings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="services">
              <Scissors className="w-4 h-4 mr-2" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="barbers">
              <Users className="w-4 h-4 mr-2" />
              Barbeiros
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
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

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.title}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <p className="text-sm">Duração: {service.duration} min | Preço: R$ {service.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Barbers Tab */}
          <TabsContent value="barbers">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Barbeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {barbers.map((barber) => (
                    <div key={barber.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={barber.avatarUrl} 
                          alt={barber.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{barber.name}</h4>
                          <p className="text-sm text-muted-foreground">{barber.specialization}</p>
                          <p className="text-sm">{barber.experience} | ⭐ {barber.rating}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Página Inicial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Título Principal</Label>
                  <Input
                    id="title"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={editingContent.subtitle}
                    onChange={(e) => setEditingContent({ ...editingContent, subtitle: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaText">Texto do Botão CTA</Label>
                  <Input
                    id="ctaText"
                    value={editingContent.ctaText}
                    onChange={(e) => setEditingContent({ ...editingContent, ctaText: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aboutTitle">Título da Seção Sobre</Label>
                  <Input
                    id="aboutTitle"
                    value={editingContent.aboutTitle}
                    onChange={(e) => setEditingContent({ ...editingContent, aboutTitle: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aboutDescription">Descrição da Seção Sobre</Label>
                  <Textarea
                    id="aboutDescription"
                    value={editingContent.aboutDescription}
                    onChange={(e) => setEditingContent({ ...editingContent, aboutDescription: e.target.value })}
                    rows={4}
                  />
                </div>
                
                <Button onClick={saveHomeContent} className="w-full">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
