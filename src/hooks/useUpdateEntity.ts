
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseUpdateEntityProps<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  entityName: string;
  idKey?: keyof T;
}

export const useUpdateEntity = <T extends Record<string, any>>({
  data,
  setData,
  entityName,
  idKey = 'id' as keyof T
}: UseUpdateEntityProps<T>) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateField = async (entityId: string | number, field: keyof T, value: any) => {
    setIsUpdating(true);
    try {
      setData(prev => prev.map(item =>
        item[idKey] === entityId ? { ...item, [field]: value } : item
      ));
      
      toast({
        title: `${entityName} atualizado`,
        description: `As informações foram atualizadas com sucesso.`
      });
    } catch (error) {
      console.error(`Erro ao atualizar ${entityName}:`, error);
      toast({
        title: "Erro",
        description: `Não foi possível atualizar o ${entityName.toLowerCase()}.`,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleStatus = async (entityId: string | number, isActive: boolean) => {
    setIsUpdating(true);
    try {
      setData(prev => prev.map(item =>
        item[idKey] === entityId ? { ...item, isActive } : item
      ));
      
      toast({
        title: isActive ? `${entityName} ativado` : `${entityName} desativado`,
        description: `O ${entityName.toLowerCase()} foi ${isActive ? 'ativado' : 'desativado'} com sucesso.`
      });
    } catch (error) {
      console.error(`Erro ao atualizar status do ${entityName}:`, error);
      toast({
        title: "Erro",
        description: `Não foi possível atualizar o status do ${entityName.toLowerCase()}.`,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateField,
    toggleStatus,
    isUpdating
  };
};
