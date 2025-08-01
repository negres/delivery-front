type ApiError = {
  response?: {
    data?: {
      errors?: string[];
    };
  };
};

export const handleFailure = (error: unknown, toastError: (msg: string) => void) => {
  if (typeof error === 'object' && error !== null && 'response' in error && Array.isArray((error as ApiError).response?.data?.errors)) {
    const errors = (error as ApiError).response?.data?.errors || [];

    errors.forEach((msg) => toastError(msg));
  } else {
    toastError('Erro ao criar pedido. Tente novamente.');
  }
};
