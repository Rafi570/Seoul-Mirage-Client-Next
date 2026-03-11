export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image?: string;
  createdAt: string;
}

export interface RoleResponse {
  success: boolean;
  role: "admin" | "user";
  message?: string;
}

export interface PasswordFormData {
  oldPassword: "";
  newPassword: "";
  confirmPassword: "";
}