
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useClientSearch } from '@/hooks/useClientSearch';

interface ClientAutocompleteProps {
  value: string;
  onClientSelect: (clientData: { name: string; email: string; phone: string }) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const ClientAutocomplete: React.FC<ClientAutocompleteProps> = ({
  value,
  onClientSelect,
  onValueChange,
  placeholder = "Digite o nome do cliente...",
  label = "Nome do Cliente"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchResults = useClientSearch(value);

  useEffect(() => {
    setIsOpen(value.length >= 4 && searchResults.length > 0);
  }, [value, searchResults]);

  const handleClientClick = (client: any) => {
    onClientSelect({
      name: client.name,
      email: client.email,
      phone: client.phone
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => value.length >= 4 && searchResults.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-background border shadow-lg">
          {searchResults.map((client) => (
            <div
              key={client.id}
              className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
              onClick={() => handleClientClick(client)}
            >
              <div className="font-medium">{client.name}</div>
              <div className="text-sm text-muted-foreground">{client.phone}</div>
              <div className="text-sm text-muted-foreground">{client.email}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default ClientAutocomplete;
