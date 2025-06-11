
import * as z from 'zod';

export const homeContentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().min(1, 'Subtítulo é obrigatório'),
  ctaText: z.string().min(1, 'Texto do botão é obrigatório'),
  aboutTitle: z.string().min(1, 'Título da seção sobre é obrigatório'),
  aboutDescription: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  heroImageUrl: z.string().url('URL da imagem deve ser válida').optional().or(z.literal('')),
  contactPhone: z.string().min(1, 'Telefone é obrigatório'),
  contactAddress: z.string().min(1, 'Endereço é obrigatório'),
  contactEmail: z.string().email('Email deve ser válido'),
  workingHours: z.string().min(1, 'Horário de funcionamento é obrigatório'),
});

export type HomeContentForm = z.infer<typeof homeContentSchema>;

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a 0'),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean(),
});

export const barberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  specialization: z.string().min(1, 'Especialização é obrigatória'),
  avatarUrl: z.string().url('URL do avatar deve ser válida'),
  experience: z.string().min(1, 'Experiência é obrigatória'),
  rating: z.number().min(0).max(5),
  isActive: z.boolean(),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('Email deve ser válido'),
  commission: z.number().min(0).max(100, 'Comissão deve estar entre 0 e 100'),
});
