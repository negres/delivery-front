'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import OrdersTable from '@/components/orders/OrdersTable';
import { useDebounce } from '@/hooks/useDebounce';

const OrdersPageClient = () => {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get('userId') || '');
  const debouncedUserId = useDebounce(userId, 500);

  return (
    <Card className="my-8 mx-4 sm:mx-0">
      <CardHeader>
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>Gerencie todos os pedidos do sistema</CardDescription>
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID do usuário..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <OrdersTable userId={debouncedUserId} />
      </CardContent>
    </Card>
  );
};

export default OrdersPageClient;
