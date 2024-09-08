import { useFetch } from "./hooks/useGet";

export const useGetAsociates = () => {
  const { data, isLoading, error } = useFetch(['associates'],"/v1/users/associates")
  const associates = data?.data || null;
  return { data: associates, isLoading, error } 
}