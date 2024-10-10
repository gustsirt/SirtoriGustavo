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

export const updateCurrentUser = async (data) => {
  try {
    delete data._id;
    delete data.created;
    delete data.updated;
    delete data.connection;
    delete data.__v;

    const response = await axiosInstance.put(`/v1/users/current/update`, { updateUser: data});
    return response.data?.data || null;
  } catch (error) {
    throw new Response('Error al cargar los datos', {
      status: 500,
      statusText: error.message,
    });
  }
}

export const userUpdatePhoto = async (photo) => {
  const formData = new FormData();
  formData.append('photo', photo);

  try {
    const response = await axios.put(`/v1/users/current/uploadphoto`, formData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    return null;
  }
};

export const useCurrentUser = async () => {
  const { data, isPending, isError, error } = useFetch(['currentUser'],"/v1/users/current")
  const currentUser = data?.data || null;
  console.log(currentUser);
  return { data: currentUser, isPending, isError, error } 
}
