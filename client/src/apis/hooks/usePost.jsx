import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const usePost = (url, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation((data) => axiosInstance.post(url, data).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidar caché si es necesario
    },
    ...options,
  });
};
