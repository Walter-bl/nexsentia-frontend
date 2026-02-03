import { api } from "@/utils/api";
import { User } from "@/types/user";

export const userService = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => api.post<User>("/users", data),
  update: (id: string, data: Partial<User>) =>
    api.put<User>(`/users/${id}`, data),
  remove: (id: string) => api.delete<void>(`/users/${id}`),
    getMe: () => api.get<User>("/auth/me"), // 👈 fetch current user

};
