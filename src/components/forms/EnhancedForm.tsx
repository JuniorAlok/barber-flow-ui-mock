
/**
 * Enhanced Form Components
 * Modern form components with validation and animations
 */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { formSchema, FormData } from './enhancedFormSchema';
import { NameField } from './fields/NameField';
import { EmailField } from './fields/EmailField';
import { ServiceSelectField } from './fields/ServiceSelectField';
import { PriorityRadioField } from './fields/PriorityRadioField';
import { NewsletterCheckboxField } from './fields/NewsletterCheckboxField';
import { SubmitButton } from './fields/SubmitButton';

interface EnhancedFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
}

export const EnhancedForm: React.FC<EnhancedFormProps> = ({
  onSubmit,
  className
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      newsletter: false,
      priority: 'medium',
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await onSubmit(data);
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn('management-card p-8 bg-zinc-900 border border-zinc-700 rounded-2xl text-white animate-fade-in', className)}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Formulário de Contato
        </h3>
        <p className="text-zinc-400">
          Preencha os dados abaixo para entrar em contato
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <NameField control={form.control} />
          <EmailField control={form.control} />
          <ServiceSelectField control={form.control} />
          <PriorityRadioField control={form.control} />
          <NewsletterCheckboxField control={form.control} />
          <SubmitButton isSubmitting={isSubmitting} submitStatus={submitStatus} />
        </form>
      </Form>
    </div>
  );
};

export default EnhancedForm;
