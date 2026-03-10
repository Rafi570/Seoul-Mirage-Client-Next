import { AxiosInstance } from "axios";
import { AuthResponse } from "@/types/auth";

export const loginUser = async (
  axios: AxiosInstance, 
  data: Record<string, unknown>
): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>("/api/auth/login", data);
  return res.data;
};

export const registerUser = async (
  axios: AxiosInstance, 
  data: Record<string, unknown>
): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>("/api/auth/register", data);
  return res.data;
};