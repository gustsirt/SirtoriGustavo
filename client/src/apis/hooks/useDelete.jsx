import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const useDelete = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(() => axiosInstance.delete(url).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidar caché si es necesario
    },
    ...options,
  });
};
