import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define standard API response wrapper if needed
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          if (typeof window !== 'undefined') {
            // Only redirect if not already on login page to avoid loops
            if (!window.location.pathname.includes('/login')) {
               // localStorage.removeItem('auth_token'); // Optional: clear token
               // window.location.href = '/login';
            }
          }
          break;
        case 403:
          console.error('Forbidden - You do not have permission');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error - Please try again later');
          break;
        default:
          console.error('An error occurred:', error.message);
      }
    } else if (error.request) {
      console.error('Network error - Please check your connection');
    }
    return Promise.reject(error);
  }
);

// RESTful API methods helper
export const api = {
  get: async <T>(url: string, params?: Record<string, unknown>) => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  },
  post: async <T>(url: string, data?: unknown) => {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  },
  put: async <T>(url: string, data?: unknown) => {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  },
  patch: async <T>(url: string, data?: unknown) => {
    const response = await apiClient.patch<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string) => {
    const response = await apiClient.delete<T>(url);
    return response.data;
  },
};

export default apiClient;
