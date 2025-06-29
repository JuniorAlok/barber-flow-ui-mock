
import React, { useState, useEffect, memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useClientSearch } from '@/hooks/useClientSearch';
import { cn } from '@/lib/utils';

interface ClientAutocompleteProps {
  value: string;
  onClientSelect: (clientData: { name: string; email: string; phone: string }) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

const ClientAutocomplete: React.FC<ClientAutocompleteProps> = ({
  value,
  onClientSelect,
  onValueChange,
  placeholder = "Digite o nome do cliente...",
  label = "Nome do Cliente",
  className
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
        className={cn(className)}
        onFocus={() => value.length >= 4 && searchResults.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-zinc-800 border-zinc-700 shadow-lg">
          {searchResults.map((client) => (
            <div
              key={client.id}
              className="p-3 hover:bg-zinc-700 cursor-pointer border-b border-zinc-700 last:border-b-0"
              onClick={() => handleClientClick(client)}
            >
              <div className="font-medium text-white">{client.name}</div>
              <div className="text-sm text-zinc-400">{client.phone}</div>
              <div className="text-sm text-zinc-400">{client.email}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default memo(ClientAutocomplete);
