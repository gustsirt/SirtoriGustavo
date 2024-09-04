import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

// key es un []
export const useFetch = (key, url, options = {}) => {
  return useQuery({
    queryKey: key,
    queryFn: function
    //key, () => axiosInstance.get(url).then(res => res.data), {...options,}
  });
};
