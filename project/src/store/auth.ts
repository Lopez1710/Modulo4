import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { delay } from '../lib/utils';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    password: 'password123',
    isAuthenticated: true,
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        await delay(1000);

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
          const { password, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword as User,
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        await delay(1000);

        const existingUser = mockUsers.find(u => u.email === email);

        if (existingUser) {
          set({ isLoading: false });
          return false;
        }

        const newUser = {
          id: String(mockUsers.length + 1),
          email,
          name,
          isAuthenticated: true,
        };

        mockUsers.push({ ...newUser, password });

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);