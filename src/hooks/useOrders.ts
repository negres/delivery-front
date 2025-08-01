'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getOrders } from '@/lib/api/orders';
import { Order } from '@/schemas/order';

type UseOrdersProps = {
  userId?: string;
};

export const useOrders = ({ userId }: UseOrdersProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const response = await getOrders({ userId, page: pageToFetch });
      console.log('Fetched orders:', response);
      setOrders(response.orders);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      toast.error('Erro ao carregar pedidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      fetchOrders(1);
    } else {
      setCurrentPage(1);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return {
    orders,
    loading,
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
  };
};