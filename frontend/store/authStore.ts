import { create } from "zustand";
import api from "@/lib/axios";

interface AuthState {
  loading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  // ✅ LOGIN
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/login", { username, password });
      set({ loading: false });
      return true; // success
    } catch (err: any) {
      set({
        error: err.response?.data?.error || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  // ✅ SIGNUP
  signup: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/register", { username, email, password });
      set({ loading: false });
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.error || "Signup failed",
        loading: false,
      });
      return false;
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    }
  },
}));
