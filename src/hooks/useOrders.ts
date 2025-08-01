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

      setOrders(response.orders);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
        const responseError = error as { response?: { data?: { errors?: string[] } } };

        toast.error(responseError.response?.data?.errors?.join(", ") || "Erro ao carregar pedidos. Tente novamente.");
      } else {
        toast.error("Erro ao carregar pedidos. Tente novamente.");
      }
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
    if (userId && currentPage === 1) {
      fetchOrders(1);
    } else if (userId) {
      setCurrentPage(1);
    } else {
      fetchOrders(currentPage);
    }
  }, [userId, currentPage]);

  return {
    orders,
    loading,
    currentPage,
    totalPages,
    handlePrevious,
    handleNext,
  };
};