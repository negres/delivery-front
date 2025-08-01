import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { createOrder } from '@/lib/api/orders';
import { handleFailure } from '@/lib/api/handleFailure';

import OrderNewPage from './page';

jest.mock('@/lib/api/orders', () => ({
  createOrder: jest.fn(),
}));

jest.mock('next/navigation');

jest.mock('@/lib/api/handleFailure', () => ({
  handleFailure: jest.fn(),
}));

describe('OrderNewPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
    });
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

    await userEvent.type(screen.getByLabelText('Identificador do usuário'), '123');
    await userEvent.type(screen.getByLabelText('Endereço de coleta'), 'Rua A, 123');
    await userEvent.type(screen.getByLabelText('Endereço de entrega'), 'Rua B, 456');
    await userEvent.type(screen.getByLabelText('Descrição dos itens'), 'Item 1, Item 2');
    await userEvent.type(screen.getByLabelText('Valor estimado'), '100');

    await userEvent.click(screen.getByRole('button', { name: 'Criar pedido' }));

    expect(createOrder).toHaveBeenCalledWith({
      userId: '123',
      pickupAddress: 'Rua A, 123',
      deliveryAddress: 'Rua B, 456',
      itemsDescription: 'Item 1, Item 2',
      estimatedCost: 1,
    });
  });

  it('calls handleFailure on API error', async () => {
    const mockError = new Error('Erro simulado');
    (createOrder as jest.Mock).mockRejectedValue(mockError);

    render(<OrderNewPage />);

    await userEvent.type(screen.getByLabelText('Identificador do usuário'), '123');
    await userEvent.type(screen.getByLabelText('Endereço de coleta'), 'Rua A, 123');
    await userEvent.type(screen.getByLabelText('Endereço de entrega'), 'Rua B, 456');
    await userEvent.type(screen.getByLabelText('Descrição dos itens'), 'Item 1, Item 2');
    await userEvent.type(screen.getByLabelText('Valor estimado'), '100');

    await userEvent.click(screen.getByRole('button', { name: 'Criar pedido' }));

    expect(handleFailure).toHaveBeenCalledWith(mockError, expect.any(Function));
  });

  it('shows loading state while submitting', async () => {
    (createOrder as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<OrderNewPage />);

    await userEvent.type(screen.getByLabelText('Identificador do usuário'), '123');
    await userEvent.type(screen.getByLabelText('Endereço de coleta'), 'Rua A');
    await userEvent.type(screen.getByLabelText('Endereço de entrega'), 'Rua B');
    await userEvent.type(screen.getByLabelText('Descrição dos itens'), 'Item 1');
    await userEvent.type(screen.getByLabelText('Valor estimado'), '100');

    await userEvent.click(screen.getByRole('button', { name: 'Criar pedido' }));

    const loadingButton = await screen.findByRole('button', { name: 'Criando...' });

    await waitFor(() => {
      expect(loadingButton).toBeInTheDocument();
    });
  });

  it('displays validation errors when fields are empty', async () => {
    render(<OrderNewPage />);

    await userEvent.click(screen.getByRole('button', { name: 'Criar pedido' }));

    expect(screen.getByText('Identificador do usuário é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Endereço de coleta é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Endereço de entrega é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Descrição dos itens é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Valor estimado deve ser maior que zero')).toBeInTheDocument();
  });
});
