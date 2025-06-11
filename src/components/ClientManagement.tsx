
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Edit, Star, Phone, Mail, Calendar } from 'lucide-react';
import { useMockData } from '@/contexts/MockDataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const ClientManagement: React.FC = () => {
  const { clients, setClients } = useMockData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    notes: '',
    isVip: false
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleOpenDialog = (client?: any) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        birthday: client.birthday || '',
        notes: client.notes || '',
        isVip: client.isVip
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        birthday: '',
        notes: '',
        isVip: false
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (editingClient) {
      setClients(prev => prev.map(client =>
        client.id === editingClient.id
          ? { ...client, ...formData }
          : client
      ));
      toast({
        title: "Cliente atualizado",
        description: "As informações do cliente foram atualizadas com sucesso."
      });
    } else {
      const newClient = {
        id: Date.now().toString(),
        ...formData,
        totalVisits: 0,
        totalSpent: 0,
        lastVisit: format(new Date(), 'yyyy-MM-dd')
      };
      setClients(prev => [...prev, newClient]);
      toast({
        title: "Cliente adicionado",
        description: "O novo cliente foi adicionado com sucesso."
      });
    }

    setIsDialogOpen(false);
  };

  const toggleVipStatus = (clientId: string, isVip: boolean) => {
    setClients(prev => prev.map(client =>
      client.id === clientId ? { ...client, isVip } : client
    ));
    toast({
      title: isVip ? "Cliente VIP" : "Status VIP removido",
      description: `O cliente foi ${isVip ? 'promovido a' : 'removido do status'} VIP.`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com busca e novo cliente */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gold-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="birthday">Data de Nascimento</Label>
                <Input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações sobre o cliente..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isVip}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVip: checked })}
                />
                <Label>Cliente VIP</Label>
              </div>
              <Button onClick={handleSaveClient} className="w-full gold-gradient">
                {editingClient ? 'Atualizar' : 'Adicionar'} Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de clientes */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Clientes Cadastrados ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Visitas</TableHead>
                <TableHead>Total Gasto</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        {client.birthday && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(client.birthday), 'dd/MM', { locale: ptBR })}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {client.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {client.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{client.totalVisits}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-primary">
                      R$ {client.totalSpent.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(client.lastVisit), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {client.isVip && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                      <Switch
                        checked={client.isVip}
                        onCheckedChange={(checked) => toggleVipStatus(client.id, checked)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(client)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;
