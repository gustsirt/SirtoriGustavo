import { useFetch } from "./hooks/useGet"

export const useGetAsociates = () => {
  return useFetch(['associates'],"/v1/users/associates")
}