import { create } from 'zustand';
import { User } from '@/types';
import { authApi } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** True until the very first /auth/me check completes on app boot */
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  /** Verify the session by calling /auth/me — relies on httpOnly cookie, no token param needed */
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true, // Start as true — the app is "booting"

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.login({ email, password });
      // Backend sets httpOnly cookies automatically — just store the user object
      set({ user: data.user, isAuthenticated: true, isInitializing: false });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (formData) => {
    set({ isLoading: true });
    try {
      const { data } = await authApi.register(formData);
      set({ user: data.user, isAuthenticated: true, isInitializing: false });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await authApi.logout(); // tells backend to clear cookies
    } catch { /* silent */ }
    set({ user: null, isAuthenticated: false, isInitializing: false });
  },

  fetchMe: async () => {
    try {
      const { data } = await authApi.me(); // cookie sent automatically
      set({ user: data.user, isAuthenticated: true, isInitializing: false });
    } catch {
      // Cookie missing or expired — user is not logged in
      set({ user: null, isAuthenticated: false, isInitializing: false });
    }
  },
}));
