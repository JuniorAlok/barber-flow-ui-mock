
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMockData } from '@/contexts/MockDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BarberBookingManagement: React.FC = () => {
  const { user } = useAuth();
  const { bookings, services } = useMockData();

  const barberBookings = bookings.filter(booking => booking.barberId === user?.id);

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.title || 'Serviço não encontrado';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      confirmed: { variant: "default" as const, label: "Confirmado", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      done: { variant: "outline" as const, label: "Concluído", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      cancelled: { variant: "destructive" as const, label: "Cancelado", color: "bg-red-500/20 text-red-400 border-red-500/30" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant} className={config.color}>{config.label}</Badge>;
  };

  const todayBookings = barberBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate.toDateString() === today.toDateString();
  });

  const upcomingBookings = barberBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate > today;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Agendamentos de Hoje */}
      <Card className="management-card border-0">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5">
              <Calendar className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Agendamentos de Hoje</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum agendamento para hoje</p>
              </div>
            ) : (
              todayBookings.map((booking, index) => (
                <div 
                  key={booking.id} 
                  className="management-item p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{getServiceName(booking.serviceId)}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="font-medium text-foreground">{booking.clientName}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Horário:</span>
                          <span className="font-medium text-foreground">{booking.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Valor:</span>
                          <span className="font-medium text-primary">R$ {booking.totalAmount}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-3 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                          <strong>Observações:</strong> {booking.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Agendamentos */}
      <Card className="management-card border-0">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Próximos Agendamentos</CardTitle>
              <p className="text-sm text-muted-foreground">Seus agendamentos futuros</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum agendamento futuro</p>
              </div>
            ) : (
              upcomingBookings.slice(0, 5).map((booking, index) => (
                <div 
                  key={booking.id} 
                  className="management-item p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{getServiceName(booking.serviceId)}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="font-medium text-foreground">{booking.clientName}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Data:</span>
                          <span className="font-medium text-foreground">
                            {format(new Date(booking.date), 'dd/MM', { locale: ptBR })}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Horário:</span>
                          <span className="font-medium text-foreground">{booking.time}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Valor:</span>
                          <span className="font-medium text-primary">R$ {booking.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarberBookingManagement;
