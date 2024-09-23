import axiosInstance from "../config/axiosInstance";
//import { useFetch } from "./hooks/useGet";

// export const useGetLanguajes = () => {
//   const { data, isPending, isError, error } = useFetch(['languajes'],"/v1/values/languajes")
//   const languajes = data?.data || null;
//   return { data: languajes, isPending, isError, error } 
// }
// export const useGetProfessions = () => {
//   const { data, isPending, isError, error } = useFetch(['professions'],"/v1/values/professions")
//   const professions = data?.data || null;
//   return { data: professions, isPending, isError, error } 
// }

export const getLanguajes  = async () => { // Reemplazar por Query
  try {
    const response = await axiosInstance.get(`/v1/values/languajes`);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};

export const getProfessions = async () => { // Reemplazar por Query
  try {
    const response = await axiosInstance.get(`/v1/values/professions`);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};


export const contributionsLoader = async () => {
  try {
    const response = await axiosInstance.get(`/v1/contributions`);
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
};
