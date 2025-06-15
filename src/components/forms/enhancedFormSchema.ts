
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  service: z.string().min(1, 'Selecione um serviço'),
  newsletter: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
});

export type FormData = z.infer<typeof formSchema>;
