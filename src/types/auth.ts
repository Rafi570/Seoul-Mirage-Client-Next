import { IUser } from "@/contexts/AuthContext";

export interface AuthResponse {
  success: boolean;
  token: string;
  user: IUser;
  message?: string;
}

export interface AuthError {
  message: string;
}