import { create } from 'zustand';
import { User } from '../types/auth';
import api from '../lib/axios';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (token: string, user: User) => {
    localStorage.setItem('token', token);
    set({ user, isAuthenticated: true });
  },
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
    }
  },
  initialize: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await api.get('/user');
        set({ user: data, isAuthenticated: true });
      } catch {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));