import { api } from "@/utils/api";
import { RegisterPayload, AuthResponse } from "@/types/auth";

export const authService = {
  register: (data: RegisterPayload) =>
    api.post<AuthResponse, RegisterPayload>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/login", data),
};
