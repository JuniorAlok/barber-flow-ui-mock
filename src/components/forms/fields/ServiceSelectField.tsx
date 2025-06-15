
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormData } from '../enhancedFormSchema';

interface ServiceSelectFieldProps {
  control: Control<FormData>;
}

export const ServiceSelectField: React.FC<ServiceSelectFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="service"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Serviço</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="rounded-xl bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
            <SelectItem value="haircut" className="text-white hover:!bg-zinc-700">Corte de Cabelo</SelectItem>
            <SelectItem value="beard" className="text-white hover:!bg-zinc-700">Barba</SelectItem>
            <SelectItem value="combo" className="text-white hover:!bg-zinc-700">Combo Completo</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
