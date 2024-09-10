import axiosInstance from "../config/axiosInstance";
import { useFetch } from "./hooks/useGet";

export const useGetAssociates = () => {
  const { data, isPending, isError, error } = useFetch(['associates'],"/v1/users/associates")
  const associates = data?.data || null;
  return { data: associates, isPending, isError, error } 
}

export const associateLoader = async (username) => {
  try {
    const response = await axiosInstance.get(`/v1/users/associate/${username}`);
    const associate = response.data?.data || null;
    return associate;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const useCurrentUser = async () => {
  const { data, isPending, isError, error } = useFetch(['currentUser'],"/v1/users/current")
  const currentUser = data?.data || null;
  console.log(currentUser);
  return { data: currentUser, isPending, isError, error } 
}