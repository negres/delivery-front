'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardTitle } from '@/components/ui/card';
import OrderForm from '@/components/forms/OrderForm';
import { createOrder } from '@/lib/api/orders';
import { handleFailure } from '@/lib/api/handleFailure';
import { FormSchema, type FormData } from '@/schemas/order';

const OrderNewPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: "",
      pickupAddress: "",
      deliveryAddress: "",
      itemsDescription: "",
      estimatedCost: 0,
    },
  });

  const router = useRouter();

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await createOrder(data);

      form.reset();
      toast.success('Pedido criado com sucesso!', {
        description: `Criado em ${new Date().toLocaleString()}`,
        action: { label: 'Ver pedido', onClick: () => router.push(`/pedidos?userId=${data.userId}`) }
      });
    } catch (error) {
      handleFailure(error, toast.error);
    }
  }, [form]);

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-4 mx-4 my-8 sm:p-6 sm:mx-0">
        <CardTitle>Criar novo pedido</CardTitle>
        <OrderForm form={form} onSubmit={onSubmit} />
      </Card>
    </div>
  );
};

export default OrderNewPage;