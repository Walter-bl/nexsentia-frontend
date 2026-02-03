import { UerInfo } from "./user";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  token: string; // access token
  refreshToken: string; // refresh token
  tokens: { accessToken: string; refreshToken: string };
  user: User;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}


export interface AuthContextType {
  user: UerInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  register: (data: RegisterPayload) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}
