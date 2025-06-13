
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Phone, Mail, Calendar } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { formatCurrency } from '@/utils/formatting';
import ClientModal from '@/components/admin/modals/ClientModal';

const ClientManagement: React.FC = () => {
  const { clients } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleNewClient = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <>
      <Card className="management-card animate-fade-in">
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-responsive-lg text-luxury">Gerenciar Clientes</CardTitle>
                <p className="text-responsive-xs text-muted-foreground">Cadastro e histórico de clientes</p>
              </div>
            </div>
            <Button 
              onClick={handleNewClient}
              className="gradient-glow focus-ring hover-lift"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus-ring"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredClients.map((client, index) => (
              <div 
                key={client.id} 
                className="management-item p-4 sm:p-6 animate-slide-up hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="text-responsive-base font-semibold text-foreground">{client.name}</h3>
                      {client.isVip && (
                        <Badge className="status-warning w-fit">
                          VIP
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-responsive-xs">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground truncate">{client.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">Última visita: {new Date(client.lastVisit).toLocaleDateString()}</span>
                      </div>
                      <div className="text-primary font-medium">
                        Total gasto: {formatCurrency(client.totalSpent)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <div className="text-center sm:text-right text-responsive-xs">
                      <div className="font-medium text-foreground">{client.totalVisits} visitas</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClient(client)}
                      className="focus-ring"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-2 sm:hidden">Editar</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        client={editingClient}
      />
    </>
  );
};

export default ClientManagement;
