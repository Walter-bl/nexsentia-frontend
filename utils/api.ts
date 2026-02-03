const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

interface RequestOptions extends RequestInit {
  method?: HttpMethod;
}

const getAuthToken = (): string | null => localStorage.getItem("accessToken");
const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

const saveTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refreshToken);
};

// Refresh token API call
const refreshToken = async (): Promise<{ token: string; refreshToken: string }> => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token available");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  });

  if (!res.ok) {
    throw new Error("Refresh token expired");
  }

  const data = await res.json();
  saveTokens(data.token, data.refreshToken);
  return data;
};

const request = async <T>(
  endpoint: string,
  options: RequestOptions = {},
  retry = true
): Promise<T> => {
  const token = getAuthToken();

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Only attempt refresh if access token exists
      if (response.status === 401 && retry && token) {
        try {
          await refreshToken();
          return request<T>(endpoint, options, false); // retry original request
        } catch (refreshError) {
          // Refresh failed → log out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          throw refreshError;
        }
      }

      // Login or other API error
      const error: ApiError = {
        status: response.status,
        message: data?.message || "Something went wrong",
        data,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// API wrapper
export const api = {
  get: <T>(url: string, options?: RequestOptions) => request<T>(url, { method: "GET", ...options }),
  post: <T, B = unknown>(url: string, body: B, options?: RequestOptions) =>
    request<T>(url, { method: "POST", body: JSON.stringify(body), ...options }),
  put: <T, B = unknown>(url: string, body: B, options?: RequestOptions) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  patch: <T, B = unknown>(url: string, body: B, options?: RequestOptions) =>
    request<T>(url, { method: "PATCH", body: JSON.stringify(body), ...options }),
  delete: <T>(url: string, options?: RequestOptions) => request<T>(url, { method: "DELETE", ...options }),
};
