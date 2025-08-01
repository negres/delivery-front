'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useOrders } from '@/hooks/useOrders';
import { formatCurrency } from '@/lib/utils';

const OrdersTable = ({ userId }: { userId?: string }) => {
  const { orders, loading, currentPage, totalPages, handlePrevious, handleNext } = useOrders({ userId });

  if (loading) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Endereço de Retirada</TableHead>
              <TableHead>Endereço de Entrega</TableHead>
              <TableHead>Valor Estimado</TableHead>
              <TableHead>ID do Usuário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.itemsDescription}</TableCell>
                  <TableCell>{order.pickupAddress}</TableCell>
                  <TableCell>{order.deliveryAddress}</TableCell>
                  <TableCell>{formatCurrency(order.estimatedCost)}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  Nenhum pedido encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4 gap-4">
        <Button onClick={handlePrevious} disabled={currentPage === 1} className="p-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>
        <span className="text-center">
          Página {currentPage} de {totalPages}
        </span>
        <Button onClick={handleNext} disabled={currentPage === totalPages} className="p-2">
          <span className="hidden sm:inline">Próximo</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;