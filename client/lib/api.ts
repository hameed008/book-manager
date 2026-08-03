import axios from "axios";
import { BookFormData } from "@/components/books/BookForm"; // Import if using TypeScript

// 1. Create the base Axios instance
// This guarantees we never have to type the base URL or credentials flag again.
const apiClient = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
  baseURL: process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8000",
  withCredentials: true,
});

// Optional: Add a response interceptor for global error handling
// E.g., automatically redirecting to login if the backend says the session expired
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access globally (e.g., trigger a logout state)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// 2. Export Modular API Services
export const api = {
  // --- AUTHENTICATION ---
  auth: {
    login: (credentials: any) => apiClient.post("/user/login", credentials),
    signup: (userData: any) => apiClient.post("/user/signup", userData),
    logout: () => apiClient.post("/user/logout"),
    getMe: () => apiClient.get("/user"),

    // NEW: The two-step OTP flow
    sendOtp: (email: any) => apiClient.post("/auth/send-otp", email),
    verifyOtp: (verificationData: any) =>
      apiClient.post("/auth/verify-otp", verificationData),

    googleLogin: (idToken: string) =>
      apiClient.post("/auth/google", { idToken }), // Adjust URL to match your backend
  },

  // --- BOOKS ---
  books: {
    // Accepts optional query parameters for your dashboard filters
    getAll: (params?: { tag?: string; status?: string }) =>
      apiClient.get("/books", { params }),

    getById: (id: string) => apiClient.get(`/books/${id}`),

    create: (bookData: BookFormData) => apiClient.post("/books", bookData),

    update: (id: string, bookData: Partial<BookFormData>) =>
      apiClient.patch(`/books/${id}`, bookData),

    delete: (id: string) => apiClient.delete(`/books/${id}`),
  },
};
