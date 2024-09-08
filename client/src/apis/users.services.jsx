import { useFetch } from "./hooks/useGet";

export const useGetAsociates = () => {
  const { data, isPending, isError, error } = useFetch(['associates'],"/v1/users/associates")
  const associates = data?.data || null;
  return { data: associates, isPending, isError, error } 
}

export const useCurrentUser = async () => {
  const { data, isPending, isError, error } = useFetch(['currentUser'],"/v1/users/current")
  const currentUser = data?.data || null;
  console.log(currentUser);
  return { data: currentUser, isPending, isError, error } 
}