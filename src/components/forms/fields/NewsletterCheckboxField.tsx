
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from '../enhancedFormSchema';

interface NewsletterCheckboxFieldProps {
    control: Control<FormData>;
}

export const NewsletterCheckboxField: React.FC<NewsletterCheckboxFieldProps> = ({ control }) => (
    <FormField
        control={control}
        name="newsletter"
        render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-yellow-500 data-[state=checked]:text-black border-zinc-600"
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                        Quero receber novidades por email
                    </FormLabel>
                </div>
            </FormItem>
        )}
    />
);
