import { z } from 'zod';

export const FormSchema = z.object({
  userId: z
    .string()
    .min(1, "Identificador do usuário é obrigatório")
    .regex(/^[1-9][0-9]*$/, "Identificador do usuário deve ser um número inteiro positivo."),
  pickupAddress: z
    .string()
    .min(1, "Endereço de coleta é obrigatório")
    .min(5, "Endereço de coleta deve conter pelo menos 5 caracteres."),
  deliveryAddress: z
    .string()
    .min(1, "Endereço de entrega é obrigatório")
    .min(5, "Endereço de entrega deve conter pelo menos 5 caracteres."),
  itemsDescription: z
    .string()
    .min(1, "Descrição dos itens é obrigatória"),
  estimatedCost: z
    .number()
    .min(0.01, { message: "Valor estimado deve ser maior que zero" })
    .max(99_999_999.99, { message: "Valor estimado não pode exceder 99.999.999,99" })
})

export type FormData = z.infer<typeof FormSchema>

export type Order = {
  id: string;
  itemsDescription: string;
  pickupAddress: string;
  deliveryAddress: string;
  estimatedCost: number;
  userId: string;
};
