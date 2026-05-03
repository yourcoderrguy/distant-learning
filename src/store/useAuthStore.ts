import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'student' | 'lecturer' | 'admin';

export interface User {
  id: number;
  fullname: string;
  email: string;
  matric: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
}

// Mock Database (Carried over from her prototype)
const MOCK_USERS = [
  { id: 1, fullname: "Mary Samuel", email: "mary@kings.edu", matric: "CSC/2022/012", password: "1234", role: "student" as Role },
  { id: 2, fullname: "Dr. Adebayo", email: "adebayo@kings.edu", matric: "STAFF001", password: "lect123", role: "lecturer" as Role },
  { id: 3, fullname: "Admin User", email: "admin@kings.edu", matric: "ADMIN01", password: "admin123", role: "admin" as Role }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          // 1. Set the cookie for Next.js Middleware (Expires in 1 day)
          document.cookie = `user_role=${foundUser.role}; path=/; max-age=86400`;
          
          // 2. Set the Zustand client state
          set({ user: foundUser, isAuthenticated: true });
          return { success: true };
        }
        
        return { success: false, message: "Invalid credentials." };
      },

      logout: () => {
        // 1. Destroy the cookie
        document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        
        // 2. Clear the Zustand state
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'kings-auth-storage', // The name of the item in localStorage
    }
  )
);