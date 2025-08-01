import { Suspense } from 'react';
import OrdersPageClient from './OrdersPageClient';

const OrdersPage = () => {
  return (
    <Suspense fallback={<p>Carregando pedidos...</p>}>
      <OrdersPageClient />
    </Suspense>
  );
};

export default OrdersPage;
