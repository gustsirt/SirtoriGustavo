import { useState } from "react"
import axiosInstance from "../../../config/axiosInstance";
import { useAuth } from "./useAuth";


export default function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signIn } = useAuth()

  async function login(credentials, navigate) {
    setLoading(true);
    setError(null);
    try {
      let response = await axiosInstance.post("/v1/auth/login", credentials);
      response = response.data

      if(response?.isError === true) throw new Error(response.message)

      console.log("Login successful:", response.message);
      
      const token = response.data.token
      console.log("token:", token);
      signIn(token)
      navigate({to: '/private' })

    } catch (error) {
      // console.log(error.response.data.message);
      setError(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
  async function register(credentials, navigate) {
    setLoading(true);
    setError(null);
    try {
      let response = await axiosInstance.post("/v1/auth/register", credentials);
      response = response.data

      if(response?.isError === true) throw new Error(response.message)

      console.log("Register successful:", response.message);
      
      const token = response.data.token
      console.log("token:", token);
      signIn(token)
      navigate({to: '/private' })

    } catch (error) {
      // console.log(error.response.data.message);
      setError(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return {loading, error, setError, login, register}
}
