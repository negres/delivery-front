import apiClient from '@/lib/apiClient';
import { Order, FormData } from '@/schemas/order';

interface GetOrdersResponse {
  orders: Order[];
  totalPages: number;
}

export const createOrder = async (data: FormData) => {
  await apiClient.post("/orders", { order: data });
};

export const getOrders = async ({ userId, page }: { userId?: string, page?: number }): Promise<GetOrdersResponse> => {
  const params: { user_id?: string; page?: number } = { page };

  if (userId) {
    params.user_id = userId;
  }

  const response = await apiClient.get<GetOrdersResponse>("/orders", { params });
  return response.data;
};