import axiosInstance from "../config/axiosInstance";
import { useFetch } from "./hooks/useGet";

// export const useGetAssociates = () => {
//   const { data, isPending, isError, error } = useFetch(['contributions'],"/v1/users/associates")
//   const associates = data?.data || null;
//   return { data: associates, isPending, isError, error } 
// }

export const contributionsLoader = async () => {
  try {
    const response = await axiosInstance.get(`/v1/contributions`);
    const associate = response.data?.data || null;
    return associate;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};
