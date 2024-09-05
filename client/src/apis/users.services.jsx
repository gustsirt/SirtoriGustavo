// import { queryClient } from "../main"
// import axiosInstance from "./hooks/axiosInstance"
import { useFetch } from "./hooks/useGet";

// export const getAsociates = async () => {
//   const resp = await queryClient.fetchQuery({
//     queryKey: ['associates'],
//     queryFn: () => axiosInstance.get("/v1/users/associates").then(res => res.data)
//   });
//   return resp.data
// };


export const useGetAsociates = () => {
  const { data, isLoading, error } = useFetch(['associates'],"/v1/users/associates")
  const associates = data?.data ? data.data : null
  return { data: associates, isLoading, error } 
}