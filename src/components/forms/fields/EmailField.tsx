
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormData } from '../enhancedFormSchema';

interface EmailFieldProps {
  control: Control<FormData>;
}

export const EmailField: React.FC<EmailFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="seu@email.com"
            {...field}
            className="rounded-xl bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
