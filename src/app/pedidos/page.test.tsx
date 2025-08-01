import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import OrdersPage from './page';

jest.mock('@/components/orders/OrdersTable', () => ({
  __esModule: true,
  default: ({ userId }: { userId: string }) => {
    const mockOrders = [
      { id: '1', userId: '123', itemsDescription: 'Item A', pickupAddress: 'Address A', deliveryAddress: 'Address B', estimatedCost: 100 },
      { id: '2', userId: '456', itemsDescription: 'Item B', pickupAddress: 'Address B', deliveryAddress: 'Address A', estimatedCost: 100 },
    ];

    const filteredOrders = mockOrders.filter(order => order.userId.includes(userId));

    return (
      <div>
        {filteredOrders.length > 0 ? (
          <table>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.itemsDescription}</td>
                  <td>{order.pickupAddress}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.estimatedCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
      </div>
    );
  },
}));

describe('OrdersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the orders page with search input', () => {
    render(<OrdersPage />);

    expect(screen.getByText('Pedidos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por ID do usuário...')).toBeInTheDocument();
  });

  it('filters orders by user ID and renders the data in the table', async () => {
    render(<OrdersPage />);

    const input = screen.getByPlaceholderText('Buscar por ID do usuário...');
    await userEvent.type(input, '123');

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('123')).toBeInTheDocument();
      expect(screen.getByText('Item A')).toBeInTheDocument();
    });
  });

  it('displays a message when no orders are found', async () => {
    render(<OrdersPage />);

    const input = screen.getByPlaceholderText('Buscar por ID do usuário...');
    await userEvent.type(input, '999');

    await waitFor(() => {
      expect(screen.getByText('Nenhum pedido encontrado.')).toBeInTheDocument();
    });
  });
});
