"use client";

import { createContext } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  phone?: string;    
  address?: {      
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (data: { user: IUser; token: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);