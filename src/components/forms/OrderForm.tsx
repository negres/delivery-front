'use client'

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import TextInputField from '@/components/forms/TextInputField';
import CurrencyInputField from '@/components/forms/CurrencyInputField';
import { Input } from '@/components/ui/input';
import { type FormData } from '@/schemas/order';

interface OrderFormProps {
  form: ReturnType<typeof useForm<FormData>>;
  onSubmit: (data: FormData) => void;
}

const OrderForm = ({ form, onSubmit }: OrderFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificador do usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe o ID do usuário"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextInputField
          control={form.control}
          name="pickupAddress"
          label="Endereço de coleta"
          placeholder="Informe o endereço de coleta"
        />
        <TextInputField
          control={form.control}
          name="deliveryAddress"
          label="Endereço de entrega"
          placeholder="Informe o endereço de entrega"
        />
        <TextInputField
          control={form.control}
          name="itemsDescription"
          label="Descrição dos itens"
          placeholder="Descreva os itens a serem entregues"
        />
        <CurrencyInputField
          control={form.control}
          name="estimatedCost"
          label="Valor estimado"
          placeholder="0,00"
        />
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Criando..." : "Criar pedido"}
        </Button>
      </form>
    </Form>
  )
}

export default OrderForm
