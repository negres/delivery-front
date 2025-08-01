import React, { useCallback, useEffect, useState } from 'react';
import { Control, FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface CurrencyInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
}

const CurrencyInputField = <T extends FieldValues>({ control, name, label, placeholder }: CurrencyInputFieldProps<T>) => {
  const [amount, setAmount] = useState('');

  const { formState, setValue, getValues, clearErrors, watch } = useFormContext<T>();
  const { errors } = formState;

  const formatCurrency = useCallback((inputValue: string) => {
    let numericDigitsOnly = inputValue.replace(/\D/g, "");

    if (!numericDigitsOnly) numericDigitsOnly = '0';

    const valueInCents = parseFloat(numericDigitsOnly);

    const formattedValue = (valueInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValue(name, (Number(numericDigitsOnly) / 100) as PathValue<T, FieldPath<T>>, { shouldDirty: true });

    return formattedValue;
  }, [name, setValue]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors(name);

    const value = event.target.value;

    if (!value) {
      setAmount(formatCurrency(''));

      return;
    }

    setAmount(formatCurrency(value));
  };

  const watchedValue = watch(name);

  useEffect(() => {
    const rawValue = getValues(name);
    const isEmptyValue = rawValue === undefined || rawValue === null || rawValue === 0;

    if (isEmptyValue) {
      setAmount('');
      return;
    }

    const formatted = formatCurrency(Number(rawValue).toFixed(2));
    setAmount(formatted);
  }, [watchedValue, formatCurrency, getValues, name]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field} // Passa todas as props do field (incluindo id, name, value, onChange)
              placeholder={placeholder}
              value={amount} // Sobrescreve o value do field com o valor formatado
              onChange={onChange} // Sobrescreve o onChange do field com nossa lógica customizada
              type="tel"
            />
          </FormControl>
          {errors[name] && typeof errors[name] === 'object' && 'message' in errors[name] && (
            <span className="text-destructive text-sm">{(errors[name] as { message?: string }).message}</span>
          )}
        </FormItem>
      )}
    />
  );
};

export default CurrencyInputField;