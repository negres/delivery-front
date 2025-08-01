import '@testing-library/jest-dom';

import { toast } from 'sonner';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { createOrder } from '@/lib/api/orders';

import OrderNewPage from './page';

jest.mock('@/lib/api/orders', () => ({
  createOrder: jest.fn(),
}));

jest.mock('sonner');

describe('OrderNewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the order creation form', () => {
    render(<OrderNewPage />);

    expect(screen.getByText('Criar novo pedido')).toBeInTheDocument();
    expect(screen.getByLabelText('Identificador do usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço de coleta')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço de entrega')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição dos itens')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor estimado')).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    (createOrder as jest.Mock).mockResolvedValue({});

    render(<OrderNewPage />);

    const userIdInput = screen.getByLabelText('Identificador do usuário');
    const pickupAddressInput = screen.getByLabelText('Endereço de coleta');
    const deliveryAddressInput = screen.getByLabelText('Endereço de entrega');
    const itemsDescriptionInput = screen.getByLabelText('Descrição dos itens');
    const estimatedCostInput = screen.getByLabelText('Valor estimado');
    const submitButton = screen.getByRole('button', { name: 'Criar pedido' });

    await userEvent.type(userIdInput, '123');
    await userEvent.type(pickupAddressInput, 'Rua A, 123');
    await userEvent.type(deliveryAddressInput, 'Rua B, 456');
    await userEvent.type(itemsDescriptionInput, 'Item 1, Item 2');
    await userEvent.type(estimatedCostInput, '100');

    await userEvent.click(submitButton);

    expect(createOrder).toHaveBeenCalledWith({
      userId: '123',
      pickupAddress: 'Rua A, 123',
      deliveryAddress: 'Rua B, 456',
      itemsDescription: 'Item 1, Item 2',
      estimatedCost: 1,
    });
  });

  it('displays an error message on form submission failure', async () => {
    (createOrder as jest.Mock).mockRejectedValue(new Error('Failed to create order'));

    render(<OrderNewPage />);

    const userIdInput = screen.getByLabelText('Identificador do usuário');
    const pickupAddressInput = screen.getByLabelText('Endereço de coleta');
    const deliveryAddressInput = screen.getByLabelText('Endereço de entrega');
    const itemsDescriptionInput = screen.getByLabelText('Descrição dos itens');
    const estimatedCostInput = screen.getByLabelText('Valor estimado');
    const submitButton = screen.getByRole('button', { name: 'Criar pedido' });

    await userEvent.type(userIdInput, '123');
    await userEvent.type(pickupAddressInput, 'Rua A, 123');
    await userEvent.type(deliveryAddressInput, 'Rua B, 456');
    await userEvent.type(itemsDescriptionInput, 'Item 1, Item 2');
    await userEvent.type(estimatedCostInput, '100');

    await userEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith('Erro ao criar pedido. Tente novamente.');
  });
});
