import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const usePut = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation((data) => axiosInstance.put(url, data).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidar caché si es necesario
    },
    ...options,
  });
};
